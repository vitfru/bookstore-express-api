import {BookRepository} from "../repositories/interfaces/BookRepository";
import {Book} from "../domain/Book";

export class BookService {
    constructor(private bookRepository: BookRepository) {
    }

    async listBooks() {
        return this.bookRepository.findAll();
    }

    async getBook(id: string) {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new Error("Book not found");
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
    }) {
        return this.bookRepository.create(data);
    }
}