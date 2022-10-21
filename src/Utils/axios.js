import axios from "axios";

//  const isProduction = import.meta.env.PROD

 export const axiosPrivateInstance = (token) => axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization: `Bearer ${token}`,
    }
 });

 export const axiosPublicInstance =  axios.create({
    baseURL: 'http://localhost:1337/api'
 });
 

