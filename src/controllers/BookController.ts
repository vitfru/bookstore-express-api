import {Request, Response, NextFunction} from 'express';
import {BookService} from '../services/BookService';

export class BookController {
    constructor(private bookService: BookService) {
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const books = await this.bookService.listBooks();
            res.json(books);
        } catch (error) {
            next(error);
        }
    };

    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = (req.params.id) as string;

            const book = await this.bookService.getBook(id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    };
}