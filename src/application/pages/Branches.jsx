import { useEffect } from 'react';
import { useForm, useRecordsStorePaginationHooks, useRecordsStorePagination } from '../../hooks';
import { BranchesPagination, BranchesUpdateForm, BranchesCreateButton, BranchesCreateForm } from '../components/branches';
import { InputComponent } from '../../utilities';


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

const baseUrl = '/sucursales';

const keyToGetCollectionOfData = 'sucursales';

const handleSumbitFiltersForm = (event, addFiltersFn, url, params) => {
    event.preventDefault();

    addFiltersFn(url, { ...params });
}

// Permissions in this module -> CREAR - VER -ACTUALIZAR
// TODO: take the select logic off the InputComponent and refactor it to accept pagination if there is a next page, then implement it in the InputComponent

export const Branches = ({ permissions, name }) => {
    useRecordsStorePaginationHooks();

    useEffect(() => {
        setBaseUrl(baseUrl);
        setTheKeyToGetCollectionOfData(keyToGetCollectionOfData);
    }, []);

    const { setBaseUrl, setTheKeyToGetCollectionOfData, addFiltersToUrl } = useRecordsStorePagination();

    const { nombre, ciudad, email, activa, creador, formState, handleInputChange, isFormSubmitted, setFormSubmitted, handleResetForm } = useForm(filtersForm);


    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    console.log(1);

    return (
        <div className="space-y-3">
            <h2 className="text-center font-bold text-lg">{name}</h2>
            {
                permissions.find(permission => permission === 'CREAR') &&
                (
                    <BranchesCreateButton />
                )
            }
            {
                permissions.find(permission => permission === 'VER') &&
                (
                    // TODO: Implement the following filters -> nombre, ciudad, email, activa, creador(id)
                    <>
                        <div className="border">
                            <form className="border border-black" onSubmit={(e) => handleSumbitFiltersForm(e, addFiltersToUrl, baseUrl, formState)}>
                                <div className="flex flex-wrap justify-around">
                                    <InputComponent
                                        inputId='nombre'
                                        inputName='nombre'
                                        inputType='text'
                                        placeholder='Nombre de la sucursal'
                                        labelText='Filtrar por nombre'
                                        handleChange={handleInputChange}
                                        value={nombre}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                    <InputComponent
                                        inputId='ciudad'
                                        inputName='ciudad'
                                        inputType='text'
                                        placeholder='Nombre de la ciudad'
                                        labelText='Filtrar por ciudad'
                                        handleChange={handleInputChange}
                                        value={ciudad}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                    <InputComponent
                                        inputId='email'
                                        inputName='email'
                                        inputType='text'
                                        placeholder='Email'
                                        labelText='Filtrar por email'
                                        handleChange={handleInputChange}
                                        value={email}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                    <InputComponent
                                        inputId='activa'
                                        inputName='activa'
                                        inputType='select'
                                        labelText='Filtrar status'
                                        handleChange={handleInputChange}
                                        value={activa}
                                        selectOptions={selectOptions}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                </div>
                                <button className="bg-indigo-500 font-bold text-white" type="submit">
                                    Filtrar
                                </button>
                            </form>
                        </div>
                        <BranchesPagination permissions={permissions} />
                    </>
                )
            }
            <BranchesUpdateForm baseUrl={baseUrl} />
            <BranchesCreateForm baseUrl={baseUrl} />
        </div >
    )
}
