import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {errorMiddleware} from "./middleware/errorMiddleware";
import {healthRouter} from "./routes/healthRoutes";
import {bookRouter} from "./routes/bookRoutes";
import {userRouter} from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/health", healthRouter);
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);

app.use(errorMiddleware);

export default app;
