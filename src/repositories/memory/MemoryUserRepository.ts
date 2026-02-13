import {UserRepository} from "../interfaces/UserRepository";
import {User} from "../../domain/User";

export class MemoryUserRepository implements UserRepository {

    private users: User[] = [];

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(u => u.id === id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    }

    async create(user: Omit<User, "id" | "createdAt">): Promise<User> {
        const newUser: User = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            ...user,
        }

        this.users.push(newUser);

        return newUser;
    }
}