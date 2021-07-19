import React from "react";
import {Heading} from "@chakra-ui/react"


interface IProps{
    username: string
}
export const UserGreeting: React.FC<IProps> = (data) => {
    return(
        <Heading marginTop={"20px"} marginBottom={"8px"} alignSelf={"center"} size="md">Hello {data.username}</Heading>
    )
}