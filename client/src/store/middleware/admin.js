import * as actionTypes from '../dataActions';
import * as adminAction from '../adminActions';
import * as uiAction from '../uiActions';

const adminLogin =
    ({ api }) =>
    ({ dispatch, getState }) =>
    (next) =>
    async (action) => {
        next(action);

        if (action.type === adminAction.ADMIN_LOG) {
            const admin = getState().admin.adminLog;
            const req = await api.adminAuth(`/admin/${admin.email}/${admin.password}/auth`);
            if (req != '') {
                dispatch({ type: adminAction.SET_ADMIN, info: req, success: true });
            }
        }
    };

const adminAddUser =
    ({ api }) =>
    ({ dispatch, getState }) =>
    (next) =>
    async (action) => {
        next(action);
        if (action.type === actionTypes.SEND_VALUES) {
            const vals = getState().user.vals;
            const req = await api.userAdd(vals);
            if (req != '') {
                console.log(req);
                dispatch({ type: actionTypes.LOAD_USER_DATA, userData: req, loading: true });
            }
        }
    };

const loadDashboardData =
    ({ api }) =>
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        next(action);

        if (action.type === actionTypes.LOAD_DATA) {
            try {
                dispatch(uiAction.setLoad(true));

                const totalUser = await api.totalUser();
                const totalEmergency = await api.totalEmergency();
                const loadBrgys = await api.getBrgys();
                const loadSeries = await api.getSeries();
                dispatch({
                    type: actionTypes.LOAD_ALL_DATA,
                    setU: totalUser.countu,
                    setE: totalEmergency.counte,
                    allBrgys: loadBrgys,
                    series: loadSeries
                });
                dispatch(uiAction.setLoad(false));
            } catch (err) {
                console.error(err.message);
            }
        }
    };

// const totalEmerState =
//     ({ api }) =>
//     ({ dispatch }) =>
//     (next) =>
//     async (action) => {
//         next(action);

//         if (action.type === actionTypes.COUNT_TOTAL_EMERGENCY) {
//             const totalEmergency = await api.totalEmergency();
//             dispatch({ type: actionTypes.SET_TOTAL_E, setE: totalEmergency.counte });
//         }
//     };

export default [adminLogin, adminAddUser, loadDashboardData];
