import axios from 'axios';
import storageLocal from './storageLocal';

export const API_URL = 'http://localhost:5000/api/'
export const API_URL_STATIC = 'http://localhost:5000/'

export const axiosApi = axios.create({
   withCredentials: true,
   baseURL: API_URL
});

axiosApi.interceptors.request.use((config) => {
   const accessToken = storageLocal.get('token')

   config.headers.Authorization = `Bearer ${accessToken}`

   return config
})

axiosApi.interceptors.response.use((config) => {
   return config
}, async (err) => {
   const originalRequest = err.config
   if (err.response.status === 401) {
      try {
         const result = await axios.get(`${API_URL}/refresh`, {
            withCredentials: true
         })

         storageLocal.set('token', result?.data?.accessToken)

         return axiosApi.request(originalRequest)
      } catch (e) {
         console.log('ERROR 401');
      }
   }
})

export default axiosApi