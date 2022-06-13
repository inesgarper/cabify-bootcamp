import Credit from "../models/credit.js";
import newCreditTransaction from "../transactions/newCredit.js";

export default (creditParams) => {
  const CreditModel = Credit()                        // Llama al modelo de crédito y se lo guarda en una variable?
  const credit = new CreditModel(creditParams);       // Crea el nuevo crédito
  const conditions = {
    location: credit.location                         // Crea conditions que guarda location (sería como darle un nombre)
  };
  return newCreditTransaction(conditions, creditParams);    // Y ejecuta la función de LA TRANSACIÓN newCredit que
  // guarda el crédito en la base de datos
};

