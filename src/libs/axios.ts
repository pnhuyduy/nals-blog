import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_BACKEND_URL

const axiosIns = axios.create({
  baseURL,
})

export default axiosIns
