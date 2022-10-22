export const generateMatches = (people) => {
  const peopleAsObject = Object.fromEntries(
    people.map((person) => [person.id, person])
  );
  const ids = Object.keys(peopleAsObject);
  const numberOfPeople = ids.length;

  const matches = {};
  const alreadyAssigned = [];

  // generate match for each person
  for (let currentId of ids) {
    const unassigned = setSubtraction(new Set(ids), new Set(alreadyAssigned));
    const possiblePeople = setSubtraction(unassigned, new Set([currentId]));
    const withoutExceptions = setSubtraction(
      possiblePeople,
      new Set(peopleAsObject[currentId].exceptions)
    );
    const currentSelection = getRandomItem(withoutExceptions);

    // set matches
    matches[currentId] = peopleAsObject[currentSelection];
    alreadyAssigned.push(currentSelection);
  }

  if (Object.values(matches).includes(undefined)) {
    return generateMatches(people);
  } else {
    return matches;
  }
};

const getRandomItem = (set) => {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
};

const setSubtraction = (setA, setB) => {
  return new Set([...setA].filter((x) => !setB.has(x)));
};
