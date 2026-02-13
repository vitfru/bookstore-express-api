import {User} from "../../domain/User";

export interface UserRepository {
    findAll(): Promise<User[]>;

    findById(id: string): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    create(user: Omit<User, "id" | "createdAt">): Promise<User>;
}