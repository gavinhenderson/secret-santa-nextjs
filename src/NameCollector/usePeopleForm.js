import { useForm, useFieldArray } from "react-hook-form";

const DEFAULT_PEOPLE = [
  {
    name: "",
    number: "",
    exceptions: [],
  },
];

const usePeopleForm = (onSubmit) => {
  const { register, control, handleSubmit, reset, watch, errors } = useForm({
    defaultValues: {
      people: DEFAULT_PEOPLE,
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "people",
    }
  );

  const people = fields.map((field, index) => {
    const error = errors && errors.people && errors.people[index];

    const nameError = error && error.name;
    const numberError = error && error.number;

    return {
      ...field,
      numberLabelProps: {
        htmlFor: `number-${field.id}`,
      },
      numberInputProps: {
        id: `number-${field.id}`,
        isInvalid: !!numberError,
        name: `people[${index}].number`,
        ref: register({
          required: "You must enter a phone number.",
          validate: validatePhoneNumber,
        }),
      },
      numberError: numberError && numberError.message,
      nameLabelProps: {
        htmlFor: `name-${field.id}`,
      },
      nameInputProps: {
        name: `people[${index}].name`,
        isInvalid: !!nameError,
        ref: register({ required: "You must enter a name." }),
        id: `name-${field.id}`,
      },
      nameError: nameError && nameError.message,
    };
  });

  return {
    handleSubmit: handleSubmit(onSubmit),
    people,
    newBlankPerson: () => append({ name: "", number: "", exceptions: [] }),
  };
};

const validatePhoneNumber = (number) => {
  if (!number.startsWith("7")) {
    return "A phone number should start with +447";
  }
  if (number.length > 10) {
    return "Too many digits";
  }

  if (number.length < 10) {
    return "Not enough digits";
  }

  return null;
};

export default usePeopleForm;
