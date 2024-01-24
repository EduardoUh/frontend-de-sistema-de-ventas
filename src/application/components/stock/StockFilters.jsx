import { useRecordsStorePagination, useForm } from '../../../hooks';
import { Button, PaginatedSelect } from '../../ui';
import { InputComponent } from '../../../utilities';


const filtersForm = {
    sucursal: '',
    producto: '',
    existencia: '',
    precio: '',
    creador: '',
    ultimoEnModificar: ''
}

const handleSubmitFiltersForm = (e, addFiltersToUrl, baseUrl, params) => {
    e.preventDefault();

    addFiltersToUrl(baseUrl, params);
}

export const StockFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const {
        sucursal, producto, existencia, precio, creador, ultimoEnModificar, formState,
        handleInputChange, handleResetForm
    } = useForm(filtersForm);

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" onSubmit={(e) => handleSubmitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
                    <InputComponent
                        inputId='existenciaFilter'
                        inputName='existencia'
                        inputType='number'
                        labelText='Filtrar por existencia'
                        handleChange={handleInputChange}
                        value={existencia}
                        containerStyle='w-[80%] md:w-[30%]'
                        placeholder='10.55'
                    />
                    <InputComponent
                        inputId='precioFilter'
                        inputName='precio'
                        inputType='number'
                        labelText='Filtrar por precio'
                        handleChange={handleInputChange}
                        value={precio}
                        containerStyle='w-[80%] md:w-[30%]'
                        placeholder='55.10'
                    />
                    <PaginatedSelect
                        inputId='sucursalFilter'
                        inputName='sucursal'
                        labelText='Filtrar por sucursal'
                        baseUrl='/sucursales'
                        keyToGetData='sucursales'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombre'
                        value={sucursal}
                        handleChange={handleInputChange}
                        containerStyle='w-[80%] md:w-[30%]'
                    />
                    <PaginatedSelect
                        inputId='productoFilter'
                        inputName='producto'
                        labelText='Filtrar por producto'
                        baseUrl='/productos'
                        keyToGetData='productos'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombre'
                        value={producto}
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
                </div>
                <div className="flex flex-col gap-2 md:flex-row justify-center items-center">
                    <Button text='Filtrar' type='submit' buttonSyles='w-[80%] md:w-[30%]' />
                    <Button text='Limpiar filtros' type='button' buttonSyles='w-[80%] md:w-[30%]' handleClick={handleResetForm} />
                </div>
            </form>
        </div>
    )
}
