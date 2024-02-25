import { useAuthStore } from './';
import { modules } from '../application/utilities/modules';

export const useModules = () => {
    const { user } = useAuthStore();

    const modulesComponentsCollection = user.modulos.map(modulo => modules[modulo.componente]);

    return {
        modulesComponentsCollection,
        modulesCollection: user.modulos
    }
}
