import { useRecordsStorePagination, useAuthStore, useForm } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { Button, PaginatedSelect } from '../../ui';


const filtersFormNormalUsers = {
    creador: '',
    cliente: '',
    saldada: '',
}

const filtersFormSuperUser = {
    sucursal: '',
    creador: '',
    cliente: '',
    saldada: '',
}

const selectOptions = [
    {
        value: 'true',
        text: 'Saldada'
    },
    {
        value: 'false',
        text: 'No saldada'
    }
]

const handleSumbitFiltersForm = (e, addFiltersToUrl, baseUrl, params) => {
    e.preventDefault();

    addFiltersToUrl(baseUrl, params);
}

export const SellingsFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const { user } = useAuthStore();
    const {
        sucursal, creador, cliente, saldada, formState,
        handleInputChange, handleResetForm
    } = useForm(user?.rol !== 'SUPER USUARIO' ? filtersFormNormalUsers : filtersFormSuperUser);

    if (!baseUrl || typeof baseUrl !== 'string') return (<div>baseUrl prop is required</div>);

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" onSubmit={e => handleSumbitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
                    {
                        user?.rol === 'SUPER USUARIO' &&
                        <PaginatedSelect
                            baseUrl='/sucursales'
                            inputId='sucursalesFilter'
                            inputName='sucursal'
                            labelText='Filtrar por sucursal'
                            value={sucursal}
                            handleChange={handleInputChange}
                            keyToGetSelectValue='id'
                            keyToGetSelectText='nombre'
                            keyToGetData='sucursales'
                            containerStyle='w-[80%] md:w-[30%]'
                        />
                    }
                    <InputComponent
                        inputId='saldadaFilter'
                        inputName='saldada'
                        inputType='select'
                        labelText='Filtrar por estatus'
                        handleChange={handleInputChange}
                        value={saldada}
                        selectOptions={selectOptions}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        baseUrl='/clientes'
                        inputId='clienteFilter'
                        inputName='cliente'
                        labelText='Filtrar por cliente'
                        value={cliente}
                        handleChange={handleInputChange}
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                        keyToGetData='clientes'
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
                </div>
                <div className="flex flex-col gap-2 md:flex-row justify-center items-center">
                    <Button text='Filtrar' type='submit' buttonSyles='w-[80%] md:w-[30%]' />
                    <Button text='Limpiar filtros' type='button' buttonSyles='w-[80%] md:w-[30%]' handleClick={handleResetForm} />
                </div>
            </form>
        </div>
    )
}
