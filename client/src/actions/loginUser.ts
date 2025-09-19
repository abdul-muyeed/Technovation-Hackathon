import { loginForm } from "@/types/types";
import { domain } from "@/utils/backendDomain";

export default async function loginUser({form}: {form: loginForm}){
    const url = `${domain}/auth/login`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(form)
    })

    if(response.status >= 300){
        throw 'invalid credentials';
    }
}