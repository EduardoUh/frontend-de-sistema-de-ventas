import { useForm } from '../../hooks';
import { InputComponent } from '../../utilities';


const filtersForm = {
    nombre: '',
    ciudad: '',
    email: '',
    activa: '',
    creador: ''
}

const selectOptions = [
    {
        value: "true",
        text: 'Activa'
    },
    {
        value: "false",
        text: 'Inactiva'
    }
]

// Permissions in this module -> CREAR - VER -ACTUALIZAR
export const Brands = ({ permissions }) => {
    const { nombre, ciudad, email, activa, creador, handleInputChange, isFormSubmitted, setFormSubmitted, handleResetForm } = useForm(filtersForm);

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className="space-y-3">
            <h2 className="text-center font-bold text-lg">Sucursales</h2>
            {
                permissions.find(permission => permission === 'CREAR') &&
                (
                    <div className="p-2">
                        <button className="rounded-3xl px-3 py-1 bg-gradient-to-br from-blue-500  to-purple-300 text-white font-bold text-3xl flex justify-center items-center transition hover:scale-110 hover:bg-indigo-700">
                            +
                        </button>
                    </div>
                )
            }
            {
                permissions.find(permission => permission === 'VER') &&
                (
                    // TODO: Implement the following filters -> nombre, ciudad, email, activa, creador(id)
                    <>
                        <div className="border">
                            <form className="border border-black">
                                <div className="flex flex-wrap justify-around">
                                    <InputComponent
                                        inputId='nombre'
                                        inputName='nombre'
                                        inputType='text'
                                        placeholder='Nombre de la sucursal'
                                        labelText='Filtrar por nombre'
                                        handleChange={handleInputChange}
                                        value={nombre}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                    <InputComponent
                                        inputId='ciudad'
                                        inputName='ciudad'
                                        inputType='text'
                                        placeholder='Nombre de la ciudad'
                                        labelText='Filtrar por ciudad'
                                        handleChange={handleInputChange}
                                        value={ciudad}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                    <InputComponent
                                        inputId='email'
                                        inputName='email'
                                        inputType='text'
                                        placeholder='Email'
                                        labelText='Filtrar por email'
                                        handleChange={handleInputChange}
                                        value={email}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                    <InputComponent
                                        inputId='activa'
                                        inputName='activa'
                                        inputType='select'
                                        labelText='Filtrar status'
                                        handleChange={handleInputChange}
                                        value={activa}
                                        selectOptions={selectOptions}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="border">
                            Cards and pagination here
                        </div>
                    </>
                )
            }
        </div >
    )
}
