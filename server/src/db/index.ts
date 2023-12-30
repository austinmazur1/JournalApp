const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/journalTest";

mongoose
  .connect(MONGO_URI)
  .then((x:any) => {
    const dbName = x.connections[0].name;
    console.log("connected to mongo!");
  })
  .catch((error: any) => {
    console.log("Error connection to db", error);
  });
