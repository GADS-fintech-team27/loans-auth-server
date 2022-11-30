import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";

interface User {
  firstname: string;
  lastname: string;
  email: string;
}
interface CustomRequest extends Request {
  user?: User;
}

export default function checkAuth(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string = req.headers.authorization.split(" ")[1];
    const decodedToken = verify(token, process.env.JWT_SECRET_KEY);
    // req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ errorMessage: "unathorised " });
  }
}
