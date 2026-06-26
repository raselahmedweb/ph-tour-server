import express, { type Request, type Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { GlobalErrorHandler } from "./app/middlewares/globalErrorHandler";
import NotFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, World!" });
});

app.use(GlobalErrorHandler);

app.use(NotFound);

export default app;
