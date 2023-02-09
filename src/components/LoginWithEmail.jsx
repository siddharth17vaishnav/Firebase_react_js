import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/FirebaseConfig";

const LoginWithEmail = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email!").required("Required"),
    password: Yup.string()
      .max(16, "Max 16 words")
      .min(6, "Min 6 words")
      .required("Required"),
  });
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      await signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user);
          console.log("USER SIGNED IN");
        })
        .catch(async (error) => {
          if (error.message.includes("user-not-found")) {
            await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            )
              .then((userCredential) => {
                const user = userCredential.user;
                console.log({ user });
                console.log("USER SIGNED UP");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          }
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
  });

  const getUser = async () => {
    await onAuthStateChanged(auth, (user) => {
      console.log({ user });
    });
  };

  const updateProfileFunc = async () => {
    await updateProfile(auth?.currentUser, {
      displayName: "TEST NAME",
      photoURL: "PHOTO_URL",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log({ error });
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
      <Typography variant="h5">Login With Email & Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
      </form>

      <button onClick={getUser}>GET USER DETAIL</button>
      <button onClick={updateProfileFunc}>UPDATE PROFILE</button>
    </Box>
  );
};

export default LoginWithEmail;
