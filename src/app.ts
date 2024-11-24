import { Request, Response } from "express";
import express from "express";
import cors from "cors"
const app = express();

// perser
app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// app.

export default app
