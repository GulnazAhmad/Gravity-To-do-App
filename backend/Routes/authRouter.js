import express from "express";
import {
  login,
  logout,
  refetch,
  Register,
} from "../Controller/Authcontroller.js";

const authrouter = express.Router();
authrouter.post("/login", login);
authrouter.post("/logout", logout);
authrouter.get("/refetch", refetch);
authrouter.post("/register", Register);
export default authrouter;
