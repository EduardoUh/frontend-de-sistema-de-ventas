import { useEffect } from 'react';
import { useCreatePurchaseStore, useAuthStore, useRecordsStorePagination } from '../../../hooks';
import { PaginatedSelect } from '../../ui';
import { InputComponent } from '../../../utilities';


const createSucursalesSelectOptions = user => {
    return [{
        value: user.sucursalId,
        text: user.sucursalNombre
    }];
}

const startSetBaseUrlAndClearPayload = (baseUrl, proveedor, setBaseUrl, startClearPayloadExceptBranchAndProvider) => {
    setBaseUrl(`${baseUrl}?proveedor=${proveedor}`);

    startClearPayloadExceptBranchAndProvider();
}

export const CreatePurchaseFormProviderBranch = ({ baseUrl }) => {
    const { sucursal, proveedor, startSettingBranch, startSettingProvider, startClearPayloadExceptBranchAndProvider } = useCreatePurchaseStore();
    const { user } = useAuthStore();
    const { setBaseUrl } = useRecordsStorePagination();

    useEffect(() => {
        user.rol !== 'SUPER USUARIO' && startSettingBranch(user.sucursalId);
    }, []);

    useEffect(() => {
        proveedor.trim() !== '' && startSetBaseUrlAndClearPayload(baseUrl, proveedor, setBaseUrl, startClearPayloadExceptBranchAndProvider);
    }, [proveedor]);

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
                        baseUrl='/proveedores'
                        inputId='proveedor'
                        inputName='proveedor'
                        labelText='Proveedor'
                        value={proveedor}
                        handleChange={e => startSettingProvider(e.target.value)}
                        containerStyle='w-[80%] md:w-[30%]'
                        keyToGetData='proveedores'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombre'
                    />
                </div>
            </form>
        </div>
    )
}
