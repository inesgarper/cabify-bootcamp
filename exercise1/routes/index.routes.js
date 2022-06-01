const router = require("express").Router();

const APIHandler = require("../services/APIHandler");
const service = new APIHandler

router.get("/", (req, res) => res.json("Hello world"))

router.post("/", (req, res) => {

  const { destination, body } = req.body

  service
    .createMessage(destination, body)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json(err))

})

module.exports = router;