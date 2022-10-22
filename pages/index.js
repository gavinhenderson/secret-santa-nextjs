import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Home.module.css";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import NameCollector from "../src/NameCollector/NameCollector";
import { ExceptionSetting } from "../src/ExceptionSetting/ExceptionSetting";

const NAME_COLLECTION = "NAME_COLLECTION";
const EXCEPTION_SETTING = "EXCEPTION_SETTING";

export default function Home() {
  const [people, setPeople] = useState([
    { id: uuidv4(), name: "Gavin", number: "+447414525394", exceptions: [] },
    { id: uuidv4(), name: "Linsey", number: "+447414525394", exceptions: [] },
    { id: uuidv4(), name: "Scott", number: "+447414525394", exceptions: [] },
    { id: uuidv4(), name: "Roland", number: "+447414525394", exceptions: [] },
    { id: uuidv4(), name: "Steph", number: "+447414525394", exceptions: [] },
    { id: uuidv4(), name: "Naomi", number: "+447414525394", exceptions: [] },
    { id: uuidv4(), name: "Elaine", number: "+447414525394", exceptions: [] },
    { id: uuidv4(), name: "Stephen", number: "+447414525394", exceptions: [] },
  ]);
  const [step, setStep] = useState(EXCEPTION_SETTING);

  // const [people, setPeople] = useState([]);
  // const [step, setStep] = useState(NAME_COLLECTION);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const generateMatches = async (body) => {
    setLoading(true);
    try {
      const response = await fetch("./api/generate-matches", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setLoading(false);
      setData(true);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);
    }
    console.log(result);
  };

  const toggleException = (personToToggleId, exception) => {
    const newPeople = people.map((person) => {
      if (person.id !== personToToggleId) return person;

      const oldExceptions = person.exceptions;
      let newExceptions = [];
      if (oldExceptions.includes(exception)) {
        newExceptions = oldExceptions.filter((x) => x !== exception);
      } else {
        newExceptions = [...oldExceptions, exception];
      }

      return {
        ...person,
        exceptions: newExceptions,
      };
    });

    setPeople(newPeople);
  };

  const nextStage = (people) => {
    const fullPeople = people.map((x) => ({ ...x, exceptions: [] }));
    setPeople(fullPeople);
    setStep(EXCEPTION_SETTING);
  };

  return (
    <div className={styles.container}>
      <>
        <Box margin={4}>
          <Text fontSize="4xl" as="h1">
            Secret Santa
          </Text>
          <Text fontSize="s" fontStyle="italic">
            by{" "}
            <Link color="teal.500" href="https://gavinhenderson.me">
              Gavin Henderson
            </Link>
          </Text>
          <Text>
            Enter the names and phone numbers of all the people you want to take
            part in your secret santa game. They will all then be sent a text
            letting them know who they have to buy a present for.
          </Text>
        </Box>
        {error && (
          <Box p={4}>
            <Text color="red.400" fontWeight="bold">
              Uh oh, something went wrong.
            </Text>
          </Box>
        )}
        {data && (
          <Box p={4}>
            <Text color="green.500" fontWeight="bold">
              Your secret santa has started! A text has been sent to all your
              participants.
            </Text>
          </Box>
        )}
        {!error && !data && step === NAME_COLLECTION && (
          <NameCollector nextStage={nextStage}></NameCollector>
        )}
        {!error && !data && step === EXCEPTION_SETTING && (
          <ExceptionSetting
            people={people}
            toggleException={toggleException}
          ></ExceptionSetting>
        )}
        {!error && !data && step === EXCEPTION_SETTING && (
          <Box p={4}>
            <Button
              disabled={loading || error}
              onClick={async () => {
                try {
                  await generateMatches({ variables: { people } });
                } catch (_) {
                  // nom
                }
              }}
            >
              Submit
            </Button>
          </Box>
        )}
      </>
    </div>
  );
}
