import { useRecordsStorePagination, useForm } from '../../../hooks';
import { Button, PaginatedSelect } from '../../ui';
import { InputComponent } from '../../../utilities';


const filtersForm = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
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

const handleSubmitFiltersForm = (e, addFiltersToUrl, url, params) => {
    e.preventDefault();

    addFiltersToUrl(url, params);
}

export const CustomersFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const {
        nombres, apellidoPaterno, apellidoMaterno, email, activo, creador, ultimoEnModificar, formState,
        handleInputChange, handleResetForm
    } = useForm(filtersForm);

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" onSubmit={(e) => handleSubmitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
                    <InputComponent
                        inputId='nombresFilter'
                        inputName='nombres'
                        inputType='text'
                        placeholder='Nombres del cliente'
                        labelText='Filtrar por nombres'
                        handleChange={handleInputChange}
                        value={nombres}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <InputComponent
                        inputId='ApellidoPaternoFilter'
                        inputName='apellidoPaterno'
                        inputType='text'
                        placeholder='Apellido paterno'
                        labelText='Filtrar por apellido paterno'
                        handleChange={handleInputChange}
                        value={apellidoPaterno}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <InputComponent
                        inputId='ApellidoMaternoFilter'
                        inputName='apellidoMaterno'
                        inputType='text'
                        placeholder='Apellido materno'
                        labelText='Filtrar por apellido materno'
                        handleChange={handleInputChange}
                        value={apellidoMaterno}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <InputComponent
                        inputId='emailFilter'
                        inputName='email'
                        inputType='email'
                        placeholder='Email'
                        labelText='Filtrar por email'
                        handleChange={handleInputChange}
                        value={email}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <InputComponent
                        inputId='activoFilter'
                        inputName='activo'
                        inputType='select'
                        labelText='Filtrar por estatus'
                        handleChange={handleInputChange}
                        value={activo}
                        selectOptions={selectOptions}
                        containerStyle='w-[80%] md:w-[30%]'
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
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        baseUrl='/usuarios'
                        inputId='ultimoEnModificarFilter'
                        inputName='ultimoEnModificar'
                        labelText='Filtrar por último en modificar'
                        value={ultimoEnModificar}
                        handleChange={handleInputChange}
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                        keyToGetData='usuarios'
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
