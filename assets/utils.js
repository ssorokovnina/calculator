export function factorial(x) {
    if (!x || x === 1) return 1;

    if (x < 0) {
        return -(factorial(-x));
    }

    return x * factorial(x - 1);
}

function pow(x, y) {
    return Math.pow(x, y);
}

function sqrt(x) {
    return Math.sqrt(x);
}