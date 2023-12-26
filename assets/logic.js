import { factorial } from './utils.js';

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearing = document.querySelector('.clearing');
const equals = document.querySelector('.equals');
const functions = document.querySelectorAll('.function');
const dot = document.querySelector('.dot');
const calculationsDiv = document.querySelector('.calculations');
let memoryArr = [];
let isEquals = false;

numbers.forEach( (number) => {
    number.addEventListener('click', (evt) => {

        if (!memoryArr.length || memoryArr.length === 2) {

            memoryArr.push(+evt.target.dataset.value);
            memoryArr[0] = +memoryArr[0];

        } else if (typeof memoryArr[memoryArr.length - 1] === 'number') {

            memoryArr[memoryArr.length - 1] = +(memoryArr[memoryArr.length - 1] + evt.target.dataset.value);

        } else if (!isInt(memoryArr[memoryArr.length - 1])) {
            if (isEquals) {
                memoryArr = [+evt.target.dataset.value];
                isEquals = false;
            } else {
                memoryArr[memoryArr.length - 1] += evt.target.dataset.value;
            }
        } else {
            if (memoryArr[0] === '-') {
                memoryArr[0] = -evt.target.dataset.value;
            } else {
                memoryArr = [+evt.target.dataset.value];
                isEquals = false;
            }
        }
        calculationsDiv.innerHTML = memoryArr.join(' ');
    })
})

function isOperator(op) {
    return op === '+' || op === '-' || op === '*' || op === '/';
}

operators.forEach( (op) => {
    op.addEventListener('click', (evt) => {
        isEquals = false;

        if (!memoryArr.length) {

            if (evt.target.dataset.value === '-') {
                memoryArr.push('-');
            } else {
                alert('Invalid format used');
            }

        } else if (memoryArr.length === 3) {

            if (getResult()) {
                memoryArr[0] = +memoryArr[0];
                memoryArr.push(evt.target.dataset.value);
            }

        } else if (!isOperator(memoryArr[memoryArr.length - 1])) {

            memoryArr.push(evt.target.dataset.value);

        } else {

            memoryArr[memoryArr.length - 1] = evt.target.dataset.value;

        }
        calculationsDiv.innerHTML = memoryArr.join(' ');
    })
})

clearing.addEventListener('click', (evt) => {
    isEquals = false;
    calculationsDiv.innerHTML = '';
    memoryArr = [];
})

function getResult(isEqual = false) {
    const result = showResult(memoryArr);

    if (result !== undefined) {
        memoryArr = [result.toString()];
        isEquals = isEqual;
        calculationsDiv.innerHTML = result;
        return 1;
    }
}

equals.addEventListener('click', () => {
    getResult(true);
});


function showResult(arr) {
    if (arr.length === 1 || arr.length === 2) return arr[0];

    if (arr[1] == '+') return (arr[0] + +arr[2]);
    if (arr[1] == '-') return (arr[0] - arr[2]);
    if (arr[1] == '*') return (arr[0] * arr[2]);

    if (arr[1] == '/') {

        if (arr[2] === 0) {
            alert("Can't divide by zero");
        } else {
            return (arr[0] / arr[2]);
        }

    }
}

functions.forEach( (func) => {
    func.addEventListener('click', (evt) => {

        if (evt.target.dataset.value === 'factorial') {

            if (!memoryArr.length || !isInt(memoryArr[memoryArr.length - 1]) && memoryArr[memoryArr.length - 1].at(-1) !== '.') {
                alert('Invalid format used');
            } else {
                const res = factorial(+memoryArr[memoryArr.length - 1]);

                if (res !== undefined) memoryArr[memoryArr.length - 1] = res.toString();

                calculationsDiv.innerHTML = memoryArr.join(' ');
            }

        }
        // if (evt.target.dataset.value === 'sqrt') {

        // }
    })
})

function isInt(number) {
    if (typeof number === 'number') return number % 1 === 0 ? true : false;

    return number.includes('.') ? false : true;
}

dot.addEventListener('click', (evt) => {

    if (!memoryArr.length || memoryArr.length === 2) {
        memoryArr.push('0.');
    } else if (!isOperator(memoryArr[memoryArr.length - 1]) && isInt(memoryArr[memoryArr.length - 1]) && !isEquals) {
        memoryArr[memoryArr.length - 1] += evt.target.dataset.value;
    } else if (isEquals) {
        isEquals = false;
        memoryArr = ['0.'];
    }
    calculationsDiv.innerHTML = memoryArr.join(' ');
})
