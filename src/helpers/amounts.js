export const calculateTotal = (items = []) => items.reduce((accumulated, current) => accumulated += (parseFloat(current.precio) * (/^(?:\d+)?(?:\.\d{1,2})?$/.test(parseFloat(current.cantidad)) ? parseFloat(current.cantidad) : 0)), 0);

export const validateIfAcceptFloatingPointNumbersOrNot = (e, acceptDecimals) => {
    if (acceptDecimals && !/^\d*$/.test(e.data) && e.data !== '.') {
        e.preventDefault();
    }
    if (!acceptDecimals && !/^\d*$/.test(e.data)) {
        e.preventDefault();
    }
}
