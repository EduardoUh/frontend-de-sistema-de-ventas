import { useRecordsStorePagination, useForm } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { Button, PaginatedSelect } from '../../ui';


const filtersForm = {
    nombre: '',
    email: '',
    rfc: '',
    activo: '',
    creador: '',
    ultimoEnModificar: '',
}

const selectOptions = [
    {
        value: 'true',
        text: 'Activo'
    },
    {
        value: 'false',
        text: 'Inactivo'
    }
]

const handleSubmitFiltersForm = (e, addFiltersToUrl, baseUrl, params) => {
    e.preventDefault();

    addFiltersToUrl(baseUrl, params);
}

export const ProvidersFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const {
        nombre, email, rfc, activo, creador, ultimoEnModificar, formState,
        handleInputChange, handleResetForm
    } = useForm(filtersForm);

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" onSubmit={(e) => handleSubmitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
                    <InputComponent
                        inputId='nombreFilter'
                        inputName='nombre'
                        inputType='text'
                        labelText='Filtrar por nombre'
                        value={nombre}
                        handleChange={handleInputChange}
                        placeholder='Nombre'
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <InputComponent
                        inputId='emailFilter'
                        inputName='email'
                        inputType='email'
                        labelText='Filtrar por email'
                        value={email}
                        handleChange={handleInputChange}
                        placeholder='Email'
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <InputComponent
                        inputId='rfcFilter'
                        inputName='rfc'
                        inputType='text'
                        labelText='Filtrar por rfc'
                        value={rfc}
                        handleChange={handleInputChange}
                        placeholder='Rfc'
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <InputComponent
                        inputId='estatusFilter'
                        inputName='activo'
                        inputType='select'
                        labelText='Filtrar por estatus'
                        value={activo}
                        selectOptions={selectOptions}
                        handleChange={handleInputChange}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        baseUrl='/usuarios'
                        keyToGetData='usuarios'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                        inputId='creadorFilter'
                        inputName='creador'
                        labelText='Filtrar por creador'
                        value={creador}
                        handleChange={handleInputChange}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        baseUrl='/usuarios'
                        keyToGetData='usuarios'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                        inputId='ultimoEnModificarFilter'
                        inputName='ultimoEnModificar'
                        labelText='Filtrar por último en modificar'
                        value={ultimoEnModificar}
                        handleChange={handleInputChange}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                </div>
                <div className="flex flex-col gap-2 md:flex-row justify-center items-center">
                    <Button text='Filtrar' type='submit' buttonSyles='w-[80%] md:w-[30%]' />
                    <Button text='Limpiar filtros' type='button' buttonSyles='w-[80%] md:w-[30%]' handleClick={handleResetForm} />
                </div>
            </form>
        </div>
    )
}
