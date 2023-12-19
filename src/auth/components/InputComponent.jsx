import { Message } from './Message';


export const InputComponent = ({ value = '', handleChange, hasError = false, errorMessage = 'Error in the form input', severity = 'error', labelText = 'Label', inputType = 'text', inputId = 'defaultId', inputName = 'defaultName', placeholder = 'defaultPlaceholder', containerStyle = '', labelStyle = '', inputStyle = '' }) => {
    return (
        <>
            <div className={`flex flex-col space-y-2 ${containerStyle}`}>
                <label htmlFor={inputId} className={`font-semibold ${labelStyle}`}>{labelText}: </label>
                <input type={inputType} id={inputId} name={inputName} placeholder={placeholder} className={`rounded-md text-center border-2 border-gray-300 placeholder-gray-400 ${inputStyle}`} value={value} onChange={!!handleChange ? handleChange : ({ target }) => { console.log(`${target.name}: ${target.value}`) }} />
            </div>
            {
                hasError && <Message message={errorMessage} severity={severity} />
            }
        </>
    )
}
