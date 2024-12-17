
import { useEffect, useState } from "react";


import { postArtist, getAllArtists, readArtist } from "../hooks/useArtist";

const AlbumList = () => {
    //array para os albuns na rota albuns
    const [album, setAlbum] = useState([]);

    //leitura de dados para editar e excuir
    const [readAlbum, setReadAlbum] = useState([]);

    const [artists, setArtists] = useState([]);

    const [selectedArtist, setSelectedArtist] = useState(null);

    //ler artistas para atrelar em album
    const getArtists = async () => {

        const payload = {
            query: {
                selector: {
                    "@assetType": "artist"
                }
            }
        }

        try {
            const data = await getAllArtists(payload)

            if (data) setArtists(data);
        } catch (error) {
            console.log('erro ao ler artista para as keys', error);
        }
    }

    //select value dinamic
    const handleChange = (e) => {
        const selected = artists.find((item) => item.name === e.target.value);
        setSelectedArtist(selected);

    }

    //post album
    const handlePost = async () => {

        if (!selectedArtist) {
            alert('Selecione um artista para o album.');
            return;
        }

        //inputs de dados do form
        const payload = {
            asset: [
                {
                    "@assetType": "album",
                    "name": "TESTANDO ",
                    "year": "2024",
                    "artist": {
                        "@assetType": "artist",
                        "name": selectedArtist.name,
                    },
                },
            ],
        };

        try {
            const data = await postArtist(payload);

            if (data) setAlbum(data);

            console.log('post album', data);

            getAlbum();

        } catch (error) {
            console.log('erro ao adicionar album', error);
        }

    };

    //read album
    const readAssetAlbum = async (item) => {

        const key = {
            key: {
                "@assetType": "artist",
                "name": item.name,
            },
        };

        try {
            const data = await readArtist(key);

            if (data) setReadAlbum([data]);

        } catch (error) {
            console.log('erro ao ler dados', error)
        }

    }

    //get all albuns
    const getAlbum = async () => {

        //inputs de dados
        const payload = {
            query: {
                selector: {
                    "@assetType": "album",
                }
            }
        }

        try {
            const data = await getAllArtists(payload);

            if (data) setAlbum(data);

        } catch (error) {
            console.log('erro ao buscar albuns', error)
        }
    }

    useEffect(() => {
        getAlbum();
        getArtists();
    }, [])

    console.log('albuns', album)

    return (
        <div>
            <h1>
                Album List
            </h1>
            {
                readAlbum && readAlbum.map((item, index) => (
                    <div key={index}>
                        <h1>
                            {item.name}
                        </h1>
                        <p>
                            {item.year}
                        </p>
                        <p>
                            {item.artist?.name}
                        </p>
                        <button>
                            editar
                        </button>
                        <button>
                            excluir
                        </button>
                        <p>
                            --------------------------------
                        </p>
                    </div>
                ))
            }
            <button onClick={handlePost}>
                adicionar album
            </button>

            <label>
                Selecione um artista
                <select value={selectedArtist?.name} onChange={(e) => handleChange(e)}>
                    <option value=''>
                        Selecione um artista
                    </option>
                    {
                        artists && artists.map((item) => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))
                    }

                </select>
            </label>
            {
                album && album.map((item, index) => (
                    <div key={index}>
                        <h1 onDoubleClick={(item) => readAssetAlbum(item)}>
                            {item.name}
                        </h1>
                        <h3>
                            {item.year}
                        </h3>
                        <p>
                            {item.artist?.name}
                        </p>
                    </div>
                ))
            }

        </div>
    )
}

export default AlbumList