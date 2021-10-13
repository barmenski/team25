import React, {useContext} from 'react';
import { IssuesContext } from '../../contexts/issuesContext';
import {Heading} from '@chakra-ui/react';

export const IssuesListLine = () => {
  const {issues} = useContext(IssuesContext);

  return (
    <Heading 
      textAlign='start' 
      mt='30px'
      mb='30px' 
      maxW='1200px' 
      fontSize='24px'
      fontWeight='bold'
    >
      Planning session {issues.length === 0 ? '' : '(issues : '}
      {issues.map((issue, index) =>
        issues.length > index + 1 ? (
          <span key={index}>{issue.name.slice(6)}, </span>
        ) : (
          <span key={index}>{issue.name.slice(6)})</span>
        )
      )}
    </Heading>
  );
}
