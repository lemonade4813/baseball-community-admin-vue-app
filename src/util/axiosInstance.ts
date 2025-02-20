import axios from "axios";

const axiosInstance = axios.create({baseURL : import.meta.env.VUE_APP_BASE_URL});

export default axiosInstance;