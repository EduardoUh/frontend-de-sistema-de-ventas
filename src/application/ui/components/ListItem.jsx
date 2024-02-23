import { NavLink } from 'react-router-dom';
import { useUIStore } from '../../../hooks';


export const ListItem = ({ route = '/', text = 'List item' }) => {
    const { startSwitchNavbarState } = useUIStore();

    return (
        <li>
            <NavLink
                to={route}
                className={({ isActive }) => `block hover:text-gray-300 ${isActive ? "border-b-2 border-b-white text-gray-300" : ""}`}
                onClick={startSwitchNavbarState}
            >
                {text}
            </NavLink>
        </li>
    )
}
