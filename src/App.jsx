import { Routes, Route } from "react-router-dom";
import {
  HomeImport,
  LoginWithEmailImport,
  LoginWithNumberImport,
  LoginWithGoogleImport,
} from "./utils/Imports";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeImport />} />
        <Route
          path="/login-with-email-and-password"
          element={<LoginWithEmailImport />}
        />
        <Route path="/login-with-number" element={<LoginWithNumberImport />} />
        <Route path="/login-with-google" element={<LoginWithGoogleImport />} />
      </Routes>
      <div></div>
    </div>
  );
}

export default App;
