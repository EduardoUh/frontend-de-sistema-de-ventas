import { useSelector, useDispatch } from 'react-redux';
import { onChecking, onLogin, onLogout, clearErrorMessage } from '../store/auth/authSlice.js';
import { api } from '../api/api.js';


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await api.post('/auth/login', { email, password });
            sessionStorage.setItem('token', data.token);
            dispatch(onLogin({ ...data.usuario, fechaCreacionToken: data.fechaCreacionToken, fechaExpiracionToken: data.fechaExpiracionToken }));

        } catch (error) {
            dispatch(onLogout(error.response.data.message));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const startLogout = async () => {
        sessionStorage.clear();
        dispatch(onLogout());
    }

    const checkAuthToken = async () => {
        const token = sessionStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await api.get('/auth/renovar-token');
            sessionStorage.setItem('token', data.token);
            dispatch(onLogin({ ...data.usuario, fechaCreacionToken: data.fechaCreacionToken, fechaExpiracionToken: data.fechaExpiracionToken }));

        } catch (error) {
            sessionStorage.clear();
            dispatch(onLogout());
        }
    }

    return {
        // ? properties
        status,
        user,
        errorMessage,
        // ? methods
        startLogin,
        startLogout,
        checkAuthToken,
    }
}
