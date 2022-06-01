const router = require("express").Router();

const APIHandler = require("../services/APIHandler");
const service = new APIHandler

router.get("/", (req, res) => res.json("Hello world"))

router.post("/messages", (req, res) => {

  const { destination, message } = req.body

  const messageData = {
    destination,
    body: message
  }

  service
    .createMessage(messageData)
    .then(({ data }) => res.status(200).json(data))
    .catch(err => res.status(500).json(err))

})

module.exports = router;