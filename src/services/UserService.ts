import {UserRepository} from "../repositories/interfaces/UserRepository";
import {User} from "../domain/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {NotFoundError} from "../errors/NotFoundError";
import {AppError} from "../errors/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async register(data: { name: string, email: string, password: string, role?: "user" | "admin" }): Promise<User> {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new AppError("User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);
        return this.userRepository.create({...data, password: hashedPassword, role: data.role || "user"});
    }


    async login(data: { email: string, password: string }): Promise<any> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new NotFoundError("Invalid email or password");
        }

        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) {
            throw new NotFoundError("Invalid email or password");
        }

        const token = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: "1h"});

        return {token, user: {id: user.id, name: user.name, email: user.email, role: user.role}};
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }
}

