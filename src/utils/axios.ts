import axios from 'axios';

export const API_URL = 'http://localhost:5000/api/'
export const API_URL_STATIC = 'http://localhost:5000/'

export const axiosApi = axios.create({
   withCredentials: true,
   baseURL: API_URL
});

axiosApi.interceptors.request.use(async (config) => {
   //@ts-ignore
   const accessToken = localStorage?.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;

   config.headers.Authorization = `Bearer ${accessToken}`

   return config
})

axiosApi.interceptors.response.use((config) => {
   return config
}, async (err) => {

   const originalRequest = err.config

   // console.log('err!!!!!!!!!!!!!!!!!!!!!!!!', err.request.responseURL !== 'http://localhost:5000/api/refresh');

   if (err.response.status === 401 && err.request.responseURL !== 'http://localhost:5000/api/refresh') {

      try {
         const result = await axios.get(`${API_URL}/refresh`, {
            withCredentials: true
         })

         localStorage.setItem('token', JSON.stringify(result?.data?.accessToken));

         return axiosApi.request(originalRequest)
      }
      catch (e) {
         console.log('ERROR 401');
      }
   }
})

export default axiosApi