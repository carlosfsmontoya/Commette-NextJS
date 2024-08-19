import settings from "./settings";
import { HTTPError } from '@/utils/HttpError'

export async function GetMessage() {

    const response = await fetch(`${ settings.chatDomain }/api/hello`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}