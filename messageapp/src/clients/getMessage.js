import { Message } from "../models/message.js";

export default (ID) => Message.findById(ID);