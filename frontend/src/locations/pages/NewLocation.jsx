import { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./LocationForm.css";
import Button from "../../shared/components/FormElements/Button";

const formReducer = (state, action) => () => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let isFormValid = true;

      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && action.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        input: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
          isValid: isFormValid,
        },
      };

    default:
      return state;
  }
};

function NewLocation() {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback(
    (id, value, isValid) => () => {
      dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    },
    [dispatch],
  );

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please input valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please input a valid description for at least 5 characters."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
}

export default NewLocation;
