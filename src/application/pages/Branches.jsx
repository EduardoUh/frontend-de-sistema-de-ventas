import { useEffect } from 'react';
import { useForm, usePaginationStore, useUIStore } from '../../hooks';
import { BranchesPagination, BranchesUpdateForm } from '../components/branches';
import { InputComponent, Message } from '../../utilities';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button, Modal } from '../ui';


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

export const Branches = ({ permissions }) => {
    const {
        records, isLoading, error, page, pagesCanBeGenerated, setBaseUrl, setTheKeyToGetCollectionOfData, nextPage, previousPage, addFiltersToUrl,
        errors, selectedRecord, sucessMessage, startSelectingRecord, startCleaningRecord, startUpdatingRecord,
    } = usePaginationStore();

    const { nombre, ciudad, email, activa, creador, formState, handleInputChange, isFormSubmitted, setFormSubmitted, handleResetForm } = useForm(filtersForm);

    useEffect(() => {
        setBaseUrl(baseUrl);
        setTheKeyToGetCollectionOfData(keyToGetCollectionOfData);
    }, [baseUrl]);

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    console.log(1);

    return (
        <div className="space-y-3">
            <h2 className="text-center font-bold text-lg">Sucursales</h2>
            {
                permissions.find(permission => permission === 'CREAR') &&
                (
                    <div className="p-2">
                        <button className="rounded-3xl px-3 py-1 bg-gradient-to-br from-blue-500  to-purple-300 text-white font-bold text-3xl flex justify-center items-center transition hover:scale-110 hover:bg-indigo-700">
                            +
                        </button>
                    </div>
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
            <BranchesUpdateForm baseUrl={baseUrl}/>
        </div >
    )
}
