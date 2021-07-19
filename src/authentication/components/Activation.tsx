import axios from "axios";
import {baseUrl} from "../../constants/api";
import React, {useEffect, useState} from "react";
import {Button, Flex, Heading} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";
import {Routes} from "../../routing/routes";
import { useHistory } from 'react-router-dom';


const activate = (
    token: string | null
): Promise<boolean> =>
    axios
        .get(`${baseUrl}/email-verify/?token=${token}`)
        .then((response)=> {
            response.data
            return true;
        })
        .catch(()=>false);

export const ActivationView: React.FC= () => {
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search)
    const token = searchParams.get('token');
    const history = useHistory();
    // activate(token).then((val)=>{if(val!==null) {
    //     setOutput(val)
    // } });
    const [activationState, setActivationState] = useState(false);
    const [isFetching, setFetching] = useState<boolean>(true);
    useEffect(()=>{
        setFetching(true);
        activate(token).then((output)=>{
            setActivationState(output)
        });
        setFetching(false);
    },[])
    return (
        <>

            <Flex width="100%" height="100vh" justifyContent={"center"} alignItems="center" flexDirection="column" bgColor={"blue.900"}>
                {isFetching==false && activationState==false && <Heading color={"cyan.100"} fontFamily="Montserrat" fontWeight={"bold"} size={"xl"}>Error while account activation.</Heading>}
                {isFetching==false && activationState==true && <Heading color={"cyan.100"} fontFamily="Montserrat" fontWeight={"bold"} size={"xl"}>Your account has been activated.</Heading>}
                {/*{output!=="null" ? <Heading color={"cyan.100"} fontFamily="Montserrat" fontWeight={"bold"} size={"xl"}>Your account has been activated.</Heading>:*/}
                {/*    <Heading color={"cyan.100"} fontFamily="Montserrat" fontWeight={"bold"} size={"xl"}>Your account cannot be activated.</Heading>}*/}

                <Button
                marginTop="5%"
                width={"10%"}
                borderRadius={14}
                bgColor="cyan.100"
                color={"blue.900"}
                onClick={() => history.push(Routes.LOGIN)}
                _hover={{transform: "scale(1.02)" }}
                _active={{transform: "scale(1.02)" }}
                >
                Log In
                </Button>
                </Flex>
        </>
    );
};