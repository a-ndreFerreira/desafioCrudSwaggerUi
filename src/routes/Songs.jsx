
import { useEffect, useState } from "react"

import { getAsset } from "../hooks/useFetch";

const Songs = () => {
    const [songs, setSongs] = useState([]);

    //pegar as @keys dinamicamente de songs 
    const getSongKeys = async (data) => {

        const songKeys = data.map((song) => ({
            "@assetType": "song",
            "@key": song["@key"]
        }))

        console.log('songKeys', songKeys);


    }

    //pegar os ativos song
    const getSongs = async () => {

        const payload = {
            query: {
                selector: {
                    "@assetType": "song",
                }
            }
        }

        try {
            const response = await getAsset('search', payload)
            const data = response.data.result;
            getSongKeys(data)
            setSongs(data)

        } catch (error) {
            console.log('getAssetSongs', error)
        }
    }

    useEffect(() => {
        getSongs();
    }, [])

    return (
        <div>
            <h1>
                Songs
            </h1>
            {
                songs && songs.map((item, index) => (
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

export default Songs