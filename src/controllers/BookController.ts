import {Request, Response, NextFunction} from 'express';
import {BookService} from '../services/BookService';

export class BookController {
    constructor(private bookService: BookService) {
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = {
                page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
                limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
                category: req.query.category as string | undefined,
                minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
                maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
                search: req.query.search as string | undefined,
            };

            const result = await this.bookService.listBooks(query);
            res.json(result);
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

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = (req.params.id) as string;
            const book = await this.bookService.updateBook(id, req.body);

            res.json(book);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = (req.params.id) as string;
            await this.bookService.deleteBook(id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    };
}