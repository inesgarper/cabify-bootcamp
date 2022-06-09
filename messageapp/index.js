import bodyParser from "body-parser";
import express from "express";
import { ValidationError, Validator } from "express-json-validator-middleware";

import getMessages from "./src/controllers/getMessages.js";
import sendMessage from "./src/controllers/sendMessage.js";
import getCredit from "./src/controllers/getCredit.js";
import setBudget from "./src/controllers/setBudget.js";

import { Budget, BudgetBackup } from "./src/models/budget.js"

const app = express();

const validator = new Validator({ allErrors: true });
const { validate } = validator;

const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string",
    },
    body: {
      type: "string",
    }
  },
};

const budgetSchema = {
  type: "object",
  required: ["amount"],
  properties: {
    amount: {
      type: "number"
    }
  }
}


app.post(
  "/message",
  bodyParser.json(),
  validate({ body: messageSchema }),
  sendMessage
);

app.get("/messages", getMessages);

app.post(
  "/credit",
  bodyParser.json(),
  validate({ body: budgetSchema }),
  setBudget
);

app.get("/credit", getCredit) // Just for personal testing :)

app.delete("/credit", (req, res) => { // Just for personal testing :)

  Promise
    .all([Budget.deleteMany(), BudgetBackup.deleteMany()])
    .then(() => res.status(200).json({ message: "BUDGET BORRADO" }))
    .catch(() => res.status(500).json({ message: "NO SE HA PODIDO BORRAR EL BUDGET" }))
})

app.get("/creditBackup", (req, res) => { // Just for personal testing :)

  BudgetBackup
    .find()
    .then(response => res.status(200).json(response))
    .catch(() => res.status(500).json({ message: "NO SE HA PODIDO traer EL budget backup" }))
})

app.use((err, req, res, _next) => {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

const port = 9003;
app.listen(port, () => {
  console.log("App started on PORT: ", port);
});
