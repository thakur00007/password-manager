import { Router } from "express";
import { savePassword, fetchAllPasswords, fetchPassword } from "../controllers/password.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const passwordRouter = Router();
passwordRouter.use(verifyToken);
passwordRouter.route("/save").post(savePassword);
passwordRouter.route("/fetchall").get(fetchAllPasswords);
passwordRouter.route("/fetch").post(fetchPassword);

export default passwordRouter;
