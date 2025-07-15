import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import userRouter from "./routes/user.route.js";
import passwordRouter from "./routes/password.route.js";
import questionRouter from "./routes/question.route.js";
import { requestHandeller } from "./util/requestHandeller.js";
import { ApiError } from "./util/apiError.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/password", passwordRouter);

app.use("/api/v1/question", questionRouter);
app.use("/health", (req, res) => {
  res.status(200).json({ status: "Service is up and running!" });
});

app.use(
  requestHandeller(async (req, res, next) => {
    throw new ApiError(404, "Route not found");
  })
);

export { app };
