import { useEffect } from 'react';
import { usePagination } from '../../../hooks';
import { PaginationBar } from './PaginationBar';
import { Message } from '../../../utilities';


export const PaginationContainer = ({ children, baseUrl = '', setAddFiltersFn, setData }) => {
    const { data, isLoading, error, page, nextPage, previousPage, addFiltersToUrl } = usePagination(baseUrl);

    useEffect(() => {
        setData(data);
    }, [data]);

    useEffect(() => {
        setAddFiltersFn(current => addFiltersToUrl);
    }, [data]);

    if (isLoading) return (<div className="text-center font-bold text-xl">Cargando...</div>);

    return (
        <>
            {data !== null && error.hasError === false ?
                (
                    <>
                        {children}
                        <PaginationBar currentPage={page} pagesCanBeGenerated={data.pagesCanBeGenerated} nextPage={nextPage} previousPage={previousPage} />
                    </>
                )
                :
                (
                    error.hasError === true && data === null && <div className="flex justify-center items-center"><Message message={error.errorMessage} severity='error' messageStyle='w-1/3' /></div>
                )
            }
        </>
    )
}
