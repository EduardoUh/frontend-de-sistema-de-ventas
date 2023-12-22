import { NavLink } from 'react-router-dom';


export const ListItem = ({ route = '/', text = 'List item' }) => {
    return (
        <li>
            <NavLink to={route} className={({ isActive }) => `block hover:text-gray-300 ${isActive ? "border-b-2 border-b-white text-gray-300" : ""}`}>{text}</NavLink>
        </li>
    )
}
