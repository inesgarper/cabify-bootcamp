import getCredit from "../clients/getCredit.js";

export default async (req, res) => {
  const credit = await getCredit();

  res.json(credit);
}
