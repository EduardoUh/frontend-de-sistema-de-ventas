import { usePagination } from '../../../hooks';
import { Message } from '../../../utilities';
import { PaginationBar } from '../';


const formatDataToBeUsedInPaginatedSelector = (keyToGetSelectValue = '', keyToGetSelectText = '', data = []) => {
    if (typeof keyToGetSelectValue !== 'string' || keyToGetSelectValue.trim().length === 0 ||
        typeof keyToGetSelectText !== 'string' || keyToGetSelectText.trim().length === 0 ||
        !Array.isArray(data) || data.length === 0) return [{ value: 'NoValue', text: 'Text Not Found' }];

    return data.map(dataItem =>
        (!dataItem[keyToGetSelectValue] || !dataItem[keyToGetSelectText]) ? { value: 'NoValue', text: 'Text Not Found' } :
            { value: dataItem[keyToGetSelectValue], text: dataItem[keyToGetSelectText] }
    );
}

export const PaginatedSelect = ({ baseUrl, keyToGetData = '', inputId = 'defaultSelectId', inputName = 'defaultSelectName', value = 'defaultSelectValue', handleChange = null, hasError = false, errorMessage = 'Error in the paginated input', severity = 'error', containerStyle = '', labelStyle = '', inputStyle = '', labelText = '', keyToGetSelectValue = '', keyToGetSelectText = '', isOptional = false }) => {
    const { data, page, error, isLoading, nextPage, previousPage } = usePagination(baseUrl);

    if (!handleChange || !(handleChange instanceof Function)) return (<Message message='handleChange function is required' severity='error' />);

    if (error.hasError || !data) return (<></>);

    return (
        <>
            <div className={`flex flex-col space-y-2 ${containerStyle.toLowerCase()}`}>
                <label htmlFor={inputId} className={`font-semibold ${labelStyle.toLowerCase()}`}>{labelText}:</label>
                {
                    data?.pagesCanBeGenerated > 1 &&
                    <PaginationBar currentPage={page} pagesCanBeGenerated={data.pagesCanBeGenerated} isLoading={isLoading} nextPage={nextPage} previousPage={previousPage} />
                }
                {
                    isOptional && <small className='text-blue-500'>El campo {labelText} es opcional</small>
                }
                <select id={inputId} name={inputName} value={value} onChange={handleChange} className={`rounded-md text-center border-2 border-gray-300 ${inputStyle.toLowerCase()}`}>
                    <option value="">--Seleccionar--</option>
                    {
                        data && !isLoading ?
                            formatDataToBeUsedInPaginatedSelector(keyToGetSelectValue, keyToGetSelectText, data[keyToGetData])?.map(option => (
                                <option key={option.value} value={option.value}>{option.text}</option>
                            ))
                            :
                            <>
                            </>
                    }
                </select>
            </div>
            {
                hasError && <Message message={errorMessage} severity={severity} />
            }
        </>
    )
}
