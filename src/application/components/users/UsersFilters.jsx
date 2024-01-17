import { useForm, useRecordsStorePagination } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { PaginatedSelect, Button } from '../../ui';


const filtersForm = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rfc: '',
    rol: '',
    email: '',
    activo: '',
    sucursal: '',
    creador: '',
    ultimoEnModificar: ''
}

const selectOptions = [
    {
        value: "true",
        text: 'Activo'
    },
    {
        value: "false",
        text: 'Inactivo'
    }
]

const handleSubmitFiltersForm = (e, addFiltersToUrl, baseUrl, params) => {
    e.preventDefault();

    addFiltersToUrl(baseUrl, params);
}

export const UsersFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const { nombres, apellidoPaterno, apellidoMaterno, rfc, rol, email, activo, sucursal, creador, ultimoEnModificar, formState, handleInputChange, handleResetForm } = useForm(filtersForm);

    if (!baseUrl || typeof baseUrl !== 'string') return (<div className='font-bold text-center text-3xl'>baseUrl prop is required</div>);

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" onSubmit={(e) => handleSubmitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
                    <InputComponent
                        inputId='nombresFilter'
                        inputName='nombres'
                        inputType='text'
                        placeholder='Nombres del usuario'
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
                        inputId='rfcFilter'
                        inputName='rfc'
                        inputType='text'
                        placeholder='Rfc'
                        labelText='Filtrar por rfc'
                        handleChange={handleInputChange}
                        value={rfc}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        baseUrl='/roles'
                        inputId='rolFilter'
                        inputName='rol'
                        labelText='Filtrar por rol'
                        value={rol}
                        handleChange={handleInputChange}
                        containerStyle='w-[80%] md:w-[30%]'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='rol'
                        keyToGetData='roles'
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
                        baseUrl='/sucursales'
                        inputId='sucursalFilter'
                        inputName='sucursal'
                        labelText='Filtrar por sucursal'
                        value={sucursal}
                        handleChange={handleInputChange}
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombre'
                        keyToGetData='sucursales'
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
