import settings from "./settings";
import { HTTPError } from '@/utils/httpError'

export async function GetMessage() {

    const response = await fetch(`${ settings.CHAT_DOMAIN }/api/hello`,{
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