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

  if (destination == "" || message == "") {

    res.status(422).json({ message: "Fields must not be empty" })

  } else if (!destination || !message) {

    res.status(400).json({ message: "Both keys, destination and message are required" })

  } else if (typeof destination != 'string' || typeof message != 'string') {

    res.status(400).json({ message: "Fields must be filled with text" })

  } else {

    service
      .createMessage(messageData)
      .then(({ data }) => res.status(200).json(data))
      .catch(err => res.status(500).json(err))

  }

})

module.exports = router;