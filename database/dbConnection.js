import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "NewsToVideo",
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(`Database Connection Error : ${err}`);
    });
};
