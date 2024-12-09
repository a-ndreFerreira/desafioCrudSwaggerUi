
import { useEffect, useState } from "react";

import api from "../services/api";
import { getAsset } from "../hooks/useFetch";

const AlbumList = () => {
    const [album, setAlbum] = useState([]);

    const getAlbum = async () => {

        const payload = {
            query: {
                selector: {
                    "@assetType": "album",
                }
            }
        }

        try {
            const response = await getAsset('search', payload);

            const data = response.data.result;

            setAlbum(data)

        } catch (error) {
            console.log('GetAlbumList', error)
        }
    }

    useEffect(() => {
        getAlbum();
    }, [])

    return (
        <div>
            <h1>
                Album List
            </h1>
            {
                album && album.map((item, index) => (
                    <div key={index}>
                        <h1>
                            {item.name}
                        </h1>
                        <h3>
                            {item.year}
                        </h3>
                    </div>
                ))
            }

        </div>
    )
}

export default AlbumList