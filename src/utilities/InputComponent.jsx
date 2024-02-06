import { Message } from './Message';


export const InputComponent = ({ value = '', pattern = '', patternExample = '', handleChange, hasError = false, errorMessage = 'Error in the form input', severity = 'error', labelText = 'Label', inputType = 'text', inputId = 'defaultId', inputName = 'defaultName', placeholder = 'defaultPlaceholder', selectOptions = [], containerStyle = '', labelStyle = '', inputStyle = '', isOptional = false, disabled = false, step = '0.01' }) => {
    return (
        <>
            <div className={`flex flex-col space-y-2 ${containerStyle.toLowerCase()}`}>
                <label htmlFor={inputId} className={`font-semibold ${labelStyle.toLowerCase()}`}>{labelText}: </label>
                {
                    isOptional && <small className='text-blue-500'>El campo {labelText} es opcional</small>
                }
                {
                    inputType.toLowerCase() === 'select' &&
                    (
                        <select id={inputId} name={inputName} onChange={handleChange} value={value} disabled={disabled} className={`rounded-md text-center border-2 border-gray-300 ${inputStyle.toLowerCase()}`}>
                            <option value="">--Seleccionar--</option>
                            {
                                selectOptions.map(option => (
                                    <option key={option.value} value={option?.value ? option?.value : "Default Value"}>{option?.text ? option?.text : "Default Text"}</option>
                                )
                                )
                            }
                        </select>
                    )
                }
                {
                    inputType.toLowerCase() === 'tel' && (
                        <>
                            <small>{patternExample}</small>
                            <input type={inputType.toLowerCase()} pattern={pattern} id={inputId} name={inputName} placeholder={placeholder} disabled={disabled} className={`rounded-md text-center border-2 border-gray-300 placeholder-gray-400 ${inputStyle.toLowerCase()}`} value={value} onChange={!!handleChange ? handleChange : ({ target }) => { console.log(`${target.name}: ${target.value}`) }} />
                        </>
                    )
                }
                {
                    inputType.toLowerCase() === 'number' && (
                        <input type={inputType.toLowerCase()} id={inputId} name={inputName} placeholder={placeholder} disabled={disabled} className={`rounded-md text-center border-2 border-gray-300 placeholder-gray-400 ${inputStyle.toLowerCase()}`} value={value} onChange={!!handleChange ? handleChange : ({ target }) => { console.log(`${target.name}: ${target.value}`) }} pattern='^(?:\d+)?(?:\.\d{1,2})?$' min='0' step={step} />
                    )
                }
                {
                    inputType.toLowerCase() !== 'select' && inputType.toLowerCase() !== 'tel' && inputType.toLowerCase() !== 'number' && (
                        <input type={inputType.toLowerCase()} id={inputId} name={inputName} placeholder={placeholder} disabled={disabled} className={`rounded-md text-center border-2 border-gray-300 placeholder-gray-400 ${inputStyle.toLowerCase()}`} value={value} onChange={!!handleChange ? handleChange : ({ target }) => { console.log(`${target.name}: ${target.value}`) }} />
                    )
                }
            </div>
            {
                hasError && <Message message={errorMessage} severity={severity} />
            }
        </>
    )
}
