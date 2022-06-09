import mongoose from "mongoose";

import database from "../database.js";
import databaseBackup from "../databaseBackup.js";

const messageSchema = new mongoose.Schema({
  destination: String,
  body: String,
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT"],
  },
  queueStatus: {
    type: String,
    enum: ["QUEUED", "PROCESSING", "FINISHED"]
  }
});

const Message = database.model("Message", messageSchema)
const MessageBackup = databaseBackup.model("MessageBackup", messageSchema)

export { Message, MessageBackup }
