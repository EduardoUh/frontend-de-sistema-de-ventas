import { useRecordsStorePaginationHooks } from '../../hooks';
import { BranchesPagination, BranchesUpdateForm, BranchesCreateButton, BranchesCreateForm, BranchesFilters } from '../components/branches';


const baseUrl = '/sucursales';

const keyToGetCollectionOfData = 'sucursales';

export const Branches = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetCollectionOfData);

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

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
                    <>
                        <BranchesFilters baseUrl={baseUrl} />
                        <BranchesPagination permissions={permissions} name={name} />
                    </>
                )
            }
            <BranchesUpdateForm baseUrl={baseUrl} />
            <BranchesCreateForm baseUrl={baseUrl} />
        </div >
    )
}
