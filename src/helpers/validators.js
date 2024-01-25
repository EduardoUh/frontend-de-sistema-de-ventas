export const emailValidator = (email = '') => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);

export const passwordValidation = (password = null) => password && password.trim().length >= 5;

export const stringValuesValidation = (value = null) => value && typeof value === 'string' && value.trim() !== '' && !/[<>]/.test(value);

export const booleanValuesValidation = (value = null) => String(value) == 'true' || String(value) == 'false';

export const modulesValidation = (modules = null) => {
    if (!Array.isArray(modules) || modules.length < 1) return false;

    for (const module of modules) {
        if (typeof module !== 'object' || Object.keys(module).length !== 4) return false;

        if (!module.nombre || typeof module.nombre !== 'string') return false;

        if (!module.componente || typeof module.componente !== 'string') return false;

        if (!module.ruta || typeof module.ruta !== 'string') return false;

        if (!module.permisos || !Array.isArray(module.permisos) || module.permisos.length < 1) return false;

        for (const permission of module.permisos) {
            if (typeof permission !== 'string') return false;
        }

        return true;
    }
};

export const floatingPointValuesValidation = (value = null) => value && /^(?:\d+)?(?:\.\d{1,2})?$/.test(value);
