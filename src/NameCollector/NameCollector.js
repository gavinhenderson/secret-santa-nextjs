import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Stack,
} from "@chakra-ui/react";

import usePeopleForm from "./usePeopleForm";

const NameCollector = ({ nextStage }) => {
  const [permission, setPermission] = useState(false);

  const togglePermission = () => {
    setPermission(!permission);
  };

  const onSubmit = (data) => {
    const peopleWithIds = data.people.map((person) => ({
      ...person,
      id: uuidv4(),
      number: `+44${person.number}`,
    }));

    nextStage(peopleWithIds);
  };
  const { people, newBlankPerson, handleSubmit } = usePeopleForm(onSubmit);

  return (
    <Box padding={4}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          {people.map((person) => (
            <FormControl key={person.id}>
              <Stack>
                <Box>
                  <FormLabel {...person.nameLabelProps}>Name</FormLabel>
                  <Input
                    {...person.nameInputProps}
                    placeholder="Gavin Henderson"
                  />
                  <FormErrorMessage isInvalid={person.nameInputProps.isInvalid}>
                    {person.nameError}
                  </FormErrorMessage>
                </Box>

                <Box>
                  <FormLabel {...person.numberLabelProps}>
                    Phone Number
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>+44</InputLeftAddon>
                    <Input
                      {...person.numberInputProps}
                      type="tel"
                      roundedLeft="0"
                      placeholder="7414565754"
                    />
                  </InputGroup>
                  <FormErrorMessage
                    isInvalid={person.numberInputProps.isInvalid}
                  >
                    {person.numberError}
                  </FormErrorMessage>
                </Box>
              </Stack>
            </FormControl>
          ))}
        </Stack>
        <Stack pt={8}>
          <Checkbox onChange={togglePermission} isChecked={permission}>
            All the participants have consented to having their phone numbers
            used and have agreed to the{" "}
            <Link href="/privacy-policy.html" color="teal.500">
              privacy policy.
            </Link>
          </Checkbox>
          <Box>
            <Button mr={3} onClick={newBlankPerson}>
              Add Person
            </Button>
            <Button type="submit" isDisabled={!permission}>
              Submit
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default NameCollector;
