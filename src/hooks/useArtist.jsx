
import { invokeTransaction, getAsset, updateAsset, deleteAsset } from "./useFetch";

//importante a hierarquia
//acessar/deletar dados
// "@assetType": "artist", //name, country
//"@assetType": "album", //name, year artists["@keys"]
//"@assetType": "song", // name, album["@keys"]
//"@assetType": "playlist", //name, private, songs["@keys"]

//post asset artists
export const postArtist = async (payload) => {
    try {
        const response = await invokeTransaction('createAsset', payload);

        const data = response?.data;

        return data;

    } catch (error) {
        console.log('erro ao adicionar artista', error)
    }
}

//get all asset artists
export const getAllArtists = async (payload) => {
    try {
        const response = await getAsset('search', payload)

        const data = response?.data.result;

        return data;

    } catch (error) {
        console.log('erro ao procurar todos os artistas', error)
    }

}

//read asset artist
export const readArtist = async (key) => {
    try {
        const response = await getAsset('readAsset', key);

        const data = response?.data;

        return data;

    } catch (error) {
        console.log('erro ao ler o artista', error)
    }

}

//update asset artist
export const updateArtist = async (payload) => {
    try {
        const response = await updateAsset('updateAsset', payload);

        const data = response?.data.result;

        return data;

    } catch (error) {
        console.log('erro ao editar artista', error)
    }

}

//delete asset artist
export const deleteArtist = async (key) => {
    try {
        const response = await deleteAsset('deleteAsset', key);

        const data = response?.data;

        return data;

    } catch (error) {
        console.log('erro ao deletar artista', error)
    }
}



