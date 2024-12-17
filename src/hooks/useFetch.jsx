
import api from "../services/api";

//POST ASSET
export const invokeTransaction = async (txName, payload) => {
    try {
        const response = await api.post(`/api/invoke/${txName}`, payload);

        return response;

    } catch (error) {
        console.log('erro ao postar dados', error)
    }

}

//GET ASSET method get no axios nao aceita o objeto de payload, por isso feito com post
export const getAsset = async (transaction, payload) => {
    try {
        const response = await api.post(`/api/query/${transaction}`, payload)

        return response;

    } catch (error) {
        console.log('erro ao pegar/procurar dados', error)
    }

}

//UPDATE ASSET
export const updateAsset = async (transaction, payload) => {
    try {
        const response = await api.put(`/api/invoke/${transaction}`, payload);

        return response;

    } catch (error) {
        console.log('erro ao editar dados', error)
    }
}

//DELETE ASSET 
export const deleteAsset = async (transaction, payload) => {
    try {
        const response = await api.delete(`/api/invoke/${transaction}`, { data: payload });

        console.log(response)

        return response;

    } catch (error) {
        console.log('delete', error);
    }
}
