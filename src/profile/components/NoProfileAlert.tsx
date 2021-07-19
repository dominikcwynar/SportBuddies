import {Alert, AlertIcon} from "@chakra-ui/react";
import React from "react";


export const NoProfileAlert: React.FC = () =>{

    return(
        <Alert status="warning" marginTop={"60px"}>
            <AlertIcon />
            Seems your account is not complete. Fill your profile.
        </Alert>

    )
}