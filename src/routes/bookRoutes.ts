import {Router} from "express";
import {MemoryBookRepository} from "../repositories/memory/MemoryBookRepository";
import {BookService} from "../services/BookService";
import {BookController} from "../controllers/BookController";
import {validateRequest} from "../middleware/validateRequest";
import {createBookSchema, updateBookSchema} from '../validation/bookValidation';
import {authMiddleware, adminOnly} from "../middleware/authMiddleware";

const bookRepository = new MemoryBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

export const bookRouter = Router();

bookRouter.get("/", bookController.getAll);
bookRouter.get("/:id", bookController.getOne);
bookRouter.post("/", authMiddleware, validateRequest(createBookSchema), bookController.create);
bookRouter.put("/:id", validateRequest(updateBookSchema), bookController.update);
bookRouter.delete("/:id", bookController.delete);