import { useRecordsStoreCreate, useUIStore } from '../../../hooks';
import { RoundedAddButton } from '../../ui';


const handleClick = (clearMessages, startOpenCreateModal) => {
    clearMessages();

    startOpenCreateModal();
}

export const ProductTypesCreateButton = () => {
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
