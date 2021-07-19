import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { Box, Center, Flex, Heading, Image, Spacer, VStack, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routing/routes';

export const LoginView: React.FC = () => {
    const history = useHistory();

    return (
        <>
            {/*<Flex width={"50%"} height={"100%"} bgColor={"#7c3651"} opacity={"0.5"} position={"absolute"} flexDirection={"column"}/>*/}
            <VStack width="50%" height={'100%'} right="0px" paddingTop="5%" position="absolute">
                <Heading color={'#ffffff'} fontFamily="Montserrat" fontStyle="italic" size={'2xl'}>
                    Join others in their sports activities
                </Heading>
                <Heading color={'#ffffff'} fontFamily="Montserrat" fontWeight="400" size={'md'}>
                    They are waiting for you.
                </Heading>
            </VStack>

            <Flex width="100%" height="100vh" alignItems="center" justifyContent="center" flexDirection="row" bgColor={'blue.900'}>
                <VStack width="50%" minHeight="40%">
                    <Heading color={'cyan.100'} fontFamily="Montserrat" fontWeight={'bold'} size={'3xl'}>
                        Log In
                    </Heading>
                    <Spacer />
                    <Center>
                        <Box width="600px">
                            <LoginForm />
                        </Box>
                    </Center>
                    {/*<Button colorScheme={"transparent"} justify-self={"center"} onClick={()=>history.push(Routes.RESET_PASSWORD)}> Forgotten password? Click here</Button>*/}
                </VStack>
                <Image width="50%" height="100%" objectFit="cover" src="https://images.pexels.com/photos/6392679/pexels-photo-6392679.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            </Flex>
        </>
    );
};
