import settings from "./settings";
import { HTTPError } from '@/utils/httpError';
import {GetUserInfo} from "./users";

interface Product {
    id_brand: number;
    id_category: number;
    product_name: string;
    product_image?: string;
    product_description?: string;
    id_seller: number;
    price: number;
    stock: number;
}
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



export async function CreateProduct(product: Product): Promise<any> {
    const response = await fetch(`${settings.API_DOMAIN}/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        const error = new HTTPError(response);
        throw error;
    }

    const data = await response.json();
    return data;
}

// Función para obtener todos los productos
export async function GetProducts(): Promise<any[]> {
    const response = await fetch(`${settings.API_DOMAIN}/products`, {
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

export async function GetProductsByUserId(): Promise<any[]> {
    try {
        // Obtener el user_id desde GetUserInfo
        const userInfo = await GetUserInfo();
        const user_id = userInfo.id_user;

        // Realizar la solicitud a la API con el user_id
        const response = await fetch(`${settings.API_DOMAIN}/products/user/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
           
            return [];
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        // En caso de cualquier otro error, regresar un array vacío
        console.error('Error fetching products:', error);
        return [];
    }
}


export async function GetProductById(productId: string): Promise<any> {
    const response = await fetch(`${settings.API_DOMAIN}/products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    const data = await response.json();
    return data;
}

export async function UpdateProduct(product: any, productID: string): Promise<void> {
    // Agregar el productID al body con la clave id_product
    const updatedProduct = {
        ...product,
        id_product: productID,
    };

    const response = await fetch(`${settings.API_DOMAIN}/product/${productID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
        throw new Error('Failed to update product');
    }
}

export async function DeleteProduct(productId: string): Promise<void> {
    const response = await fetch(`${settings.API_DOMAIN}/product/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
}
