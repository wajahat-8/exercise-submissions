import axios from "axios";
const baseUrl = '/api/persons'; // relative path to use Vite proxy



const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => {
        return response.data;
    })
}
const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data).catch(error => {
        console.log(error.response.data.error)
        throw error;
    });
}
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)


}
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data)
}
export default {
    getAll,
    create,
    remove,
    update
}