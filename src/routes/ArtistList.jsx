
import { useEffect, useState } from "react"

import { postArtist, getAllArtists, updateArtist, readArtist, deleteArtist } from "../hooks/useArtist";

const ArtistList = () => {
    const [artists, setArtists] = useState([]);
    const [readAsset, setReadAsset] = useState([]);


    //POST com creatAsset refatorado no hook
    const handleClick = async () => {
        //entrada de dados dos forms/inputs
        const payload = {
            asset: [
                {
                    "@assetType": "artist",
                    "name": "Les Claypool",
                    "country": "USA",
                },
            ],
        };

        try {
            const data = await postArtist(payload);

            if (data) setArtists(data);

            getArtist();


        } catch (error) {
            console.log('Erro ao adicionar artista:', error.message);
        }

    }


    //READ ASSET refatorado com hook
    const handleClickGetAsset = async (item) => {

        //esse key, vai ter que ser dinamico
        const key = {
            key: {
                "@assetType": "artist",
                "name": item.name
            }
        }

        try {
            const data = await readArtist(key);

            if (data) setReadAsset([data]);

        } catch (error) {
            console.log('erro ao ler dados', error);
        }

    }

    //UPDATE ASSET /invoke/ com updateAsset refatorado com o hook
    const handleClickUpdateAsset = async (item) => {

        //entrada de dados do form/inputs
        const payload = {
            update: {
                "@assetType": "artist",
                "name": item.name,
                "country": "BRAZIL ZIL",
            }
        }

        try {
            await updateArtist(payload);
            getArtist()

        } catch (error) {
            console.log('erro ao editar dados', error)
        }
    }

    //DELETE ASSET com invoke deleteAsset
    const handleClickDelete = async (item) => {

        const payload = {
            key: {
                "@assetType": "artist",
                "name": item.name,
            }
        }

        // pega as propriedades keys para add no album
        // const keyAsset = item.map((artist) => ({
        //     "@assetType": "artist",
        //     "@key": artist["@key"]
        // }))[0]


        try {
            await deleteArtist(payload);
            console.log('artista deletado');
            getArtist();
        } catch (error) {
            console.log('delete', error.message)
        }
    }

    //GET all SCHEMA o search pega o database todo refatorado com hook
    const getArtist = async () => {

        //entrada de dados do form/input
        const payload = {
            query: {
                selector: {
                    "@assetType": "artist",
                }
            }
        }

        try {
            const data = await getAllArtists(payload);

            if (data) setArtists(data);

        } catch (error) {
            console.log('Erro ao buscar artistas:', error.message);
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
            {
                readAsset && readAsset.map((item, index) => (
                    <div key={index}>
                        <h3>
                            Read Asset
                        </h3>
                        <h2>
                            Artista: {item.name}
                        </h2>
                        <p>
                            Naturalidade: {item.country}
                        </p>
                        <button onClick={() => handleClickUpdateAsset(item)}>
                            Editar
                        </button>
                        <button onClick={() => handleClickDelete(item)}>
                            Excluir
                        </button>
                        <p>
                            --------------------------
                        </p>
                    </div>
                ))
            }
            <button onClick={handleClick}>
                adicionar
            </button>

            {
                artists && artists.map((item, index) => (
                    <div key={index}>
                        <h1 onDoubleClick={() => handleClickGetAsset(item)}>
                            {item.name}
                        </h1>
                        <p>
                            {item.country}
                        </p>
                    </div>
                ))
            }
        </div >
    )
}

export default ArtistList