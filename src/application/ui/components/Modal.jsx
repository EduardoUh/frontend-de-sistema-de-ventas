export const Modal = ({ children, showModal = false }) => {
    if (!showModal) return (<></>);
    return (
        <div className="fixed w-full h-screen bg-black bottom-0 left-0 bg-opacity-75 flex justify-center items-center">
            {children}
        </div>
    )
}
