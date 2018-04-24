import immutable from 'seamless-immutable';

export interface ICrudReduxactions{
    create: (data: any, callback: (result: boolean) => void) => void;
    read: (id: number, callback: (result: boolean) => void) => void;
    update: (id: number, data: any, callback: (result: boolean) => void) => void;
    delete: (id: number, callback: (result: boolean) => void) => void;
    getAll: (callback: (result: boolean) => void) => void;
    updateConfig: (page: number, perPage: number, orderBy: string, orderDir: number, search: string) => void
}

/**
 * Create a reducer for an resource
 * @param {*} customReducer
 */
export function createCrudReducer (resourceName: string): any {
    if (!resourceName || typeof resourceName !== 'string') {
        throw new Error("In function createCrudReducerFor param resourceName must be a string.");
        return;
    }
    resourceName = resourceName.toUpperCase();
    const initialState = immutable({
        list: {
            isLoading: false,
            isError: false,
            error: null,
            data: {},
            datatableConfig: {
                page: 0,
                perPage: 10,
                orderBy: 'id',
                orderDir: 1,
                search: ''
            },
            pagination: {
                total: 0,
                perPage: "0",
                currentPage: 0,
                lastPage: 0,
                from: 0,
                to: 0
            }
        },
        active: {
            isLoading: false,
            isError: false,
            error: null,
            data: {}
        },
        deleted: {
            isLoading: false,
            isError: false,
            error: null,
            data: {}
        }
    });

    return (state: any = initialState, action: {type: string, payload: any} = {}): any => {
        switch (action.type) {
            case `${resourceName}_CREATE_REQUEST` :
                return state
                    .setIn(['active', 'isLoading'], true)
                    .setIn(['active', 'isError'], false)
                    .setIn(['active', 'error'], null);

            case `${resourceName}_CREATE_ERROR`:
                return state
                    .setIn(['active', 'isLoading'], false)
                    .setIn(['active', 'isError'], true)
                    .setIn(['active', 'error'], action.payload);

            case `${resourceName}_CREATE_SUCCESS`:
                return state
                    .setIn(['active', 'isLoading'], false)
                    .setIn(['active', 'isError'], false)
                    .setIn(['active', 'error'], null)
                    .setIn(['active', 'data'], action.payload.data);

            case `${resourceName}_READ_REQUEST`:
                return state
                    .setIn(['active', 'isLoading'], true);

            case `${resourceName}_READ_ERROR`:
                return state
                    .setIn(['active', 'isLoading'], false)
                    .setIn(['active', 'isError'], true)
                    .setIn(['active', 'error'], action.payload);

            case `${resourceName}_READ_SUCCESS`:
                return state
                    .setIn(['active', 'isLoading'], false)
                    .setIn(['active', 'isError'], false)
                    .setIn(['active', 'error'], null)
                    .setIn(['active', 'data'], action.payload);

            case `${resourceName}_UPDATE_REQUEST`:
                return state
                    .setIn(['active', 'isLoading'], true)
                    .setIn(['active', 'isError'], false)
                    .setIn(['active', 'error'], null);

            case `${resourceName}_UPDATE_ERROR`:
                return state
                    .setIn(['active', 'isLoading'], false)
                    .setIn(['active', 'isError'], true)
                    .setIn(['active', 'error'], action.payload);

            case `${resourceName}_UPDATE_SUCCESS`:
                return state
                    .setIn(['active', 'isLoading'], false)
                    .setIn(['active', 'isError'], false)
                    .setIn(['active', 'error'], null)
                    .setIn(['active', 'data'], action.payload.data);

            case `${resourceName}_DELETE_REQUEST`:
                return state
                    .setIn(['deleted', 'isLoading'], true);

            case `${resourceName}_DELETE_ERROR`:
                return state
                    .setIn(['deleted', 'isLoading'], false)
                    .setIn(['deleted', 'isError'], true)
                    .setIn(['deleted', 'error'], action.payload);

            case `${resourceName}_DELETE_SUCCESS`:
                return state
                    .setIn(['deleted', 'isLoading'], false)
                    .setIn(['deleted', 'isError'], false)
                    .setIn(['deleted', 'error'], null)
                    .setIn(['deleted', 'data'], action.payload.data);

            case `${resourceName}_READ_ALL_REQUEST`:
                return state
                    .setIn(['list', 'isLoading'], true)
                    .setIn(['list', 'isError'], false)
                    .setIn(['list', 'error'], null);

            case `${resourceName}_READ_ALL_ERROR`:
                return state
                    .setIn(['list', 'isLoading'], false)
                    .setIn(['list', 'isError'], true)
                    .setIn(['list', 'error'], action.payload);

            case `${resourceName}_READ_ALL_SUCCESS`:
                return state
                    .setIn(['list', 'isLoading'], false)
                    .setIn(['list', 'isError'], false)
                    .setIn(['list', 'error'], null)
                    .setIn(['list', 'data'], action.payload.data)
                    .setIn(['list', 'pagination'], action.payload.pagination);
            case `${resourceName}_UPDATE_DATATABLE_CONFIG`:
                return state.setIn(['list', 'datatableConfig'], action.payload);
            default:
                return state;
        }
    };
}

