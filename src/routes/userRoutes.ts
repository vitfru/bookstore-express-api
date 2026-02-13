import {Router} from 'express';
import {UserController} from "../controllers/UserController";
import {UserService} from "../services/UserService";
import {validateRequest} from "../middleware/validateRequest";
import {loginUserSchema, registerUserSchema} from "../validation/userValidation";
import {MemoryUserRepository} from "../repositories/memory/MemoryUserRepository";

const userRepository = new MemoryUserRepository();
const service = new UserService(userRepository);
const controller = new UserController(service);

export const userRouter = Router();

userRouter.post("/register", validateRequest(registerUserSchema), controller.register);
userRouter.post("/login", validateRequest(loginUserSchema), controller.login);