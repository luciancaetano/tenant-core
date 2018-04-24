import { authenticatedGQLQuery } from './gql';

export interface IGQLPaginationOptions{
    page: number;
    perPage: number;
    orderBy: string;
    orderDir: number;
    search: string;
}

type ReduxDispatchFnType = (actionType: any) => void;

/**
 * Basic GraphQL C.R.U.D Service class
 */
export class GraphQLService<T> {
    public query = authenticatedGQLQuery;
    /**
     *
     * @param {*} model
     * @param {*} dispatch
     * @param {*} headers
     */
    public create (model: T, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise<any> {
        return new Promise(resolve => {});
    }
    /**
     *
     * @param {*} id
     * @param {*} dispatch
     * @param {*} headers
     */
    public read (id: number, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise<any> {
        return new Promise(resolve => {});
    }
    /**
     *
     * @param {*} model
     * @param {*} id
     * @param {*} dispatch
     * @param {*} headers
     */
    public update (model: T, id: number, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise<any> {
        return new Promise(resolve => {});
    }
    /**
     *
     * @param {*} id
     * @param {*} dispatch
     * @param {*} headers
     */
    public delete (id: number, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise<any> {
        return new Promise(resolve => {});
    }
    /**
     *
     * @param {*} options
     * @param {*} dispatch
     * @param {*} headers
     */
    public getAll (options: IGQLPaginationOptions, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise<any> {
        return new Promise(resolve => {});
    }
}
