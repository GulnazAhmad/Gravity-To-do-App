import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { URL } from "../url";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  //console.log(username);
  //console.log(email);
  //console.log(password);
  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        name,
        email,
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
      setError(false);
      navigate("/login");
      //console.log(res.data);
    } catch (e) {
      console.log(e.message);
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
            <Link to="/login">Login</Link>
          </h3>
        </div>
      </div>
      <div className="h-[70vh] flex items-center justify-center">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[80%]  mx-8 my-8 py-9 px-9">
          <h1 className="text-xl font-bold">Register your account</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your Username"
          ></input>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="email"
            placeholder="Enter your email"
          ></input>

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
          ></input>
          <button
            onClick={handleRegister}
            className="bg-black text-white text-lg w-full rounded-lg px-4 py-4 hover:bg-gray-500 hover:text-black"
          >
            Register
          </button>
          {error && <h3 className="text-red-900">Something went wrong</h3>}
          <div className="w-full flex text-sm text-black justify-between text-center">
            <p>
              Already have an account?
              <Link className="text-gray-400" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
