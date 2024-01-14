import { useEffect } from 'react';
import { useRecordsStorePaginationHooks, useRecordsStorePagination } from '../../hooks';
import { UsersPagination, } from '../components/users';


const baseUrl = '/usuarios';

const keyToGetCollectionOfData = 'usuarios';

export const Users = ({ permissions, name }) => {
    const { startCleaningRecordsSlice, startSettingComponentName, setBaseUrl, setTheKeyToGetCollectionOfData } = useRecordsStorePagination();

    useEffect(() => {
        startCleaningRecordsSlice();
        startSettingComponentName(name);
        setBaseUrl(baseUrl);
        setTheKeyToGetCollectionOfData(keyToGetCollectionOfData);
    }, []);

    useRecordsStorePaginationHooks(name);

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            <UsersPagination permissions={permissions} />
        </div>
    )
}
