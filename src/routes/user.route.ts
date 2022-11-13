import { Router } from "express";
import UserController from "../controllers/user.controllers";
const userRouter = Router();

userRouter.get("/", UserController.findUsers);
userRouter.post("/sign-up", UserController.signUp);
userRouter.post("/sign-in", UserController.signIn);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

export default userRouter;
