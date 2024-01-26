import { useUIStore, useRecordsStoreCreate } from '../../../hooks';
import { RoundedAddButton } from '../../ui';


const handleClick = (clearMessages, startOpenCreateModal) => {
    clearMessages();

    startOpenCreateModal();
}

export const BranchesCreateButton = () => {
    const { clearMessages } = useRecordsStoreCreate();
    const { startOpenCreateModal } = useUIStore();

    return (
        <div className='p-2'>
            <RoundedAddButton
                handleClick={() => handleClick(clearMessages, startOpenCreateModal)}
            />
        </div>
    )
}
