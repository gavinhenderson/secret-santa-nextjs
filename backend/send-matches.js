export const sendMatches = async (people, matches) => {
  let textsSent = [];

  for (const currentPerson of people) {
    const matchPerson = matches[currentPerson.id];

    const { name } = currentPerson;
    const message = `Hi ${name}, You must buy a gift for ${matchPerson.name.toUpperCase()}. From Santa
    `;

    textsSent.push(message);

    console.log(message);

    // await client.messages.create({
    //   body: message,
    //   to: currentPerson.number,
    //   from: twilioFrom,
    // });
  }
};
