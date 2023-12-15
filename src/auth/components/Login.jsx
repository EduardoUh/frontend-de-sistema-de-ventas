import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks';


export const Login = () => {
    return (
        <div>
            <h3>Login</h3>
            <form>
                <label htmlFor="email">Email: </label>
                <input type="email" id='email' placeholder='youremail@gmail.com' className="rounded-md p-1 text-center" />
            </form>
        </div>
    )
}
