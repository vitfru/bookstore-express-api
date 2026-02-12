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

    async update(id: string, data: Partial<Omit<Book, "id" | "createdAt">>): Promise<Book> {
        const book: Book | null = await this.findById(id);
        if (!book) {
            throw new Error('Book not found');
        }

        Object.assign(book, data);

        return book;
    }

    async delete(id: string): Promise<void> {
        const index: number = this.books.findIndex((book: Book): boolean => book.id === id);
        if(index === -1) {
            throw new Error("Book not found");
        }

        this.books.splice(index, 1);
    }
}
