import Express from "express";
import {
  addUserLocation,
  getAllUsers,
  getSingleUserById,
  login,
  signup,
} from "../../controllers/UserController/userController.js";

const userRouter = Express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/allUsers", getAllUsers);
userRouter.get("/singleUser/:_id", getSingleUserById);
userRouter.post("/addLocation", addUserLocation);

export default userRouter;
