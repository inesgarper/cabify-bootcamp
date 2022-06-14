export default async (req, res) => {

    const version = process.env.SERVICE_NAME

    version === 'message-v1' ? res.status(200).json('VERSION 1') : res.status(200).json('VERSION 2')
};