import { useAuthStore, useForm } from '../../hooks';
import { InputComponent } from '../components';
import { emailValidator, passwordValidation } from '../../helpers';


const loginForm = {
    email: '',
    password: ''
}

const loginFormValidations = {
    email: [emailValidator, 'Email inválido'],
    password: [passwordValidation, 'Contraseña inválida']
}

export const Login = () => {
    const { email, password, isFormSubmitted, isFormValid, emailValid, passwordValid, handleInputChange, handleResetForm, setFormSubmitted } = useForm(loginForm, loginFormValidations);

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormSubmitted(true);

        if (!isFormValid) {
            return;
        }
        // TODO: implement the useAuthStore custom hook here
        console.log('submitted');
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md">
                <div className="w-full space-y-3">
                    <h3 className="text-center font-bold text-2xl">Iniciar sesi&oacute;n</h3>
                    <form
                        onSubmit={handleSubmit}
                        className='space-y-3'
                    >
                        <InputComponent
                            labelText='Email'
                            inputType='email'
                            inputId='email'
                            inputName='email'
                            placeholder='ej. correo@gmail.com'
                            errorMessage={emailValid}
                            severity='error'
                            hasError={!!emailValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            value={email}
                        />
                        <InputComponent
                            labelText='Contraseña'
                            inputType='password'
                            inputId='password'
                            inputName='password'
                            placeholder='ej. contraseña'
                            errorMessage={passwordValid}
                            severity='error'
                            hasError={!!passwordValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            value={password}
                        />
                        <button
                            type="submit"
                            className='w-full rounded bg-indigo-600 text-white font-bold p-2'
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
