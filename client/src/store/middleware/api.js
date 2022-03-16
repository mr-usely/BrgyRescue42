import * as apiActions from '../ApiActions';

const updateUser =
    ({ api }) =>
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        next(action);

        if (action.type === apiActions.UPDATE_USER) {
            const id = action.id;
            const params = action.params;
            const update = await api.updUser(id, params);

            if (update != '') {
                dispatch({ type: apiActions.SET_RESPONSE, response: update });
            }
        }
    };

const deleteUser =
    ({ api }) =>
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        next(action);

        if (action.type === apiActions.DELETE_USER) {
            const id = action.id;
            const del = await api.delUser(id);

            if (del != '') {
                dispatch({ type: apiActions.SET_RESPONSE, response: del });
            }
        }
    };

export default [updateUser, deleteUser];
