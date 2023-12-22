export const Card = ({ children, cardStyles = '' }) => {
    return (
        <div className={`border rounded-lg p-3 overflow-auto space-y-2 ${cardStyles}`}>
            {children}
        </div>
    )
}
