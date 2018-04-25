import { graphQLUrl } from '../app.config';

export const graphQLClient = (endpoint: string, headers: {[key: string]: string}, cors: boolean = true) =>
    (query: string) => fetch(endpoint, {
        method: 'POST',
        cache: 'no-cache',
        mode: cors ? 'cors' : 'no-cors',
        body: JSON.stringify({
            query: query.replace(/(\s\n)/g, '')
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        }
    })
        .then(res => res.json())
        .then(json => json.data);

export const authenticatedGQLQuery = graphQLClient(
    process.env.NODE_ENV === 'production' ?
        graphQLUrl.production : graphQLUrl.development,
    {
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
    },
    false
);

