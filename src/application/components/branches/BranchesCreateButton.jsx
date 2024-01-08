import { useUIStore } from '../../../hooks';


export const BranchesCreateButton = () => {
    const { createModalIsOpen, startOpenCreateModal } = useUIStore();

    return (
        <div className="p-2">
            <button
                className="rounded-3xl px-3 py-1 bg-gradient-to-br from-blue-500  to-purple-300 text-white font-bold text-3xl flex justify-center items-center transition hover:scale-110 hover:bg-indigo-700"
                onClick={() => startOpenCreateModal()}
            >
                +
            </button>
        </div>
    )
}
