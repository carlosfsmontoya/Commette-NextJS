export function EvaluateResponse(response: { status: number; }) {

    if( response.status === 403 )
        return '/activate';

    if( response.status === 401 )
        return '/login';

    if( response.status === 404 )
        return '/404';

    return "";

}