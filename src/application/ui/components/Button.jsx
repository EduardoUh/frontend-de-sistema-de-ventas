const buttonTypes = {
    button: 'button',
    reset: 'reset',
    submit: 'submit'
}

export const Button = ({ text = '', handleClick = null, type = 'submit', buttonSyles = '' }) => {

    return (
        <>
            {
                handleClick !== null ?
                    (
                        <button
                            className={`rounded-md bg-gradient-to-br from-blue-500  to-purple-300 p-2 text-white font-bold ${buttonSyles} hover:from-blue-700 hover:to-purple-700 active:from-blue-300 active:to-purple-300`}
                            onClick={handleClick}
                            type={buttonTypes[type] ? buttonTypes[type] : buttonTypes.button}
                        >
                            {text ? text : 'Default text'}
                        </button>
                    )
                    :
                    (
                        <button
                            className={`rounded-md bg-gradient-to-br from-blue-500  to-purple-300 p-2 text-white font-bold ${buttonSyles} hover:from-blue-700 hover:to-purple-700 active:from-blue-300 active:to-purple-300`}
                            type={buttonTypes[type] ? buttonTypes[type] : buttonTypes.button}
                        >
                            {text ? text : 'Default text'}
                        </button>
                    )
            }
        </>
    )
}
