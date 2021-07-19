import {useState} from "react"
import {Profile} from "../api/profileAPI.types";
import {getProfile, postProfile, putProfile} from "../api/profileAPI";

// eslint-disable-next-line
export function useProfile(){
    const [profile, setProfile] = useState<Profile>();
    const [isFetching, setFetching] = useState(false);

    async function fetchProfile(): Promise<boolean> {
        setFetching(true);
        const profile = await getProfile();
        setFetching(false);

        if (profile !== null) {
            setProfile(profile);
            return true;
        }
        return false;
    }
    async function createProfile(name: string, age:string, gender: string, description: string, favourite_disciplines_id:number[]): Promise<boolean>{
        setFetching(true);
        console.log(name,age,gender,description,favourite_disciplines_id);
        const profile = await postProfile(name,age,gender,description,favourite_disciplines_id);

        if(profile == null){
            setFetching(false);
            return false;
        }
        return await fetchProfile();
    }
    async function updateProfile(name: string, age:string, gender: string, description: string, favourite_disciplines_id:number[]): Promise<boolean>{
        setFetching(true);
        console.log(name,age,gender,description,favourite_disciplines_id);
        const profile = await putProfile(name,age,gender,description,favourite_disciplines_id);

        if(profile == null){
            setFetching(false);
            return false;
        }
        return await fetchProfile();
    }

    return {profile, isFetching, fetchProfile, createProfile, updateProfile};
}