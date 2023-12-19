const severityTypes = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
}

export const Message = ({ severity = 'success', message = 'Default message', messageStyle = '' }) => {
    return (
        <div className={`mt-3 p-2 rounded-md ${severityTypes[severity] ? severityTypes[severity] : severityTypes.warning} text-white text-center font-bold ${messageStyle}`}>
            {message}
        </div>
    )
}
