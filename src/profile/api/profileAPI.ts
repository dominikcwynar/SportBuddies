import axios from "axios";

import {Profile, ProfileCreation} from "./profileAPI.types";
import {baseUrl} from "../../constants/api";

export const postProfile = (name: string, age:string, gender: string, description: string, favourite_disciplines_id: number[] ): Promise<ProfileCreation | null>=>
    axios
        .post(`${baseUrl}/user-profile/`, {
            name,
            age,
            gender,
            description,
            favourite_disciplines_id
        })
        .then((response) => response.data)
        .catch(() => null);

export const putProfile = (name: string, age: string, gender: string, description: string, favourite_disciplines_id: number[]): Promise<ProfileCreation | null>=>
    axios.
        put(`${baseUrl}/user-profile/`,{
            name,
            age,
            gender,
            description,
            favourite_disciplines_id
        })
        .then((response)=>response.data)
        .catch(() => null);

export function getProfile() : Promise<Profile>{
    return axios
        .get(`${baseUrl}/user-profile/`)
        .then((response)=> response.data)
        .catch(()=> null)
}