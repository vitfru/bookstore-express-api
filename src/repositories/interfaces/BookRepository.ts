import {Book} from "../../domain/Book";

export interface BookRepository {
    findById(id: string): Promise<Book | null>;

    findAll(): Promise<Book[]>;

    create(book: Omit<Book, "id" | "createdAt">): Promise<Book>;

    update(id: string, data: Partial<Omit<Book, "id" | "createdAt">>): Promise<Book>;

    delete(id: string): Promise<void>;
}
