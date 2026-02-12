import {Book} from "../../domain/Book";

export interface BookRepository {
    findById(id: string): Promise<Book | null>;

    findAll(): Promise<Book[]>;

    create(book: Omit<Book, "id" | "createdAt">): Promise<Book>;
}
