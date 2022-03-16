import axios from 'axios';

const server = 'https://emergency-app-server.herokuapp.com';

export const adminAuth = async (params) => {
    const res = await axios.get(`${server}${params}`);
    return res.data;
};

export const userAuth = async (params) => {
    const res = await axios.get(`${server}${params}`);
    return res.data;
};

export const userAdd = async (params) => {
    const res = await axios.post(`${server}/user/add`, params, { ContentType: 'application/json' });
    return res.data;
};

export const userAll = async () => {
    const res = await axios.get(`${server}/user/all`);
    return res.data;
};

export const totalUser = async () => {
    const res = await axios.get(`${server}/user/totals`);
    return res.data;
};

export const totalEmergency = async () => {
    const res = await axios.get(`${server}/emergency/totals`);
    return res.data;
};

export const getBrgys = async () => {
    const res = await axios.get(`${server}/get/brgys`);
    return res.data;
};

export const getSeries = async () => {
    const res = await axios.get(`${server}/totals/graph`);
    return res.data;
};

export const delUser = async (id) => {
    const res = await axios.put(`${server}/user/${id}/remove`);
    return res.data;
};

export const updUser = async (id, params) => {
    const res = await axios.put(`${server}/user/${id}/update`, params, { ContentType: 'application/json' });
    return res.data;
};
