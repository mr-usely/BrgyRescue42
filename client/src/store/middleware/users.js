import { LOAD_USER, LOAD_USER_DATA } from '../dataActions';

const loadUsers =
    ({ api }) =>
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        next(action);

        if (action.type === LOAD_USER) {
            try {
                const res = await api.userAll();
                dispatch({ type: LOAD_USER_DATA, userData: res });
            } catch (err) {
                console.error(err.message);
            }
        }
    };

export default [loadUsers];
