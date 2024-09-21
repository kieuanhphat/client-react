import axios from "../axios"

const handleLoginApi = (email, password) => {
  return axios.post('/api/login', { email, password });
}
const getAllUser = (id) => {
  return axios.get(`/api/all-user?id=${id}`);
}
const createNewUserApi = (data) => {
  return axios.post(`/api/create-user`, data);
}
const deleteUserApi = (idUser) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: idUser,
    }
  });
}
const editUserApi = (data) => {
  return axios.put(`/api/edit-user`, data);
}
export { handleLoginApi, getAllUser, createNewUserApi, deleteUserApi, editUserApi }