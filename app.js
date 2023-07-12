import Express from "express";
import bodyParser from "body-parser";
import "./initDB.js";
import cors from "cors";

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(bodyParser());

app.use("/", (req, res, next) => {
  res.send("Welcome to UserMaps Project");
});

app.listen(8020);
console.log("hello world");
