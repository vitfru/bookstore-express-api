import {BookRepository} from "../repositories/interfaces/BookRepository";
import {Book} from "../domain/Book";
import {NotFoundError} from "../errors/NotFoundError";

export class BookService {
    constructor(private bookRepository: BookRepository) {
    }

    async listBooks(): Promise<Book[]> {
        return this.bookRepository.findAll();
    }

    async getBook(id: string): Promise<Book> {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new NotFoundError(`Book with id ${id} not found`);
        }

        return book;
    }

    async createBook(data: {
        title: string;
        author: string;
        description: string;
        price: number;
        category: string;
        stock: number;
        updatedAt: Date;
    }): Promise<Book> {
        return this.bookRepository.create(data);
    }

    async updateBook(id: string, data: {
        title?: string;
        author?: string;
        description?: string;
        price?: number;
        category?: string;
        stock?: number;
    }): Promise<Book> {
        try {
            return this.bookRepository.update(id, data);
        } catch (error) {
            throw new NotFoundError(`Book with id ${id} not found`);
        }
    }

    async deleteBook(id: string): Promise<void> {
        try {
            await this.bookRepository.delete(id);
        } catch (error) {
            throw new NotFoundError(`Book with id ${id} not found`);
        }
    }
}
