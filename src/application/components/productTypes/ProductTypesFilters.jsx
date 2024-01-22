import { useRecordsStorePagination, useForm } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { Button } from '../../ui';


const filtersForm = {
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

export const ProductTypesFilters = ({ baseUrl }) => {
    const { addFiltersToUrl } = useRecordsStorePagination();
    const {
        activo, formState,
        handleInputChange, handleResetForm,
    } = useForm(filtersForm);


    if (!baseUrl || typeof baseUrl !== 'string') return (<div className='font-bold text-center text-3xl'>baseUrl prop is required</div>);
    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" onSubmit={(e) => handleSubmitFiltersForm(e, addFiltersToUrl, baseUrl, { ...formState })}>
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
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
