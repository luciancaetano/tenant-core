import QueryString from 'querystring';
import { restDelete, restGet, restPost, restPut } from './rest';

export interface IRestPaginationOptions{
    page: number;
    perPage: number;
    orderBy: string;
    orderDir: number;
    search: string;
}
type ReduxDispatchFnType = (actionType: any) => void;

export function apiCreate (resource: any, model: any, dispatch: any = null, headers: any = {}): Promise<Response> {
    return new Promise((resolve: (res: any)=>any, reject: (res: any)=>any) => {
        restPost(resource, model, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        // dispatch(LoginActions.invalidSession());
                    }
                    response.json().then((data: any): void => reject(data));
                } else if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    response.json().then((data: any): void => reject(data));
                    return;
                }
                response
                    .json()
                    .then((data: any): void => resolve(data));
            })
            .catch((err: any): void => reject(err));
    });
}
/**
 * Load an Entity
 * @param {*Number} id
 * @param {*Object} headers
 */
export function apiGet (resource: string, id: number, dispatch: ReduxDispatchFnType, headers: any = {}): Promise<Response> {
    return new Promise((resolve: (res: any)=>any, reject: (res: any)=>any) => {
        restGet(`${resource}\${id}`, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        // dispatch(LoginActions.invalidSession());
                    }
                    response.json().then((data: any): void => reject(data));
                } else if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    response.json().then((data: any): void => reject(data));
                    return;
                }
                response
                    .json()
                    .then((res: any): void => resolve(res.data));
            })
            .catch((err: any): any => {
                reject(err);
            });
    });
}
/**
 * Update a Entity
 * @param {*Object} model
 * @param {*Number} id
 * @param {*Object} headers
 */
export function apiUpdate (resource: string, model: any, id: number, dispatch: ReduxDispatchFnType, headers: any = {}): Promise<Response> {
    return new Promise((resolve: (res: any)=>any, reject: (res: any)=>any) => {
        restPut(`${resource}\${id}`, model, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        // dispatch(LoginActions.invalidSession());
                    }
                    response.json().then((data: any): void => reject(data));
                } else if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    response.json().then((data: any): void => reject(data));
                    return;
                }

                response.json().then((data: any): void => resolve(data));
            })
            .catch((err: any): void => reject(err));
    });
}
/**
 * Delete a Entity
 * @param {*Number} id
 * @param {*Object} headers
 */
export function apiDelete (resource: string, id: number, dispatch: ReduxDispatchFnType, headers: any = {}): Promise<Response> {
    return new Promise((resolve: (res: any)=>any, reject: (res: any)=>any) => {
        restDelete(`${resource}\${id}`, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        // dispatch(LoginActions.invalidSession());
                    }
                    response.json().then((data: any): void => reject(data));
                } else if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    response.json().then((data: any): void => reject(data));
                    return;
                }
                response
                    .json()
                    .then((data: any): void => resolve(data));
            })
            .catch((err: any): void => reject(err));
    });
}
/**
 *
 * @param {*Number} page
 * @param {*Number} perPage
 * @param {*String} orderBy
 * @param {*Number} orderDir
 * @param {*String} search
 * @param {*Object} headers
 * @return interface IApiResponsePagination{
 *  total: number;
 *  perPage: number;
 *  currentPage: number;
 *  lastPage:number;
 *  from: number;
 *  to:number;
 * }
 */
export function apiGetAll (resource: string, options: IRestPaginationOptions, dispatch: ReduxDispatchFnType, headers: any = {}): Promise<Response> {
    return new Promise((resolve: (res: any)=>any, reject: (res: any)=>any) => {
        const dataUrl = QueryString.stringify({
            page: options.page,
            perPage: options.perPage,
            orderBy: options.orderBy,
            orderDir: options.orderDir === 1 ? '1' : '-1',
        });

        restGet(`${resource}?${dataUrl}`, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        // dispatch(LoginActions.invalidSession());
                    }
                    response.json().then((data: any): void => reject(data));
                } else if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    response.json().then((data: any): void => reject(data));
                    return;
                }
                if (!response.bodyUsed) {
                    response
                        .json()
                        .then((data: any): void => resolve(data));
                }
            })
            .catch((err: any): void => reject(err));
    });
}

export interface IBaseRestService{
    ResourceName: string;
    create: (model: any, dispatch: ReduxDispatchFnType, headers: any) => Promise<any>;
    read: (id: number, dispatch: ReduxDispatchFnType, headers: any) => Promise<any>;
    update: (model: any, id: number, dispatch: ReduxDispatchFnType, headers: any) => Promise<any>;
    delete: (id: number, dispatch: ReduxDispatchFnType, headers: any) => Promise<any>;
    getAll: (options: IRestPaginationOptions, dispatch: ReduxDispatchFnType, headers: any) => Promise<any>;
}
/**
 * Create a rest service for given resource name
 */
export function createServiceFor (ResourceName: string): IBaseRestService {
    return {
        ResourceName,
        create: (model: any, dispatch: ReduxDispatchFnType, headers: any): Promise<any> => apiCreate(ResourceName, model, dispatch, headers),
        read: (id: number, dispatch: ReduxDispatchFnType, headers: any): Promise<any> => apiGet(ResourceName, id, dispatch, headers),
        update: (model: any, id: number, dispatch: ReduxDispatchFnType, headers: any): Promise<any> => apiUpdate(ResourceName, model, id, dispatch, headers),
        delete: (id: number, dispatch: ReduxDispatchFnType, headers: any): Promise<any> => apiDelete(ResourceName, id, dispatch, headers),
        getAll: (options: IRestPaginationOptions, dispatch: ReduxDispatchFnType, headers: any): Promise<any> => apiGetAll(ResourceName, options, dispatch, headers),
    };
}
