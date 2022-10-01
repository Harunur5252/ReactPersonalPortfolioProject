import axios from "axios";

 export const axiosPrivateInstance = (token) => axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization: `Bearer ${token}`,
    }
 });

 export const axiosPublicInstance =  axios.create({
    baseURL: 'http://localhost:1337/api',
 });

