import User from "../Models/Usermodel.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
const createtoken = (email, userId) => {
  return jwt.sign(
    {
      id: userId,
      email: email,
    },
    process.env.SECRET,
    {
      expiresIn: "3d",
    }
  );
};
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hashSync(password, salt);
    const newuser = await User.create({
      name: name,
      email: email,
      password: hashpassword,
    });
    const token = createtoken(email, newuser._id);
    res.cookie("jwttoken", token, {
      httponly: true,
      sameSite: "lax",
      secure: false,
    });
    return res.status(201).json(newuser);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json(e.message);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userexist = await User.findOne({
      email: email,
    });
    if (!userexist) {
      console.log("email does not exist");
      return res.status(404).json("email does not exist");
    }
    const match = bcrypt.compareSync(password, userexist.password);
    if (!match) {
      console.log("wrong password");
      return res.status(409).json("wrong password");
    }
    const token = createtoken(userexist.email, userexist._id);

    res.cookie("jwttoken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    const { password: _, ...info } = userexist._doc;
    res.status(200).json(info);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json(e.message);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwttoken", {
      httponly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json("logged out successfully");
  } catch (e) {
    console.log(e.message);
  }
};
export const refetch = async (req, res) => {
  console.log("/refetch hit");
  const token = req.cookies?.jwttoken;
  console.log(token);
  if (!token) return res.status(401).json("No token found");
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) return res.status(403).json("Token is invalid");
    try {
      const user = await User.findById(data.id);
      if (!user) return res.status(404).json("User not found");

      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (e) {
      console.log(e.message);
    }
  });
};
