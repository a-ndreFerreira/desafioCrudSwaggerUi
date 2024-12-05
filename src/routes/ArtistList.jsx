
import { useEffect, useState } from "react"

import api from '../services/api'

// const dataBase = [
//     { description: 'Bob Marley', dynamic: false, label: 'Artist', tag: 'artist', writers: null },

//     { description: 'You could be love', dynamic: false, label: 'Album', tag: 'album', writers: null },
//     { description: 'you could be love', dynamic: false, label: 'Song', tag: 'song', writers: null },
//     { description: 'Playlist', dynamic: false, label: 'Playlist', tag: 'playlist', writers: null },
//     { description: 'AssetTypeListData', dynamic: false, label: 'AssetTypeListData', tag: 'assetTypeListData', writers: null },
// ]

const ArtistList = () => {
    const [artists, setArtists] = useState([]);

    const dataBase = { 'Bob Marley': 'Bad boy' }


    const handleClick = async () => {

        try {
            const response = await api.post("/api/query/search", dataBase);

            const data = response.data;
            console.log(data)
            setArtists(data)

        } catch (error) {
            console.log('error ao adicionar dados', error)
        }
    }


    const getArtist = async () => {

        try {
            const response = await api.get("/api/query/getSchema");

            const data = response.data;


            setArtists(data);

            console.log(artists)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getArtist()

    }, [])

    return (
        <div>
            <h1>
                Artistas
            </h1>
            <button onClick={handleClick}>
                adicionar
            </button>
            {
                artists && artists.map((item, index) => (
                    <div key={index}>
                        <h1>{item.label}</h1>
                        <p>{item.description}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ArtistList