import { useRecordsStorePagination, useForm } from '../../../hooks';
import { Button, PaginatedSelect } from '../../ui';


const filtersForm = {
    sucursal: '',
    creador: '',
    proveedor: ''
}

const handleSubmitFiltersForm = (e, addFiltersToUrl, url, params) => {
    e.preventDefault();

    addFiltersToUrl(url, params);
}

export const PurchasesFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const {
        sucursal, creador, proveedor, formState,
        handleInputChange, handleResetForm
    } = useForm(filtersForm);

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" onSubmit={(e) => handleSubmitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
                    <PaginatedSelect
                        inputId='sucursalFilter'
                        inputName='sucursal'
                        labelText='Filtrar por sucursal'
                        value={sucursal}
                        handleChange={handleInputChange}
                        baseUrl='/sucursales'
                        keyToGetData='sucursales'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombre'
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        inputId='creadorFilter'
                        inputName='creador'
                        labelText='Filtrar por creador'
                        value={creador}
                        handleChange={handleInputChange}
                        baseUrl='/usuarios'
                        keyToGetData='usuarios'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        inputId='proveedorFilter'
                        inputName='proveedor'
                        labelText='Filtrar por proveedor'
                        value={proveedor}
                        handleChange={handleInputChange}
                        baseUrl='/proveedores'
                        keyToGetData='proveedores'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombre'
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
