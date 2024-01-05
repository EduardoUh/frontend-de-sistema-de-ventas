import { useSelector, useDispatch } from 'react-redux';
import { onSwitchNavbarState, onOpenUpdateModal, onCloseUpdateModal } from '../store/ui/uISlice';


export const useUIStore = () => {
    const { showNavbar, updateModalIsOpen } = useSelector(state => state.uI);
    const dispatch = useDispatch();

    const startSwitchNavbarState = () => {
        dispatch(onSwitchNavbarState());
    }

    const startOpenUpdateModal = () => {
        dispatch(onOpenUpdateModal());
    }

    const startCloseUpdateModal = () => {
        dispatch(onCloseUpdateModal());
    }

    return {
        // ? properties
        showNavbar,
        updateModalIsOpen,
        // ? methods
        startSwitchNavbarState,
        startOpenUpdateModal,
        startCloseUpdateModal,
    }
}
