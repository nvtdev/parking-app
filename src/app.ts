import express from "express";
import connect from "./db/connect";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.listen(port, async () => {
  console.log("Parking API started");
  await connect();
  routes(app);
});

app.use(bodyParser.json());
