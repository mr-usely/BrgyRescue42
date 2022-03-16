const pool = require("./db");

// insert log to database
const logs = async (action, device, description) => {
    try {
        const insertLog = await pool.query(
            "INSERT INTO logs (action, device, description) VALUES ($1, $2, $3) RETURNING *",
            [action, device, description]
        );
        console.log(insertLog.rows[0].description);
    } catch (err) {
        console.error(err.message);
    }
};

// admin log Success
const adminLogSuccess = () => logs('admin logged in', 'browser', 'admin success log');

// admin log failed
const adminLogFail = () => logs('admin logged in', 'browser', 'admin failed log');

// app user log Success
const usersLogSuccess = () => logs('logged in', 'app', 'user success log');

// app user log Success
const usersLogFail = () => logs('logged in', 'app', 'user failed log');

// add user success
const addUserSuccess = () => logs('add user', 'browser', 'add user success');

// add user fail
const addUserFail = () => logs('add user', 'browser', 'add user failed');

// get all users success
const getUsersSuccess = () => logs('get all user', 'browser', 'load all users success');

// get all useres fail
const getUsersFail = () => logs('get all user', 'browser', 'load all users failed');

// update user success
const updateUserSuccess = () => logs('update user', 'browser', 'update user success');

// update user fail
const updateUserFail = () => logs('update user', 'browser', 'update user failed');

// delete user success
const deleteUserSuccess = () => logs('delete user', 'browser', 'delete user succes');

// delete user fail
const deleteUserFail = () => logs('delete user', 'browser', 'delete user failed');

// load graph data success
const loadGraphData = () => logs('load graph', 'browser', 'load graph success');

// load graph data fail
const loadGraphDataFail = () => logs('load graph', 'browser', 'load graph fail');


module.exports = {
    adminLogSuccess,
    adminLogFail,
    usersLogSuccess,
    usersLogFail,
    addUserSuccess,
    addUserFail,
    getUsersSuccess,
    getUsersFail,
    updateUserSuccess,
    updateUserFail,
    deleteUserSuccess,
    deleteUserFail,
    loadGraphData,
    loadGraphDataFail
};
