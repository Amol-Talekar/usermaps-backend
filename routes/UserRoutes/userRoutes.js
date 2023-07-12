import Express from "express";
import {
  getAllUsers,
  login,
  signup,
} from "../../controllers/UserController/userController.js";

const userRouter = Express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/allUsers", getAllUsers);

export default userRouter;
