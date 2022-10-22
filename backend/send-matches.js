const twilio = require("twilio");

const from = process.env.FROM;
const sid = process.env.SID;
const key = process.env.KEY;

let client = null;

if (sid && key) {
  client = twilio(sid, key);
}

export const sendMatches = async (people, matches) => {
  let textsSent = [];

  for (const currentPerson of people) {
    const matchPerson = matches[currentPerson.id];

    const { name } = currentPerson;
    const message = `Hi ${name}, You must buy a gift for ${matchPerson.name.toUpperCase()}. From Santa
    `;

    textsSent.push(message);

    if (client) {
      console.log(`SENT: ${message}`);

      await client.messages.create({
        body: message,
        to: currentPerson.number,
        from: from,
      });
    } else {
      console.log(`NOT SENT: ${message}`);
    }
  }
};
