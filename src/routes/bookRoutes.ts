import {Router} from "express";
import {MemoryBookRepository} from "../repositories/memory/MemoryBookRepository";
import {BookService} from "../services/BookService";
import {BookController} from "../controllers/BookController";

const bookRepository = new MemoryBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

export const bookRouter = Router();

bookRouter.get("/", bookController.getAll);
bookRouter.get("/:id", bookController.getOne);
bookRouter.post("/", bookController.create);
