const router = require("express").Router();

const messagesController = require("../controllers/messagesController")


// ROUTES

router.post("/messages", messagesController.send_and_save_messages)

router.get("/messages", messagesController.messages_list)

router.delete("/messages", messagesController.delete_messages)


module.exports = router;