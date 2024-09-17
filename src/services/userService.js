import axios from "../axios"

const handleLoginApi = (email, password) => {
  return axios.post('/api/login', { email, password });
}
const getAllUser = (id) => {
  return axios.get(`/api/all-user?id=${id}`);
}
export { handleLoginApi, getAllUser }