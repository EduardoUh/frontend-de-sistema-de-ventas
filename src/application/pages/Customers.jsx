import { useRecordsStorePaginationHooks, useUIStore } from '../../hooks';
import { CustomersPagination, CustomersFilters, CustomersUpdateForm, BranchesCreateButton, CustomersCreateForm } from '../components/customers';


const baseUrl = '/clientes';

const ketToGetData = 'clientes';

export const Customers = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, ketToGetData);
    const { createModalIsOpen, updateModalIsOpen } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'CREAR') &&
                <BranchesCreateButton />
            }
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <CustomersFilters baseUrl={baseUrl} />
                    <CustomersPagination permissions={permissions} name={name} />
                </>
            }
            {
                createModalIsOpen && <CustomersCreateForm baseUrl={baseUrl} />
            }
            {
                updateModalIsOpen && <CustomersUpdateForm baseUrl={baseUrl} />
            }
        </div>
    )
}
