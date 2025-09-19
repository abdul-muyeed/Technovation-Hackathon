import { LoginForm } from "@/types/types";
import { domain } from "@/utils/backendDomain";

export default async function logoutUser(){
    const url = `${domain}/auth/logout`;
    const response = await fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-type": "application/json",
        },
    })
    const data = await response.json();
    if(response.status >= 300){
        throw data['message'];
    }

    return data['message'];
}