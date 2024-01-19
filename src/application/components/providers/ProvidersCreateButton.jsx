import { useRecordsStoreCreate, useUIStore } from '../../../hooks';
import { RoundedAddButton } from '../../ui';


const handleClick = (clearMessages, startOpenCreateModal) => {
    clearMessages();

    startOpenCreateModal();
}

export const ProvidersCreateButton = () => {
    const { clearMessages } = useRecordsStoreCreate();
    const { startOpenCreateModal } = useUIStore();

    return (
        <div className='p2'>
            <RoundedAddButton handleClick={() => handleClick(clearMessages, startOpenCreateModal)} />
        </div>
    )
}
