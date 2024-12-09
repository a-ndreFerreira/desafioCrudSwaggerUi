
import { useState, useEffect } from "react"
import { getAsset, invokeTransaction, updateAsset } from "../hooks/useFetch";

import { deleteAsset } from "../hooks/useFetch";

const Playlist = () => {
    const [playlist, setPlaylist] = useState([]);

    //criar playList
    const handleClickCreateAsset = async () => {
        const payload = {
            asset: [
                {
                    "@assetType": "playlist",
                    "name": "My Favorits2",
                    "private": false,
                    "songs": []
                },
            ],
        }

        try {
            const response = await invokeTransaction('createAsset', payload)
            const data = response.data.result;

            setPlaylist(data)
        } catch (error) {
            console.log('erro ao adicionar playlist', error)
        }
    }

    //atualizar Playlist updateAsset
    const handleClickUpdate = async () => {

        const payload = {
            update: {
                "@assetType": "playlist",
                "name": "My Favorits",
                "private": false,
                "songs": []
            }
        }

        try {
            const response = await updateAsset('updateAsset', payload);
            const data = response.data;

            setPlaylist(data);

        } catch (error) {
            console.log('erro ao atualizar dados de playlist', payload);
        }

    }

    //delete, tem que fazer upload primeiro?
    const handleClickDelete = async () => {

        const payload = {
            key: {
                "@assetType": "playlist",
                "name": "As melhores de 2000",
                "songs": null
            }
        }
        //delete
        try {
            const response = await deleteAsset('deleteAsset', payload)
            const data = response.data.result;

            setPlaylist(data);

        } catch (error) {
            console.log('erro ao deletar playlist', error)
        }
    }

    //pega todos os dados existentes
    const getPlaylist = async () => {
        const payload = {
            query: {
                selector: {
                    "@assetType": "playlist"
                }
            }
        }

        try {
            const response = await getAsset('search', payload);

            const data = response.data.result;
            setPlaylist(data);

        } catch (error) {
            console.log('error ao buscar dados', error)
        }
    }

    useEffect(() => {
        getPlaylist();
    }, [])

    return (
        <div>
            <h1>
                Playlist
            </h1>
            <button onClick={handleClickCreateAsset}>
                Criar playlist
            </button>
            <button onClick={handleClickUpdate}>
                Atualizar playlist existente
            </button>
            <button onClick={handleClickDelete}>
                deletar playlist
            </button>
            {
                playlist && playlist.map((item, index) => (
                    <div key={index}>
                        <h1>
                            {item.name}
                        </h1>
                    </div>
                ))
            }
        </div>
    )
}

export default Playlist