import React from "react";
import { Box } from "@chakra-ui/react";

const NoMembersCard = () => {
  return(
    <Box
      w={300}
      h={75}
      boxShadow="dark-lg"
      rounded="md"
      p="10px"
      m="5px"
      lineHeight="55px"
      fontSize="24px"
      fontWeight="bold"
      align="center"
    >
      No members
    </Box>
  );
};

export default NoMembersCard;