import { useState } from "react";

import styles from "../styles/Home.module.css";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import NameCollector from "../src/NameCollector/NameCollector";
import { ExceptionSetting } from "../src/ExceptionSetting/ExceptionSetting";

const NAME_COLLECTION = "NAME_COLLECTION";
const EXCEPTION_SETTING = "EXCEPTION_SETTING";

export default function Home() {
  const [people, setPeople] = useState([]);
  const [step, setStep] = useState(NAME_COLLECTION);

  const generateMatches = () => {};
  const data = null;
  const loading = null;
  const error = null;

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
            <Link color="teal.500" href="https://www.gavinhenderson.me">
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
