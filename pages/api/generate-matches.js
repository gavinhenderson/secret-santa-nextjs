// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { generateMatches } from "../../backend/generate-matches";
import { sendMatches } from "../../backend/send-matches";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const matches = generateMatches(body.variables.people);
  await sendMatches(body.variables.people, matches);

  res.status(200).json({ name: "John Doe" });
}
