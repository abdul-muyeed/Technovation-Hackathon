import { LoginForm } from "@/types/types";
import { domain } from "@/utils/backendDomain";

export default async function loginUser({form}: {form: LoginForm}){
    const url = `${domain}/auth/login`;
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

    return data['data'];
}