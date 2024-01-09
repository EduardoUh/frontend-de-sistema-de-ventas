import { useForm, useRecordsStorePagination } from '../../../hooks';
import { InputComponent } from '../../../utilities';


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

const handleSumbitFiltersForm = (event, addFiltersToUrl, url, params) => {
    event.preventDefault();

    addFiltersToUrl(url, params);
}

// ? Permissions in this module -> CREAR - VER -ACTUALIZAR
// TODO: Implement the following filters -> nombre, ciudad, email, activa, creador(id)
// TODO: take the select logic off the InputComponent and refactor it to accept pagination if there is a next page, then implement it in the InputComponent
export const BranchesFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const { nombre, ciudad, email, activa, creador, formState, handleInputChange, isFormSubmitted, setFormSubmitted, handleResetForm } = useForm(filtersForm);

    if (!baseUrl || typeof baseUrl !== 'string') return (<div>baseUrl prop is required</div>);

    return (
        <div className="border">
            <form className="border border-black" onSubmit={(e) => handleSumbitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center sm:flex-row sm:justify-around sm:flex-wrap">
                    <InputComponent
                        inputId='nombre'
                        inputName='nombre'
                        inputType='text'
                        placeholder='Nombre de la sucursal'
                        labelText='Filtrar por nombre'
                        handleChange={handleInputChange}
                        value={nombre}
                        containerStyle='border border-red-400 w-[80%] sm:w-[30%]'
                    />
                    <InputComponent
                        inputId='ciudad'
                        inputName='ciudad'
                        inputType='text'
                        placeholder='Nombre de la ciudad'
                        labelText='Filtrar por ciudad'
                        handleChange={handleInputChange}
                        value={ciudad}
                        containerStyle='border border-red-400 w-[80%] sm:w-[30%]'
                    />
                    <InputComponent
                        inputId='email'
                        inputName='email'
                        inputType='text'
                        placeholder='Email'
                        labelText='Filtrar por email'
                        handleChange={handleInputChange}
                        value={email}
                        containerStyle='border border-red-400 w-[80%] sm:w-[30%]'
                    />
                    <InputComponent
                        inputId='activa'
                        inputName='activa'
                        inputType='select'
                        labelText='Filtrar status'
                        handleChange={handleInputChange}
                        value={activa}
                        selectOptions={selectOptions}
                        containerStyle='border border-red-400 w-[80%] sm:w-[30%]'
                    />
                </div>
                <button className="bg-indigo-500 font-bold text-white" type="submit">
                    Filtrar
                </button>
            </form>
        </div>
    )
}
