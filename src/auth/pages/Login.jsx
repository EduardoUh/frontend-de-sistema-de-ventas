import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks';


export const Login = () => {
    return (
        <div className="h-screen border border-black flex justify-center items-center">
            <div className="border-2 border-red-500 w-full md:w-1/2 lg:w-1/3 bg-white px-4 py-8 rounded-md">
                <div className="w-full space-y-3">
                    <h3 className="text-center font-bold text-2xl">Iniciar sesi&oacute;n</h3>
                    <form>
                        <div className="flex flex-col md:flex-row space-x-1">
                            <label htmlFor="email" className="w-1/6 text-center">Email: </label>
                            <input type="email" id='email' placeholder='nombre@gmail.com' className="rounded-md w-5/6 text-center border-2 border-gray-400" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
