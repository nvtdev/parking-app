import mongoose, { ConnectOptions } from "mongoose";

function connect() {
  const dbUri = "mongodb://localhost:27017/parking-api";

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.info("Database connected");
    })
    .catch((error) => {
      console.error("db error", error);
      process.exit(1);
    });
}

export default connect;
