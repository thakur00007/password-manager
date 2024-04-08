import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import { app } from "./src/app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`server is running on ${port}.`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
