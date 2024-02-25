export const DisplayModules = ({ name = 'Default Name', modules = [] }) => {
    if (!Array.isArray(modules) || Array.isArray(modules) && modules.length === 0) return (<></>);
    return (
        <div>
            <span className="font-bold">{typeof name !== 'string' ? 'error in the name' : name}:</span>
            <p className='flex flex-wrap gap-2 p-1'>
                {
                    modules.map(module => (
                        <span key={module._id} className='border rounded-full px-2 text-sm'>{module.nombre}</span>
                    ))
                }
            </p>
        </div>
    )
}
