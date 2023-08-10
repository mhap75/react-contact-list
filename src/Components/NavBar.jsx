import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return (<nav className="container">
        <ul className="flex items-center gap-5">
            <li><NavLink className={({isActive}) => isActive ? "active p-2" : "p-2"}
                         to="/">Home</NavLink></li>
            <li><NavLink className={({isActive}) => isActive ? "active p-2" : "p-2"} to="/contacts">Contacts</NavLink></li>
        </ul>
    </nav>)
}