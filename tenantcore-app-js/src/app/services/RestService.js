import { restPost, restGet, restPut, restDelete } from './rest';
import QueryString from 'querystring';


export function apiCreate (resource: any, model: any, dispatch: Function = null, headers: any = {}): Promise<Response> {
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
export function apiGet (resource: string, id: number, dispatch: Function = null, headers: any = {}): Promise<Response> {
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
export function apiUpdate (resource: string, model: any, id: number, dispatch: Function = null, headers: any = {}): Promise<Response> {
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
export function apiDelete (resource: string, id: number, dispatch: Function = null, headers: any = {}): Promise<Response> {
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
export function apiGetAll (resource: string, { page, perPage, orderBy, orderDir, search }: any, dispatch: Function = null, headers: any = {}): Promise<Response> {
    return new Promise((resolve: Function, reject: Function) => {
        let dataUrl = QueryString.stringify({
            page: page,
            perPage: perPage,
            orderBy: orderBy,
            orderDir: orderDir === 1 ? '1' : '-1'
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
    ResourceName: string,
    create: Function,
    read: Function,
    update: Function,
    delete: Function,
    getAll: Function
}

export function createServiceFor (ResourceName: string): IBaseRestService {
    return {
        ResourceName,
        create: (model: any, dispatch: Function, headers: any): Promise => apiCreate(ResourceName, model, dispatch, headers),
        read: (id: number, dispatch: Function, headers: any): Promise => apiGet(ResourceName, id, dispatch, headers),
        update: (model: any, id: number, dispatch: Function, headers: any): Promise => apiUpdate(ResourceName, model, id, dispatch, headers),
        delete: (id: number, dispatch: Function, headers: any): Promise => apiDelete(ResourceName, id, dispatch, headers),
        getAll: ({ page, perPage, orderBy, orderDir, search }: any, dispatch: Function, headers: any): Promise => apiGetAll(ResourceName, { page, perPage, orderBy, orderDir, search }, dispatch, headers)
    };
}
