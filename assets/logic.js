const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearing = document.querySelector('.clearing');
const equals = document.querySelector('.equals');
const calculationsDiv = document.querySelector('.calculations');
let memoryArr = [];

numbers.forEach( (item) => {
    item.addEventListener('click', (evt) => {

        if (!memoryArr.length || memoryArr.length === 2) {
            memoryArr.push(+evt.target.dataset.value);
            memoryArr[0] = +memoryArr[0];
        } else if (typeof memoryArr[memoryArr.length - 1] === 'number') {
            memoryArr[memoryArr.length - 1] = +(memoryArr[memoryArr.length - 1] + evt.target.dataset.value);
        } else {
            if (memoryArr[0] === '-') {
                memoryArr[0] = -evt.target.dataset.value;
            } else {
                memoryArr = [+evt.target.dataset.value];
            }
        }
        calculationsDiv.innerHTML = memoryArr.join(' ');
    })
})

function isOperator(op) {
    return op === '+' || op === '-' || op === '*' || op === '/';
}

operators.forEach( (item) => {
    item.addEventListener('click', (evt) => {
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
    calculationsDiv.innerHTML = '';
    memoryArr = [];
})

function getResult() {
    const result = showResult(memoryArr);
    if (result !== undefined) {
        memoryArr = [result.toString()];
        console.log(memoryArr);
        calculationsDiv.innerHTML = result;
        return 1;
    }
}

equals.addEventListener('click', getResult);


function showResult(arr) {
    if (arr.length === 1 || arr.length === 2) return arr[0];

    if (arr[1] == '+') return (arr[0] + arr[2]);
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

