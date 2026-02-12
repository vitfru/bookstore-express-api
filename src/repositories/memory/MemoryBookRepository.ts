import {Book} from "../../domain/Book";
import {BookRepository} from "../interfaces/BookRepository";

export class MemoryBookRepository implements BookRepository {
    private books: Book[] = [];

    async findById(id: string): Promise<Book | null> {
        return this.books.find((book) => book.id === id) || null;
    }

    async findAll(): Promise<Book[]> {
        return this.books;
    }

    async create(data: Omit<Book, "id" | "createdAt">): Promise<Book> {
        const newBook: Book =
            {
                id: crypto.randomUUID(),
                createdAt: new Date(),
                ...data,
            };

        this.books.push(newBook);

        return newBook;
    }
}
