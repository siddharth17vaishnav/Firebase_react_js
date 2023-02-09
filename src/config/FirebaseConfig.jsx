import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9h-NYSt53RFH8u2VHJBUs-gTcFzb3PjU",
  authDomain: "fir-learning-155d0.firebaseapp.com",
  projectId: "fir-learning-155d0",
  storageBucket: "fir-learning-155d0.appspot.com",
  messagingSenderId: "423250947055",
  appId: "1:423250947055:web:4e107e7f4bf23cab71241a",
  measurementId: "G-BLHS4Z87KV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = "en";
export default app;
