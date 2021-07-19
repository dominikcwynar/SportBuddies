import React from "react";
import { RegisterForm } from "../components/RegisterForm";
import { Flex, Heading,Box, Center,VStack, Spacer} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react"

export const RegisterView: React.FC = () => {
    return (
        <>
            {/*<Flex width={"50%"} height={"100%"} bgColor={"#7c3651"} opacity={"0.5"} position={"absolute"} flexDirection={"column"}/>*/}
            <VStack width="50%" height={"100%"} left="0px" paddingTop="10%" position="absolute">
                <Heading color={"#ffffff"} fontFamily="Montserrat" fontStyle="italic" size={"2xl"}>Become a Sport Buddy</Heading>
                <Heading color={"#ffffff"} fontFamily="Montserrat" fontWeight="400" size={"md"}>Meet new friends today.</Heading>
            </VStack>

            <Flex width="100%" height="100vh" alignItems="center" justifyContent="center" flexDirection="row" bgColor={"blue.900"}>
                <Image width="50%" height="100%" objectFit="cover" src="https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                <VStack width="50%" minHeight="40%" >
                    <Heading color={"cyan.100"} fontFamily="Montserrat" fontWeight={"bold"} size={"3xl"}>Register</Heading>
                    <Spacer/>
                    <Center>
                        <Box width="600px" >
                            <RegisterForm/>
                        </Box>
                    </Center>
                </VStack>
            </Flex>
        </>

    );
};