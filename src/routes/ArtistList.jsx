
import { useEffect, useState } from "react"

import api from '../services/api'

import { invokeTransaction, getAsset, updateAsset, deleteAsset } from "../hooks/useFetch";

const ArtistList = () => {
    const [artists, setArtists] = useState([]);

    //POST com creatAsset
    const handleClick = async () => {

        const payloadPost = {
            asset: [
                {
                    "@assetType": "artist",
                    "name": "Vuduu Trio RP",
                    "country": "Brasil - SP - Ribeirão Preto",
                },
            ],
        };

        //post working
        try {
            const response = await invokeTransaction('createAsset', payloadPost);
            const data = response.data;
            setArtists([...artists, data]);

            console.log('post', data)
        } catch (error) {
            console.log('erro ao adicionar dados', error);
        }

    }

    //GET ASSET com readAsset ou search
    const handleClickGetAsset = async () => {

        //getAsset working readAsset, procura e le o artista usando a key, retornando reponse.data
        // key: {
        //     "@assetType": "artist",
        //     "name": "Kendrick Lamar"
        // }
        // search, procura e le o artista tambem, utilizando o query, retornando com reponse.data.result
        // query: {
        //     selector: {
        //         "@assetType": "artist",
        //         "name": "aaa"
        //     }
        // }

        try {
            const response = await getAsset('search', {
                query: {
                    selector: {
                        "@assetType": "artist",
                    }
                }
            });

            const data = response.data.result;

            console.log('getAsset', data)

        } catch (error) {
            console.log('erro ao ler dados', error);
        }

    }

    //UPDATE ASSET /invoke/ com updateAsset
    const handleClickUpdateAsset = async () => {
        const payload = {
            update: {
                "@assetType": "artist",
                "name": "Kendrick Lamar",
                "country": "USA-Brasil",
            }
        }

        try {
            const response = await updateAsset('updateAsset', payload)

            const data = response.data;
            console.log('update', data)

        } catch (error) {
            console.log('erro ao editar dados', error)
        }
    }

    //DELETE ASSET com invoke deleteAsset
    const handleClickDelete = async () => {
        const payload = {
            key: {
                "@assetType": "artist",
                "name": "Alexandre Frota",
            }
        }

        try {
            const response = await deleteAsset('deleteAsset', payload);

            const data = response.data;
            console.log('delete', data)
        } catch (error) {
            console.log('delete', error.message)
        }
    }


    //GET SCHEMA get schema pega o esquema, o search pega o database todo
    const getArtist = async () => {

        const payload = {
            query: {
                selector: {
                    "@assetType": "artist", //name, country
                }
            }
        }

        //acessar dados
        // "@assetType": "artist", //name, country
        //"@assetType": "album", //name, year artists[]
        //"@assetType": "song", // name, album[]
        //"@assetType": "playlist", //name, private, songs[]


        //getSchema working
        try {
            const response = await api.post("/api/query/search", payload);

            const data = response.data.result;


            setArtists(data);

            console.log('getSchema', data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getArtist()

    }, [])

    console.log('artists', artists)

    return (
        <div>
            <h1>
                Artistas
            </h1>
            <button onClick={handleClick}>
                adicionar
            </button>
            <button onClick={handleClickGetAsset}>
                Ler dados da api
            </button>
            <button onClick={handleClickUpdateAsset}>
                Update asset
            </button>
            <button onClick={handleClickDelete}>
                Delete
            </button>
            {
                artists && artists.map((item, index) => (
                    <div key={index}>
                        <h1>{item.name}</h1>
                        <p>{item.country}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ArtistList