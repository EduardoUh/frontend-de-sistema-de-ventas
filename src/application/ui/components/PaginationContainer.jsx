import { PaginationBar } from './PaginationBar';
import { Message } from '../../../utilities';


export const PaginationContainer = ({ children, data, isLoading, error, page, pagesCanBeGenerated, nextPage, previousPage }) => {
    if (isLoading) return (<div className="text-center font-bold text-xl">Cargando...</div>);

    return (
        <>
            {error.hasError === false && data.length > 0 ?
                (
                    <>
                        {children}
                        <PaginationBar currentPage={page} pagesCanBeGenerated={pagesCanBeGenerated} nextPage={nextPage} previousPage={previousPage} />
                    </>
                )
                :
                (
                    error.hasError === true && data.length < 1 && <div className="flex justify-center items-center"><Message message={error.errorMessage} severity='error' messageStyle='sm:w-1/3' /></div>
                )
            }
        </>
    )
}
