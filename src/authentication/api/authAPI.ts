import axios from "axios";
import { baseUrl } from "../../constants/api";
export const login = (
    email: string,
    password: string
): Promise<string | null> =>
    axios
        .post(`${baseUrl}/login/`, {
            email,
            password,
        }).then((response)=>response.data["access"]).catch(()=>null);




export const register = (
    email: string,
    username: string,
    password: string,
    re_password : string
): Promise<string | null> =>
    axios
        .post(`${baseUrl}/register/`, {
            email,
            username,
            password,
            re_password
        })
        .then((response) => response.data)
        .catch(()=>null);