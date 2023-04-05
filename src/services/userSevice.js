import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-user?id=${id}`);
}

const createNewUser = (data) =>{
    return axios.post(`/api/create-new-user`,data);
}

const deleteUser = (id) => {
    return axios.delete(`/api/delete-user`, {data : {id:id}});
}

const updateUser = (data) => {
    return axios.put(`/api/edit-user`, data)
}
export { handleLoginApi ,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
};