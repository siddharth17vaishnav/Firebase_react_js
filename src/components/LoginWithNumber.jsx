import { Box, Button, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";

const LoginWithNumber = () => {
  const auth = getAuth();
  const validationSchema = Yup.object().shape({
    number: Yup.number()
      .min(10, "MIN 10 number")
      .max(10, "MAX 10 number")
      .required("Required"),
  });
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      console.log(values.number);
      console.log(values, errors);
    },
  });

  const generateCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          submit().then((r) => console.log(r));
        },
      },
      auth
    );
  };
  const submit = async () => {
    generateCaptcha();
    const appVerifier = window.recaptchaVerifier;
    await signInWithPhoneNumber(auth, `+91${values.number}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        const code = window.prompt("Enter OTP");
        confirmationResult
          .confirm(code)
          .then((result) => {
            const user = result.user;
            console.log({ user });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
        console.log({ confirmationResult });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Login With Number</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="number"
          name="number"
          type="number"
          label="Number"
          variant="outlined"
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
      </form>
      <div className={"recaptcha-container"} id="recaptcha-container"></div>
      <button className="recaptcha-container" onClick={submit}>
        click
      </button>
      <button onClick={() => auth.signOut()}>logout</button>
    </Box>
  );
};

export default LoginWithNumber;
