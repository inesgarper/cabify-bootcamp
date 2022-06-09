import getMessage from "../clients/getMessage.js";

export default async (req, res) => {

    const { messageId } = req.params

    const message = await getMessage(messageId);

    console.log('ESTAS COMPROBANDO EL ESTADO DEL MENSAJE ---', message)

    res.json(message.status);
}