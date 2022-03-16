const loadData =
    () =>
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        next(action);

        if (action.type === actionTypes.DATA_LOAD) {
            dispatch()
        }
    };

export default loadData;