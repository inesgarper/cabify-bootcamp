const router = require("express").Router();

const { saveMessage, getMessages } = require("../utils")

const APIHandler = require("../services/APIHandler");
const service = new APIHandler

router.post("/messages", (req, res) => {

  const { destination, message, number } = req.body

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
      .sendMessage(messageData)
      .then(() => {

        saveMessage({ destination, message, number, sent: true, confirmed: true })
          .then(() => res.status(200).json({ message: "Message saved in the db" }))
          .catch(err => res.status(500).json({ message: "Message couldn't be saved" }))

      })
      .catch((err) => {

        if (err.response.status == 504) {

          saveMessage({ destination, message, number, sent: true, confirmed: false })
            .then(() => res.status(200).json({ message: "Message sent but not confirmed" }))
            .catch(err => res.status(500).json({ message: "Message couldn't be saved" }))

        } else if (err.response.status == 500) {

          saveMessage({ destination, message, number, sent: false, confirmed: false })
            .then(() => res.status(200).json({ message: "Message saved but not sent" }))
            .catch(err => res.status(500).json({ message: "Message couldn't be saved" }))

        }

      })

  }
})

router.get("/messages", (req, res) => {

  getMessages()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))

})


module.exports = router;