import { domain } from "@/utils/backendDomain";

export default async function uploadImage({form}: {form:FormData}){
    const url = `${domain}/ai/image-classifier`;
    const response = await fetch(url, {
        method: "POST",
        body:form
    })

    if(response.status >= 300){
        throw 'upload failed';
    }
    const data = await response.json();

    return data;
}