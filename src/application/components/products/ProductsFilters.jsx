import { useRecordsStorePagination, useForm } from '../../../hooks';
import { Button, PaginatedSelect } from '../../ui';
import { InputComponent } from '../../../utilities';


const filtersForm = {
    tipoProducto: '',
    proveedor: '',
    creador: '',
    ultimoEnModificar: '',
    activo: ''
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

export const ProductsFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const {
        tipoProducto, proveedor, creador, ultimoEnModificar, activo, formState,
        handleInputChange, handleResetForm
    } = useForm(filtersForm);

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" onSubmit={(e) => handleSubmitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
                    <PaginatedSelect
                        inputId='tipoProductoFilter'
                        inputName='tipoProducto'
                        labelText='Filtrar por tipo de producto'
                        baseUrl='/tiposProductos'
                        keyToGetData='tiposProductos'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='tipoProducto'
                        value={tipoProducto}
                        handleChange={handleInputChange}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        inputId='proveedorFilter'
                        inputName='proveedor'
                        labelText='Filtrar por proveedor'
                        baseUrl='/proveedores'
                        keyToGetData='proveedores'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombre'
                        value={proveedor}
                        handleChange={handleInputChange}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        inputId='creadorFilter'
                        inputName='creador'
                        labelText='Filtrar por creador'
                        baseUrl='/usuarios'
                        keyToGetData='usuarios'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                        value={creador}
                        handleChange={handleInputChange}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        inputId='ultimoEnModificarFilter'
                        inputName='ultimoEnModificar'
                        labelText='Filtrar por último en modificar'
                        baseUrl='/usuarios'
                        keyToGetData='usuarios'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                        value={ultimoEnModificar}
                        handleChange={handleInputChange}
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
                </div>
                <div className="flex flex-col gap-2 md:flex-row justify-center items-center">
                    <Button text='Filtrar' type='submit' buttonSyles='w-[80%] md:w-[30%]' />
                    <Button text='Limpiar filtros' type='button' buttonSyles='w-[80%] md:w-[30%]' handleClick={handleResetForm} />
                </div>
            </form>
        </div>
    )
}
