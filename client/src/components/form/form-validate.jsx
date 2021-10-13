export const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (values.jobPosition.length > 15) {
    errors.jobPosition = 'Must be 15 characters or less';
  }

  return errors;
};
