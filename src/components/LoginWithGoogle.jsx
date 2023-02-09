import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { useState } from "react";
const LoginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const [isLoggedIn, setIsLoggedIn] = useState("NOT LOGGED IN");
  const handleOnLogin = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setIsLoggedIn("LOGGED IN");
        console.log(token, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setIsLoggedIn("NOT LOGGED IN");
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  return (
    <div>
      <h3>LOGIN WITH GOOGlE</h3>
      <p style={{ color: isLoggedIn === "LOGGED IN" ? "green" : "red" }}>
        STATUS
      </p>
      <br />
      <button onClick={() => handleOnLogin()}>Sign with google</button>
      <button onClick={() => auth.signOut()}>logout</button>
      <button onClick={() => console.log(auth.currentUser)}>get User</button>
    </div>
  );
};

export default LoginWithGoogle;
