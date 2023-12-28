import { useSelector, useDispatch } from 'react-redux';
import { onSwitchNavbarState, onOpenModal, onCloseModal } from '../store/ui/uISlice';


export const useUIStore = () => {
    const { showNavbar, modalIsOpen } = useSelector(state => state.uI);
    const dispatch = useDispatch();

    const startSwitchNavbarState = () => {
        dispatch(onSwitchNavbarState());
    }

    const startOpenModal = () => {
        dispatch(onOpenModal());
    }

    const startCloseModal = () => {
        dispatch(onCloseModal());
    }

    return {
        // ? properties
        showNavbar,
        modalIsOpen,
        // ? methods
        startSwitchNavbarState,
        startOpenModal,
        startCloseModal,
    }
}
