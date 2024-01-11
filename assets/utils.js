export function factorial(x) {
    if (x > 170) return alert('Number is too big');

    if (!x || (x === 1)) return 1;

    if (x < 0) {
        return -(factorial(-x));
    }

    return x * factorial(x - 1);
}

function pow(x, y) {
    return Math.pow(x, y);
}

export function sqrt(x) {
    if (x >= 0) return Math.sqrt(x);

    alert('Invalid format used');
}