import React, { useState } from 'react';
import {
    Flex,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Checkbox
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { register as appRegister } from '../api/authAPI';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routing/routes';
// import {useAuth} from "../context/AuthProvider";

interface Inputs {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    checked: boolean
}

export const RegisterForm: React.FC = () => {
    const history = useHistory();
    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting }
    } = useForm<Inputs>();
    // const { login } = useAuth();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const onSubmit = async (data: Inputs) => {
        if (data.password !== data.confirmPassword) {
            setRegisterError('Passwords are not the same!');
        }
        else {
            console.log(data.email);
            setRegisterError(null);
            await appRegister(data.email, data.username,data.password,data.confirmPassword)
                .then(success => {
                    if (success) {
                        history.push(Routes.REGISTERED);
                    }
                    else{
                        setRegisterError('User already exists!');
                        console.log(registerError);
                    }

                });
        }
    }

    return (

            <form style={{maxWidth: '100%'}} onSubmit={handleSubmit(onSubmit)}>

                <FormControl isInvalid={!!errors.username} isRequired>
                    <FormLabel color='cyan.100'>Username</FormLabel>
                    <Input
                        name='username'
                        type='text'
                        placeholder='Enter username'
                        _focus={{background:"whiteAlpha"}}
                        variant={"filled"}
                        ref={register({
                            required: 'This field is required!',
                            validate: username  => !/[^a-zA-Z0-9]/.test(username)
                                || 'Username must include only letters and digits!'
                        })
                        }
                    />
                    <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                </FormControl>
                <FormControl mt={3} isInvalid={!!errors.email} isRequired>
                    <FormLabel color='cyan.100'>Email address</FormLabel>
                    <Input
                        name='email'
                        type='email'
                        placeholder='Enter email address'
                        _focus={{background:"whiteAlpha"}}
                        variant={"filled"}
                        ref={register({ required: true })}/>
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl mt={3} isInvalid={!!errors.password} isRequired>
                    <FormLabel color='cyan.100'>Password</FormLabel>
                    <Input
                        name='password'
                        type='password'
                        placeholder='Enter password'
                        _focus={{background:"whiteAlpha"}}
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
                        _focus={{background:"whiteAlpha"}}
                        ref={register({ required: 'This field is required!' })}/>
                    <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!registerError}>
                    <FormErrorMessage mt={3}>{registerError}</FormErrorMessage>
                </FormControl>
                <FormControl my={6} isInvalid={!!errors.checked} isRequired>
                    <Checkbox
                        name='checked'
                        color='cyan.100'
                        variant={"filled"}
                        colorScheme={"cyan"}
                        ref={register({ required: 'This field is required!' })}>I accept the policy and terms</Checkbox>
                    <FormErrorMessage>{errors.checked?.message}</FormErrorMessage>
                </FormControl>
                <Flex justifyContent='space-between'>
                    <Button
                        width='45%'
                        border='1px'
                        borderRadius={14}
                        borderColor='cyan.100'
                        variant={"outline"}
                        color='cyan.100'
                        onClick={() => history.push(Routes.LOGIN)}
                        _hover={{transform: 'scale(1.02)'}}
                        _active={{transform: 'scale(1.02)'}}>Log In</Button>
                    <Button
                        type='submit'
                        width='45%'
                        borderRadius={14}
                        bgColor='cyan.100'
                        colorScheme={"cyan"}
                        color={"blue.900"}
                        isLoading={isSubmitting}
                        _hover={{ bgColor: "cyan.200",
                            transform: 'scale(1.02)'}}
                        _active={{ bgColor: "cyan.700",
                            transform: 'scale(1.02)'}}>Sign Up</Button>
                </Flex>
            </form>
    );
}