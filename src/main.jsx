import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { KeysContextProvider } from './context/KeysContext.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ArtistList from './routes/ArtistList.jsx'
import AlbumList from './routes/AlbumList.jsx'
import Home from './routes/Home.jsx'
import Songs from './routes/Songs.jsx'
import Playlist from './routes/Playlist.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/artists',
        element: <ArtistList />
      },
      {
        path: '/albuns',
        element: <AlbumList />
      },
      {
        path: '/songs',
        element: <Songs />
      },
      {
        path: '/playlist',
        element: <Playlist />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KeysContextProvider>
      <RouterProvider router={router} />
    </KeysContextProvider>
  </StrictMode>,
)
