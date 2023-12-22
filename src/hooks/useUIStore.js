import { useSelector, useDispatch } from 'react-redux';
import { onSwitchNavbarState } from '../store/ui/uISlice';


export const useUIStore = () => {
    const { showNavbar } = useSelector(state => state.uI);
    const dispatch = useDispatch();

    const startSwitchNavbarState = () => {
        dispatch(onSwitchNavbarState());
    }

    return {
        // ? properties
        showNavbar,
        // ? methods
        startSwitchNavbarState,
    }
}
