import React from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export const NumberInputElem = ({ minVal, maxVal, onChangeFn }) => {
  return (
    <NumberInput
      defaultValue={0}
      min={minVal}
      max={maxVal}
      size="lg"
      maxW={24}
      boxShadow="lg"
      rounded="md"
      onChange={onChangeFn}
    >
      <NumberInputField fontSize={30} fontWeight="bold" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
