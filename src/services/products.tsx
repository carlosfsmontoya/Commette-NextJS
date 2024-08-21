import settings from "./settings";
import { HTTPError } from '@/utils/httpError';

// Función para obtener todas las categorías
export async function GetCategories(): Promise<any[]> {
    const response = await fetch(`${settings.API_DOMAIN}/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        const error = new HTTPError(response);
        throw error;
    }

    const data = await response.json();
    return data;
}

// Función para obtener todas las marcas
export async function GetBrands(): Promise<any[]> {
    const response = await fetch(`${settings.API_DOMAIN}/brands`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        const error = new HTTPError(response);
        throw error;
    }

    const data = await response.json();
    return data;
}
