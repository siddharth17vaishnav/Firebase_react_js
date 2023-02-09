import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/login-with-email-and-password")}>
        Login With Email
      </button>
      <button onClick={() => navigate("/login-with-number")}>
        Login With Number
      </button>
    </div>
  );
};

export default Home;
