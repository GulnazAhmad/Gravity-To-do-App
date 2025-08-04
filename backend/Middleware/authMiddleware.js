import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwttoken;
  console.log("tojken", token);
  if (!token) {
    return res.status(401).json("you are not aunthenticated");
  }
  jwt.verify(token, process.env.SECRET, async (error, data) => {
    if (error) {
      console.log("JWT verify error:", error);

      return res.status(403).json("token is not valid!");
    }
    req.userId = data.id;
    console.log(req.userId);
    next();
  });
};
export default verifyToken;
