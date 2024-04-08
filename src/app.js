import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

import registerRouter from "./routes/user.route.js";

app.use("/api/v1/user", registerRouter);

export { app };
