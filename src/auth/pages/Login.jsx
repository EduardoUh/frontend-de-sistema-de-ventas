import { useAuthStore, useForm } from '../../hooks';
import { InputComponent, Message } from '../components';
import { emailValidator, passwordValidation } from '../../helpers';


const loginForm = {
    email: '',
    password: ''
}

const loginFormValidations = {
    email: [emailValidator, 'Email inválido'],
    password: [passwordValidation, 'La contraseña debe contener al menos 5 caracteres']
}

export const Login = () => {
    const { email, password, isFormSubmitted, isFormValid, emailValid, passwordValid, formState, handleInputChange, handleResetForm, setFormSubmitted } = useForm(loginForm, loginFormValidations);
    const { status, errorMessage, startLogin } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormSubmitted(true);

        if (!isFormValid) {
            return;
        }

        startLogin(formState);
    }

    return (
        <div className="h-screen bg-blue-900 flex justify-center items-center">
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md">
                <div className="w-full space-y-3">
                    {
                        !!errorMessage && <Message message={errorMessage} severity='error' />
                    }
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
                            disabled={status === 'checking'}
                            className={`w-full rounded bg-indigo-600 text-white font-bold p-2 ${status === 'checking' ? 'bg-indigo-400' : ''}`}
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
