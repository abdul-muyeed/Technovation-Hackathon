import { RegisterForm } from "@/types/types";
import { domain } from "@/utils/backendDomain";

export default async function registerUser({form}:{form: RegisterForm}){
    const url = `${domain}/auth/register`;
    const response = await fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(form)
    })
    const data = await response.json();
    if(response.status >= 300){
        throw data['message'];
    }

    return data['message'];
}