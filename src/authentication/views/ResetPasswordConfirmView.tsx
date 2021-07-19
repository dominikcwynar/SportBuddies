import React, {useState} from "react";

import {
    Button, Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input
} from "@chakra-ui/react";

import {RouteComponentProps, useHistory} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../../constants/api";
import {useForm} from "react-hook-form";
import {Routes} from "../../routing/routes";

interface MatchParams{
  uid: string,
  token: string
}
const reset_passwd = (
    uid: string,
    token: string,
    new_password: string,
    re_new_password: string
): Promise<string | null> =>
    axios
        .post(`${baseUrl}/auth/users/reset_password_confirm/`, {
          uid,
            token,
            new_password,
            re_new_password
        }).then((response)=>response.data).catch(()=>null);

export const ResetPasswordConfirmView: React.FC<RouteComponentProps<MatchParams>> = props => {
  const history = useHistory();
  const {uid,token} = props.match.params;
  const {register, handleSubmit, errors} = useForm();
  const [new_password, setNewPassword] = useState("");
  const [re_new_password, setReNewPassword] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const onSubmit = () => {

      if (new_password !== re_new_password) {
          setRegisterError('Passwords are not the same!');
      }else{
          setRegisterError(null);
          reset_passwd( uid, token,new_password, re_new_password).then((val)=>{if(val!==null)history.push(Routes.LOGIN)});
      }

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
          Enter your new password:
        </Heading>
        <form style={{ width: "40%" }} onSubmit={handleSubmit(onSubmit)}>
          <FormControl mt={3} isInvalid={!!errors.password} isRequired>
            <FormLabel color='cyan.100'>Password</FormLabel>
            <Input
                name='password'
                type='password'
                placeholder='Enter password'
                focusBorderColor='cyan.100'
                onChange={(e)=>setNewPassword(e.target.value)}
                variant={"filled"}
                ref={register({
                  required: 'This field is required!',
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters!'
                  },
                  validate: {
                    digit: password => /[0-9]/.test(password)
                        || 'Password must include at least one digit!',
                    lowercase: password => /[a-z]/.test(password)
                        || 'Password must include at least one lowercase letter!',
                    uppercase: password => /[A-Z]/.test(password)
                        || 'Password must include at least one uppercase letter!',
                    nonAlphaNumeric: password => /[^a-zA-Z0-9]/.test(password)
                        || 'Password must include at least one non-alphanumeric character!'
                  }})
                }/>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mt={3} isInvalid={!!errors.confirmPassword} isRequired>
            <FormLabel color='cyan.100'>Confirm password</FormLabel>
            <Input
                name='confirmPassword'
                type='password'
                variant={"filled"}
                placeholder='Enter password again'
                focusBorderColor='cyan.100'
                onChange={(e)=>setReNewPassword(e.target.value)}
                ref={register({ required: 'This field is required!' })}
                />
            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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
              {registerError}
          </Heading>
      </Flex>
    </>
  );
};
