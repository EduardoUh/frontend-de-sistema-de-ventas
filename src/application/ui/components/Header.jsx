import { useUIStore, useAuthStore, useCreateSellingStore, useRecordsStorePagination, useCreatePurchaseStore } from '../../../hooks';


const handleClearStoreStates = (...clearFunctions) => {
    clearFunctions.map(fn => fn());
}

export const Header = () => {
    const { startSwitchNavbarState } = useUIStore();
    const { user, startLogout } = useAuthStore();
    const { startCleaningRecordsSlice } = useRecordsStorePagination();
    const { startClearSellingState } = useCreateSellingStore();
    const { startClearPurchaseState } = useCreatePurchaseStore();

    return (
        <header className="h-16 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 text-white font-bold text-lg flex justify-between">
            <div className="w-2/12 md:w-1/12 flex justify-center items-center">
                <button type="button" className="hover:scale-125" onClick={startSwitchNavbarState}>
                    <svg viewBox="0 0 24 24" className="w-full h-11 md:h-14" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M5 12H20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path>
                            <path d="M5 17H20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path>
                            <path d="M5 7H20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path>
                        </g>
                    </svg>
                </button>
            </div>
            <div className="w-8/12 md:w-10/12 flex justify-center items-center">
                <h1>
                    {user.sucursalNombre ? user.sucursalNombre : 'Habaneros palma'}
                </h1>
            </div>
            <div className="w-2/12 md:w-1/12 flex justify-center items-center">
                <button type="button" className="hover:scale-105" onClick={() => handleClearStoreStates(startLogout, startClearSellingState, startCleaningRecordsSlice, startClearPurchaseState)}>
                    <svg className='w-full h-10 md:h-12' xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke="#fff" viewBox="0 0 512 512">
                        <g id="SVGRepo_iconCarrier">
                            <defs>
                                <style>
                                    {".cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:20.48}"}
                                </style>
                            </defs>
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="E430_Logout_multimedia_Ui" data-name="E430, Logout, multimedia, Ui">
                                    <path d="M291.14 234.62H502M437.83 181.15 502 234.62l-64.17 53.48M10 459.25V10h321.31v449.25H230.9" className="cls-1" />
                                    <path d="M230.9 499.41 10 459.25V10l220.9 40.16v449.25z" className="cls-1" />
                                    <path d="M180.69 178.1 60.2 158.02v-50.2l120.49 20.08v50.2z" className="cls-1" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </header>
    )
}
