import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  Select,
  Input,
} from "@chakra-ui/react";
import './KickPlayerModal.scss';

export const ReviseIssueModal = ({ issue, onClose, setCurrentIssue, onRevise }) => {
  const [errors, setErrors] = useState({
    nameError: false,
    linkError: false,
    priorityError: false
  });
  
  useEffect(()=>{
    if (issue.id === '') {
      setCurrentIssue(issue => ({ ...issue, id: `${new Date().valueOf()}` }));
    }
  }, [issue]);

  const handleTypesSelect = (e) => {
    if (e.target.value !== "low"
      && e.target.value !== "middle"
      && e.target.value !== "height"
    ) {
      setErrors((errors) => ({ ...errors, priorityError: true }));
    } else {
      setErrors((errors) => ({ ...errors, priorityError: false }));
    }
    setCurrentIssue(issue => ({ ...issue, priority: e.target.value }));
  }

  const handleInputNameSelect = (e) => {
    const issueString = 'issue';
    const decimal = /^[0-9]+$/g;
    if (e.target.value.slice(0, 5) !== issueString || !decimal.test(e.target.value.slice(6))) {
      setErrors((errors) => ({ ...errors, nameError: true }));
    } else {
      setErrors((errors) => ({ ...errors, nameError: false }));
    }
    setCurrentIssue(issue => ({ ...issue, name: e.target.value }));
  }

  const handleInputLinkSelect = (e) => {
    setCurrentIssue(issue => ({ ...issue, link: e.target.value }));
  }

  const inputsValidation = () => {
    let isValid = true;
    if (issue.name === '') {
      setErrors((errors) => ({ ...errors, nameError: true }));
      isValid = false;
    };

    if (issue.priority === '') {
      setErrors((errors) => ({ ...errors, priorityError: true }));
      isValid = false;
    };
    return isValid;
  }

  const handleReviseClick = () => {
    const isValid = inputsValidation();

    if (errors.nameError === true
      || errors.priorityError === true
      || !isValid
    ) {
      return;
    } else {
      onRevise();
      onClose(false);
    }
  }

  return (
    <>
      <Text
        fontSize="30px"
        fontWeight="800"
        align="center"
      >
        Create Issue
      </Text>
      <FormControl>
        <Text
          fontSize="sm"
          fontWeight="bold"
          textAlign="center"
          mb="-16px"
          color={errors.nameError === true ? 'red' : 'black'}
        >
          Input string 'issue' and number of issue
        </Text>
        <Flex margin="20px">
          <FormLabel mb="0" fontSize="lg" fontWeight="bold">Title:</FormLabel>
          <Spacer />
          <Input
            ml="50px"
            value={issue.name}
            onChange={handleInputNameSelect}
            fontWeight="bold"
            fontSize="lg"
          />
        </Flex>
        <Flex margin="20px">
          <FormLabel mb="0" fontSize="lg" fontWeight="bold">Link:</FormLabel>
          <Spacer />
          <Input
            ml="50px"
            value={issue.link}
            onChange={handleInputLinkSelect}
            fontWeight="bold"
            fontSize="lg"
          />
        </Flex>
        <Text
          fontSize="sm"
          fontWeight="bold"
          textAlign="center"
          mb="-16px"
          color={errors.priorityError === true ? 'red' : 'black'}
        >
          Select issues priority
        </Text>
        <Flex margin="20px">
          <FormLabel mb="0" fontSize="lg" fontWeight="bold">Priority:</FormLabel>
          <Select
            placeholder="Select issues priority"
            w="50%"
            ml="23px"
            fontWeight="bold"
            fontSize="lg"
            onChange={handleTypesSelect}
            value={issue.priority}
          >
            <option value="low" >Low</option>
            <option value="middle" >Middle</option>
            <option value="height" >Height</option>
          </Select>
        </Flex>
      </FormControl>
      <Flex justify="space-around">
        <Button
          colorScheme={'facebook'}
          height={47}
          width={189}
          variant="solid"
          mr={3}
          onClick={handleReviseClick}
        >
          Yes
        </Button>
        <Button
          colorScheme={'facebook'}
          height={47}
          width={189}
          variant="outline"
          onClick={() => onClose(false)}>
          No
        </Button>
      </Flex>
    </>
  );
}