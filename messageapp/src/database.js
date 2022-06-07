import mongoose from "mongoose";

const server = "localhost:27017";
const database = "cabify_bootcamp";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});
