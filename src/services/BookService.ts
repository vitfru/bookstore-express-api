import {BookRepository} from "../repositories/interfaces/BookRepository";
import {Book} from "../domain/Book";
import {NotFoundError} from "../errors/NotFoundError";

export class BookService {
    constructor(private bookRepository: BookRepository) {
    }

    async listBooks(query: {
        page?: number;
        limit?: number;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
    }): Promise<any> {
        let books = await this.bookRepository.findAll();

        if (query.category) {
            books = books.filter(book => book.category.toLowerCase() === query.category?.toLowerCase());
        }

        if (query.minPrice !== undefined) {
            books = books.filter(book => book.price >= query.minPrice!);
        }

        if (query.maxPrice !== undefined) {
            books = books.filter(book => book.price <= query.maxPrice!);
        }

        if (query.search) {
            const search = query.search.toLowerCase();
            books = books.filter(book => book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search));
        }

        const page = query.page && query.page > 0 ? query.page : 1;
        const limit = query.limit && query.limit > 0 ? query.limit : 3;
        const start = (page - 1) * limit;
        const end = start + limit;

        const paginatedBooks = books.slice(start, end);

        return {
            total: books.length,
            page,
            limit,
            data: paginatedBooks
        };
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
