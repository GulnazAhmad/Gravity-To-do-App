import { FaOtter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { URL } from "../url";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // ✅ this is correct

  const handleLogin = async () => {
    //console.log("login button clicked");
    try {
      const res = await axios.post(
        `${URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      //console.log(res.data);

      setUser(res.data);

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      //console.log("login failes", error);
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server. Request made:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-6 md:[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">To-Do List</Link>
        </h1>
        <div className="flex items-center justify-center space-x-2 md:space-x-4">
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        </div>
      </div>

      <div className="h-[70vh] flex items-center justify-center">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[80%]  mx-8 my-8 py-9 px-9">
          <h1 className="text-xl font-bold">Log in to your account</h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="email"
            placeholder="Enter your email"
          ></input>
          <br />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
          ></input>
          <button
            onClick={handleLogin}
            className="bg-black text-white text-lg w-full rounded-lg px-4 py-4 hover:bg-gray-500 hover:text-black"
          >
            Login
          </button>
          <div className="w-full flex text-sm text-gray-400 justify-between text-center">
            <p>
              New here?
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
