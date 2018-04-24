import { restPost, restGet, restPut, restDelete } from './rest';
import QueryString from 'querystring';

export interface IRestPaginationOptions{
    page: number;
    perPage: number;
    orderBy: string;
    orderDir: number;
    search: string;
}
type ReduxDispatchFnType = (actionType: any) => void;

export function apiCreate (resource: any, model: any, dispatch: ReduxDispatchFnType = null, headers: any = {}): Promise<Response> {
    return new Promise((resolve: Function, reject: Function) => {
        restPost(resource, model, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        //dispatch(LoginActions.invalidSession());
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
export function apiGet (resource: string, id: number, dispatch: ReduxDispatchFnType = null, headers: any = {}): Promise<Response> {
    return new Promise((resolve: Function, reject: Function) => {
        restGet(resource + '/' + id, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        //dispatch(LoginActions.invalidSession());
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
export function apiUpdate (resource: string, model: any, id: number, dispatch: ReduxDispatchFnType = null, headers: any = {}): Promise<Response> {
    return new Promise((resolve: Function, reject: Function) => {
        restPut(resource + '/' + id, model, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        //dispatch(LoginActions.invalidSession());
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
export function apiDelete (resource: string, id: number, dispatch: ReduxDispatchFnType = null, headers: any = {}): Promise<Response> {
    return new Promise((resolve: Function, reject: Function) => {
        restDelete(resource + '/' + id, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        //dispatch(LoginActions.invalidSession());
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
export function apiGetAll (resource: string, options: IRestPaginationOptions, dispatch: ReduxDispatchFnType = null, headers: any = {}): Promise<Response> {
    return new Promise((resolve: Function, reject: Function) => {
        let dataUrl = QueryString.stringify({
            page: options.page,
            perPage: options.perPage,
            orderBy: options.orderBy,
            orderDir: options.orderDir === 1 ? '1' : '-1'
        });

        restGet(resource + '?' + dataUrl, headers)
            .then((response: Response) => {
                if (response.status === 401) {
                    if (dispatch) {
                        //dispatch(LoginActions.invalidSession());
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
    create: (model: any, dispatch: ReduxDispatchFnType, headers: any) => Promise;
    read: (id: number, dispatch: ReduxDispatchFnType, headers: any) => Promise;
    update: (model: any, id: number, dispatch: ReduxDispatchFnType, headers: any) => Promise;
    delete: (id: number, dispatch: ReduxDispatchFnType, headers: any) => Promise;
    getAll: (options: IRestPaginationOptions, dispatch: ReduxDispatchFnType, headers: any) => Promise;
}
/**
 * Create a rest service for given resource name
 */
export function createServiceFor (ResourceName: string): IBaseRestService {
    return {
        ResourceName,
        create: (model: any, dispatch: ReduxDispatchFnType, headers: any): Promise => apiCreate(ResourceName, model, dispatch, headers),
        read: (id: number, dispatch: ReduxDispatchFnType, headers: any): Promise => apiGet(ResourceName, id, dispatch, headers),
        update: (model: any, id: number, dispatch: ReduxDispatchFnType, headers: any): Promise => apiUpdate(ResourceName, model, id, dispatch, headers),
        delete: (id: number, dispatch: ReduxDispatchFnType, headers: any): Promise => apiDelete(ResourceName, id, dispatch, headers),
        getAll: (options: IRestPaginationOptions, dispatch: ReduxDispatchFnType, headers: any): Promise => apiGetAll(ResourceName, options, dispatch, headers)
    };
}
