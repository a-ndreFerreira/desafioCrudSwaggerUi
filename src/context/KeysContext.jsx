import { createContext, useState } from "react";

export const KeysContext = createContext();

export const KeysContextProvider = ({ children }) => {
    const [artistForAlbum, setArtistForAlbum] = useState([]);

    return (
        <KeysContext.Provider value={{ artistForAlbum, setArtistForAlbum }}>
            {children}
        </KeysContext.Provider>
    )
}