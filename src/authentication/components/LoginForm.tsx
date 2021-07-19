import React, { useState } from "react";
import {
    Flex,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";
import { Routes } from "../../routing/routes";

interface Inputs {
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const history = useHistory();
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting },
    } = useForm<Inputs>();
    const [loginError, setLoginError] = useState<boolean>(false);
    const onSubmit = async (data: Inputs) => {
        await login(data.email, data.password).then((success) =>
            setLoginError(!success)
        );
    };

    return (
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email} isRequired>
                <FormLabel color="cyan.100">Email</FormLabel>
                <Input
                    name="email"
                    type="text"
                    placeholder="Enter email address"
                    variant={"filled"}
                    borderColor="cyan.100"
                    _focus={{background:"whiteAlpha"}}
                    borderRadius={14}
                    ref={register({ required: "This field is required!" })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={3} isInvalid={!!errors.password} isRequired>
                <FormLabel color="cyan.100">Password</FormLabel>
                <Input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    variant={"filled"}
                    borderColor="cyan.100"
                    _focus={{background:"whiteAlpha"}}
                    borderRadius={14}
                    ref={register({ required: "This field is required!" })}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={loginError}>
                <FormErrorMessage>Wrong username/email or password!</FormErrorMessage>
            </FormControl>
            <Flex justifyContent="space-between" mt={6}>
                <Button
                    width="45%"
                    border="1px"
                    borderRadius={14}
                    borderColor='cyan.100'
                    variant={"outline"}
                    color='cyan.100'
                    onClick={() => history.push(Routes.REGISTER)}
                    _hover={{transform: "scale(1.02)" }}
                    _active={{transform: "scale(1.02)" }}
                >
                    Sign Up
                </Button>
                <Button
                    type="submit"
                    width="45%"
                    borderRadius={14}
                    bgColor="cyan.100"
                    color={"blue.900"}
                    isLoading={isSubmitting}
                    _hover={{ bgColor: "cyan.200", transform: "scale(1.02)" }}
                    _active={{ bgColor: "cyan.700", transform: "scale(1.02)" }}
                >
                    Log In
                </Button>

            </Flex>
        </form>
    );
};