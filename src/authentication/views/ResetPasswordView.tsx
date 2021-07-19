import React, { FormEvent, useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,Center
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../../constants/api";
import {Routes} from "../../routing/routes";

const reset_passwd = (
    email: string,
): Promise<string | null> =>
    axios
        .post(`${baseUrl}/auth/users/reset_password/`, {
          email
        }).then((response)=>response.data).catch(()=>null);

export const ResetPasswordView: React.FC = () => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit: " + mail);
    reset_passwd(mail).then((val)=>{if(val!==null) history.push(Routes.LOGIN)});
  };
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
          marginBottom={"10px"}
        >
          Enter your email address:
        </Heading>
        <form style={{ width: "40%" }} onSubmit={handleSubmit}>
          <FormControl isRequired>
            <Input
              name="email"
              type="text"
              placeholder="Email"
              focusBorderColor="cyan.100"
              onChange={(e) => {
                setMail(e.target.value);
              }}
              variant={"filled"}
            />
            <FormErrorMessage>wrong email address</FormErrorMessage>
          </FormControl>
          <Center> <Button
              marginTop="10px"
              borderRadius={14}
              bgColor="cyan.100"
              color={"blue.900"}
              type={"submit"}
              width={"100px"}
              _hover={{ transform: "scale(1.02)" }}
              _active={{ transform: "scale(1.02)" }}
          >
            Send
          </Button></Center>

        </form>
        <Heading
            color={"cyan.100"}
            fontFamily="Montserrat"
            fontWeight={"bold"}
            size={"md"}
            marginTop={"10px"}
        >
          We will send you an email.
        </Heading>
      </Flex>
    </>
  );
};
