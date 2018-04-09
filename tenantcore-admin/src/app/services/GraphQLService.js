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
    query = authenticatedGQLQuery;
    /**
     *
     * @param {*} model
     * @param {*} dispatch
     * @param {*} headers
     */
    create (model: T, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise {

    }
    /**
     *
     * @param {*} id
     * @param {*} dispatch
     * @param {*} headers
     */
    read (id: number, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise {

    }
    /**
     *
     * @param {*} model
     * @param {*} id
     * @param {*} dispatch
     * @param {*} headers
     */
    update (model: T, id: number, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise {

    }
    /**
     *
     * @param {*} id
     * @param {*} dispatch
     * @param {*} headers
     */
    delete (id: number, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise {

    }
    /**
     *
     * @param {*} options
     * @param {*} dispatch
     * @param {*} headers
     */
    getAll (options: IGQLPaginationOptions, dispatch: ReduxDispatchFnType, headers: {[key: string]: string}): Promise {

    }
}
