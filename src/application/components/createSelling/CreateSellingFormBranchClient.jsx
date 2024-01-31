import { useEffect } from 'react';
import { useAuthStore, useCreateSellingStore, useRecordsStorePagination } from '../../../hooks';
import { PaginatedSelect } from '../../ui';
import { InputComponent } from '../../../utilities';


const createSucursalesSelectOptions = user => {
    return [{
        value: user.sucursalId,
        text: user.sucursalNombre
    }];
}

export const CreateSellingFormBranchClient = ({ baseUrl }) => {
    const { sucursal, cliente, startSettingBranch, startSettingClient } = useCreateSellingStore();
    const { user } = useAuthStore();
    const { setBaseUrl } = useRecordsStorePagination();

    useEffect(() => {
        user.rol !== 'SUPER USUARIO' && startSettingBranch(user.sucursalId);
    }, []);

    useEffect(() => {
        sucursal && user.rol === 'SUPER USUARIO' && setBaseUrl(`${baseUrl}/${sucursal}`);
    }, [sucursal]);

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3">
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
                    {
                        user?.rol === 'SUPER USUARIO' ?
                            <PaginatedSelect
                                baseUrl='/sucursales'
                                inputId='sucursal'
                                inputName='sucursal'
                                labelText='Sucursal'
                                value={sucursal}
                                handleChange={e => startSettingBranch(e.target.value)}
                                keyToGetSelectValue='id'
                                keyToGetSelectText='nombre'
                                keyToGetData='sucursales'
                                containerStyle='w-[80%] md:w-[30%]'
                            />
                            :
                            <InputComponent
                                inputId='sucursal'
                                inputName='sucursal'
                                inputType='select'
                                labelText='Sucursal'
                                disabled={true}
                                selectOptions={createSucursalesSelectOptions(user)}
                                value={user?.sucursalId}
                                containerStyle='w-[80%] md:w-[30%]'
                            />
                    }
                    <PaginatedSelect
                        baseUrl='/clientes'
                        inputId='cliente'
                        inputName='cliente'
                        labelText='Cliente'
                        value={cliente}
                        handleChange={e => startSettingClient(e.target.value)}
                        isOptional={true}
                        containerStyle='w-[80%] md:w-[30%]'
                        keyToGetData='clientes'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                    />
                </div>
            </form>
        </div>
    )
}
