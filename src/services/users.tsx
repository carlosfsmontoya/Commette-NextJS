import settings from "./settings";
import { HTTPError } from '@/utils/httpError'

export async function GetUserInfo() {
    const response = await fetch(`${settings.API_DOMAIN}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        const error = new Error('Network response was not ok') as any;
        error.response = response; 
        throw error;
    }

    const data = await response.json();
    return data;
}

export async function ActivateUser(code: any) {

    const response = await fetch(`${ settings.API_DOMAIN }/user/code/${code}`,{
        method: 'PUT',
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

export async function Register(userRegistration: any) {

    const response = await fetch(`${ settings.API_DOMAIN }/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(userRegistration)
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}

export async function LoginUser(userLogin: any) {

    const response = await fetch(`${ settings.API_DOMAIN }/login/custom`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(userLogin)
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}