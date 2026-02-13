import {Request, Response, NextFunction} from 'express';
import {UserService} from '../services/UserService';

export class UserController {
    constructor(private userService: UserService) {
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.register(req.body);
            res.status(201).json({id: user.id, name: user.name, email: user.email, role: user.role});
        } catch (error) {
            next(error);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.userService.login(req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}