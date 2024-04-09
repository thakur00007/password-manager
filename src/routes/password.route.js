import { Router } from "express";
import { savePassword } from "../controllers/password.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const passwordRouter = Router();
passwordRouter.use(verifyToken);
passwordRouter.route("/save").post(savePassword);

export default passwordRouter;
