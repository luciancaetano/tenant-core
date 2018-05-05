
import { restApiUrl } from '../app.config';

const useCors = true;
/**
 *
 * @param {*} route
 */
export const baseApiUrl = (route: string): string => {
    if (process.env.NODE_ENV === 'production') {
        return `${restApiUrl.production}/${route}`;
    }
    return `${restApiUrl.development}/${route}`;
};

/**
 * Perform a GET with JWT
 * @param {*} endPoint
 * @param {*} headers
 */
export function restGet (endPoint: string, headers: any = {}): Promise<Response> {
    return fetch(baseApiUrl(endPoint), {
        method: 'GET',
        cache: 'no-cache',
        mode: useCors ? 'cors' : 'no-cors',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ... headers,
        },
    });
}
/**
 * Perform a POST with JWT
 * @param {*String} endPoint
 * @param {*Object | String} body
 * @param {*Object} headers
 */
export function restPost (endPoint: string, body: any, headers: any = {}): Promise<Response> {
    return fetch(baseApiUrl(endPoint), {
        method: 'POST',
        cache: 'no-cache',
        mode: useCors ? 'cors' : 'no-cors',
        body: typeof body === 'string' ? body : JSON.stringify(body),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ... headers,
        },
    });
}
/**
 * Perform a PUT with JWT
 * @param {*String} endPoint
 * @param {*Object | String} body
 * @param {*Object} headers
 */
export function restPut (endPoint: string, body: any, headers: any = {}): Promise<Response> {
    return fetch(baseApiUrl(endPoint), {
        method: 'PUT',
        cache: 'no-cache',
        mode: useCors ? 'cors' : 'no-cors',
        body: typeof body === 'string' ? body : JSON.stringify(body),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ... headers,
        },
    });
}
/**
 * Perform a DELETE with JWT
 * @param {*String} endPoint
 * @param {*Object} headers
 */
export function restDelete (endPoint: string, headers: any = {}): Promise<Response> {
    return fetch(baseApiUrl(endPoint), {
        method: 'DELETE',
        cache: 'no-cache',
        mode: useCors ? 'cors' : 'no-cors',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ... headers,
        },
    });
}
