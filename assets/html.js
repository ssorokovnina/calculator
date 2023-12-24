import btnsArr from "./buttons.js";

function createHTML() {
    const container = document.getElementById('container');

    const mainForm = document.createElement('div');
    mainForm.setAttribute('class', 'main-form');
    container.append(mainForm);

    const calculationsDiv = document.createElement('div');
    calculationsDiv.setAttribute('class', 'calculations');
    mainForm.append(calculationsDiv);


    const keyboardDiv = document.createElement('div');
    keyboardDiv.setAttribute('class', 'keyboard');
    mainForm.append(keyboardDiv);

    for (let obj of btnsArr) {
        const btn = document.createElement('button');

        btn.setAttribute('class', 'button');
        btn.setAttribute('data-value', obj['value']);
        btn.classList.add(obj['class']);
        btn.innerHTML = obj['name'];

        keyboardDiv.append(btn);
    }
}

createHTML();

// export default createHTML;
