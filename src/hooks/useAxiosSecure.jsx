import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../AuthPovider/AuthPovider";

const axiosSecure = axios.create({
    baseURL: 'https://houzez-server.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {  signOutUser } = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
   
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
 
        return Promise.reject(error);
    });


   
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
       
        if (status === 401 || status === 403) {
            await  signOutUser();
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;