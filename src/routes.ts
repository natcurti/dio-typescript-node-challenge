import { Router } from "express";
import { UserController } from "./controller/UserController";
import { LoginController } from "./controller/LoginController";
import { verifyAuth } from "./middleWare/verifyAuth";

export const router = Router();
const userController = new UserController();
const loginController = new LoginController();

router.get('/user/:userId', verifyAuth, userController.getUser);
router.post('/user', userController.createUser);
// router.delete('/user', userController.deleteUser);
router.post('/login', loginController.login)