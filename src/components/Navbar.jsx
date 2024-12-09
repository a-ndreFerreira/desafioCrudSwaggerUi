
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div>
                goLedger
            </div>
            <ul>
                <li>
                    <NavLink to='/'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/artists'>
                        Artists
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/albuns'>
                        Albuns
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/songs'>
                        Songs
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/playlist'>
                        Playlist
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar