import { useUIStore } from '../../../hooks';


export const Header = () => {
    const { startSwitchNavbarState } = useUIStore();

    return (
        <header className="h-[4rem] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 p-4 text-white font-bold text-lg">
            <button type="button" className="bg-white text-black" onClick={startSwitchNavbarState}>
                burger svg goes here!
            </button>
            Header
        </header>
    )
}
