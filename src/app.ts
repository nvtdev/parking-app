import express, { Request, Response, NextFunction } from "express";
import connect from "./db/connect";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.listen(port, async () => {
  console.log("now listening for requests");
  await connect();
  routes(app);
});

app.use(bodyParser.json());
