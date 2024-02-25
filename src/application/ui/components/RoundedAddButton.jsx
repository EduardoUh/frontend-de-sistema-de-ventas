import { Message } from "../../../utilities";


export const RoundedAddButton = ({ handleClick = null, buttonStyles = '' }) => {
    if (!handleClick || !(handleClick instanceof Function)) return (<Message message='handleClick function is required' severity='error' />);

    return (
        <button
            className={`rounded-3xl px-3 py-1 bg-gradient-to-br from-blue-500  to-purple-300 text-white font-bold text-3xl flex justify-center items-center transition hover:scale-110 hover:bg-indigo-700 ${buttonStyles.trim()}`}
            type='button'
            onClick={handleClick}
        >
            +
        </button >
    )
}
