export const DATA_LOAD = '@ui/DATA_LOAD';
export const SET_LOADING_ON = '@ui/SET_LOADING_ON';
export const SET_LOADING_OFF = '@ui/SET_LOADING_OFF';

export const setLoad = (isLoading) => ({
    type: isLoading ? SET_LOADING_ON : SET_LOADING_OFF,
    payload: isLoading
});
