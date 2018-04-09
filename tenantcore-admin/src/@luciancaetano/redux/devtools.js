/**
 * Verifica se a extensão está instalada e retorna sua instância
 */
const getWindowDevTools = (): any => {
    return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
};
/**
 * Implementa o redux dev tools se o ambiente for desenvolvimento e
 * a extensão estive instalada
 */
export const ReduxDevTools = process.env.NODE_ENV !== 'production' ? getWindowDevTools() : () => {};
