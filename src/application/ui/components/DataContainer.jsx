const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
}

export const DataContainer = ({ name = 'Default name', data = 'Default data', convertToDate = false }) => {
    const sanitizedData = typeof data !== 'string' && typeof data !== 'number' ? 'error in the data' : data;
    const newData = convertToDate && /^\d*$/.test(sanitizedData) ? new Date(Number(sanitizedData)).toLocaleDateString('es-MX', options) : sanitizedData;
    return (
        <p>
            <span className="font-bold">{typeof name !== 'string' ? 'error in the name' : name}:</span> {newData}
        </p>
    )
}
