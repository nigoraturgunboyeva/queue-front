import api from './api';

const Service = {
    async getCategory(){
        const response = await api.get('/catalog/get');
        return response.data
    },
    async getCards(){
        const response = await api.get('/card/get-all');
        return response.data
    },
}
export default Service;