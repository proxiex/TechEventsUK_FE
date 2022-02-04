import axios from 'axios';

const baseURL = process.env.REACT_APP_URL || 'http://localhost:9001/api/v1';

const getAllEvents = (data) => axios.get(`${baseURL}/events?q=${data.q}&category=${data.category}&isVirtual=${data.isVirtual}`);
const getOneEvent = (data) => axios.get(`${baseURL}/events/${data.id}`);
const getCategories = (data) => axios.get(`${baseURL}/categories`);

export {
    getAllEvents,
    getOneEvent,
    getCategories
}
