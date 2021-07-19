import React from "react";

import { Button, Flex, Heading } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../routing/routes";
export const RegisteredInfoView: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <Flex
        width="100%"
        height="100vh"
        justifyContent={"center"}
        alignItems="center"
        flexDirection="column"
        bgColor={"blue.900"}
      >
        <Heading
          color={"cyan.100"}
          fontFamily="Montserrat"
          fontWeight={"bold"}
          size={"xl"}
        >
          A confirmation email has been sent to your email address.
        </Heading>
        <Button
          marginTop="5%"
          width={"10%"}
          borderRadius={14}
          bgColor="cyan.100"
          color={"blue.900"}
          onClick={() => history.push(Routes.LOGIN)}
          _hover={{ transform: "scale(1.02)" }}
          _active={{ transform: "scale(1.02)" }}
        >
          Log In
        </Button>
      </Flex>
    </>
  );
};
