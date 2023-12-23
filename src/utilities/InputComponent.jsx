import { Message } from './Message';


export const InputComponent = ({ value = '', handleChange, hasError = false, errorMessage = 'Error in the form input', severity = 'error', labelText = 'Label', inputType = 'text', inputId = 'defaultId', inputName = 'defaultName', placeholder = 'defaultPlaceholder', selectOptions = [], containerStyle = '', labelStyle = '', inputStyle = '' }) => {
    return (
        <>
            <div className={`flex flex-col space-y-2 ${containerStyle.toLowerCase()}`}>
                <label htmlFor={inputId} className={`font-semibold ${labelStyle.toLowerCase()}`}>{labelText}: </label>
                {
                    inputType.toLowerCase() === 'select' ?
                        (
                            <select id={inputId} name={inputName} onChange={handleChange} value={value} className={`rounded-md text-center border-2 border-gray-300 ${inputStyle.toLowerCase()}`}>
                                <option value="">--Seleccionar--</option>
                                {
                                    selectOptions.map(option => (
                                        <option key={option.value} value={option?.value ? option?.value : "Default Value"}>{option?.text ? option?.text : "Default Text"}</option>
                                    )
                                    )
                                }
                            </select>
                        )
                        :
                        (
                            <input type={inputType.toLowerCase()} id={inputId} name={inputName} placeholder={placeholder} className={`rounded-md text-center border-2 border-gray-300 placeholder-gray-400 ${inputStyle.toLowerCase()}`} value={value} onChange={!!handleChange ? handleChange : ({ target }) => { console.log(`${target.name}: ${target.value}`) }} />
                        )
                }
            </div>
            {
                hasError && <Message message={errorMessage} severity={severity} />
            }
        </>
    )
}
