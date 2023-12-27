import { useEffect } from 'react';
import { usePagination } from '../../../hooks';
import { PaginationBar } from './PaginationBar';
import { Message } from '../../../utilities';


export const PaginationContainer = ({ children, baseUrl = '', setAddFiltersFn, setData }) => {
    const { data, error, page, nextPage, previousPage, addFiltersToUrl } = usePagination(baseUrl);

    useEffect(() => {
        setData(data);
    }, [data]);

    useEffect(() => {
        setAddFiltersFn(current => addFiltersToUrl);
    }, [data]);

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
                    error.hasError === true && data === null && <Message message={error.errorMessage} severity='error' />
                )
            }
        </>
    )
}
