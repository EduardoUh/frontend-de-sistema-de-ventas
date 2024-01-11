import { useForm, useRecordsStorePagination } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { Button, PaginatedSelect } from '../../ui';


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

export const BranchesFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const { nombre, ciudad, email, activa, creador, formState, handleInputChange, handleResetForm } = useForm(filtersForm);

    if (!baseUrl || typeof baseUrl !== 'string') return (<div>baseUrl prop is required</div>);

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" onSubmit={(e) => handleSumbitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center sm:flex-row sm:justify-around sm:flex-wrap">
                    <InputComponent
                        inputId='nombreFilter'
                        inputName='nombre'
                        inputType='text'
                        placeholder='Nombre de la sucursal'
                        labelText='Filtrar por nombre'
                        handleChange={handleInputChange}
                        value={nombre}
                        containerStyle='w-[80%] sm:w-[30%]'
                    />
                    <InputComponent
                        inputId='ciudadFilter'
                        inputName='ciudad'
                        inputType='text'
                        placeholder='Nombre de la ciudad'
                        labelText='Filtrar por ciudad'
                        handleChange={handleInputChange}
                        value={ciudad}
                        containerStyle='w-[80%] sm:w-[30%]'
                    />
                    <InputComponent
                        inputId='emailFilter'
                        inputName='email'
                        inputType='text'
                        placeholder='Email'
                        labelText='Filtrar por email'
                        handleChange={handleInputChange}
                        value={email}
                        containerStyle='w-[80%] sm:w-[30%]'
                    />
                    <InputComponent
                        inputId='activaFilter'
                        inputName='activa'
                        inputType='select'
                        labelText='Filtrar status'
                        handleChange={handleInputChange}
                        value={activa}
                        selectOptions={selectOptions}
                        containerStyle='w-[80%] sm:w-[30%]'
                    />
                    <PaginatedSelect
                        baseUrl='/usuarios'
                        inputId='creadorFilter'
                        inputName='creador'
                        labelText='Filtrar por creador'
                        value={creador}
                        handleChange={handleInputChange}
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                        keyToGetData='usuarios'
                        containerStyle='w-[80%] sm:w-[30%]'
                    />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row justify-center items-center">
                    <Button text='Filtrar' type='submit' buttonSyles='w-[80%] sm:w-[30%]' />
                    <Button text='Limpiar filtros' type='button' buttonSyles='w-[80%] sm:w-[30%]' handleClick={handleResetForm} />
                </div>
            </form>
        </div>
    )
}