/**
 * Create Actions
 */
export function createCrudActions (service: any): ICrudReduxactions {
    let RES = service.ResourceName.toUpperCase();

    let actions:ICrudReduxactions = {
        create: (data: any, callback: (result: boolean) => void = (r: boolean) => {}): void => {
            return (dispatch: Function): any => {
                dispatch({
                    type: `${RES}_CREATE_REQUEST`
                });
                service.create(data, dispatch).then((res: Response) => {
                    dispatch({
                        type: `${RES}_CREATE_SUCCESS`,
                        payload: res
                    });
                    callback(true);
                }).catch((err: any) => {
                    dispatch({
                        type: `${RES}_CREATE_ERROR`,
                        payload: err
                    });
                    callback(false);
                });
            };
        },

        /**
     * Read
     */

        read: (id: number, callback: (result: boolean) => void = (r: boolean) => {}): void => {
            return (dispatch: Function, getState: Function): any => {
                dispatch({
                    type: `${RES}_READ_REQUEST`
                });
                service.get(id, dispatch).then((res: Response) => {
                    dispatch({
                        type: `${RES}_READ_SUCCESS`,
                        payload: res
                    });
                    callback(true);
                }).catch((err: any) => {
                    dispatch({
                        type: `${RES}_READ_ERROR`,
                        payload: err
                    });
                    callback(false);
                });
            };
        },

        /**
         * Update
         */
        update: (id: number, data: any, callback: (result: boolean) => void = (r: boolean) => {}): void => {
            return (dispatch: Function): any => {
                dispatch({
                    type: `${RES}_UPDATE_REQUEST`
                });
                service.update(data, id, dispatch).then((res: Response) => {
                    dispatch({
                        type: `${RES}_UPDATE_SUCCESS`,
                        payload: res
                    });
                    callback(true);
                }).catch((err: any) => {
                    dispatch({
                        type: `${RES}_UPDATE_ERROR`,
                        payload: err
                    });
                    callback(false);
                });
            };
        },

        /**
     * Delete
     */

        delete: (id: number, callback: (result: boolean) => void = (r: boolean) => {}): void => {
            return (dispatch: Function): any => {
                dispatch({
                    type: `${RES}_DELETE_REQUEST`
                });
                service.delete(id, dispatch).then((res: Response) => {
                    dispatch({
                        type: `${RES}_DELETE_SUCCESS`,
                        payload: res
                    });
                    dispatch(actions.getAll());
                    callback(true);
                }).catch((err: any) => {
                    console.log(err);
                    dispatch({
                        type: `${RES}_DELETE_ERROR`,
                        payload: err
                    });
                    dispatch(actions.getAll());
                    callback(false);
                });
            };
        },

        /**
     * ReadAll
     */

        getAll: (callback: (result: boolean) => void = (r: boolean) => {}): void => {
            return (dispatch: Function, getState: Function): any => {
                dispatch({
                    type: `${RES}_READ_ALL_REQUEST`
                });
                let config = getState();
                config = config[service.ResourceName.toLowerCase()];
                config = config.list.datatableConfig;

                service.getAll({
                    page: config.page,
                    perPage: config.perPage,
                    orderBy: config.orderBy,
                    orderDir: config.orderDir,
                    search: config.search
                }, dispatch).then((res: Response) => {
                    dispatch({
                        type: `${RES}_READ_ALL_SUCCESS`,
                        payload: res
                    });
                    callback(true);
                }).catch((err: any) => {
                    dispatch({
                        type: `${RES}_READ_ALL_ERROR`,
                        payload: err
                    });
                    callback(false);
                });
            };
        },

        updateConfig: (page: number = null, perPage: number = null, orderBy: string = null, orderDir: number = null, search: string = null): void => {
            return (dispatch: Function, getState: Function): any => {
                let conf = {};
                let oldConf = getState();
                oldConf = oldConf[service.ResourceName.toLowerCase()];
                oldConf = oldConf.list.datatableConfig;
                if (page) {
                    conf.page = page;
                } else {
                    conf.page = oldConf.page;
                }
                if (perPage) {
                    conf.perPage = perPage;
                } else {
                    conf.perPage = oldConf.perPage;
                }
                if (('' + orderBy).length > 0 && orderBy !== null) {
                    conf.orderBy = orderBy;
                } else {
                    conf.orderBy = oldConf.orderBy;
                }
                if (orderDir) {
                    conf.orderDir = orderDir;
                } else {
                    conf.orderDir = oldConf.orderDir;
                }
                if (search !== null || search === '') {
                    conf.search = search;
                } else {
                    conf.search = oldConf.search;
                }
                dispatch({
                    type: `${RES}_UPDATE_DATATABLE_CONFIG`,
                    payload: conf
                });
                dispatch(actions.getAll());
            };
        }
    };
    return actions;
}
