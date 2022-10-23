const container = document.querySelector('.input');
const input = document.getElementById('input');
const back = document.getElementById('back-word');
let backWord = [];
let value = '';


const createButtons = (content, addClass, action, title) => {
    const button = document.createElement('button');
    button.innerHTML = content;
    button.classList = addClass;
    button.setAttribute('title', title);
    container.appendChild(button);

    button.addEventListener('click', function () {
        if (action === 'C') {
            input.value = '';
        } else if (action === '<<') {
            input.value = value.slice(0, value.length - 1);
        } else if (content === '+/-') {
            let v = value.split(' ');
            const n = -(v.splice(-1, 1));
            v = `${v.join(' ')} ${n}`;
            input.value = v;
        } else if (action === '=') {
            let v = value.split(' ');
            let result = 0;
            for (let i = 0; i < v.length; i++) {
                if (v[i] === '/') {
                    result /= +v[i + 1];
                    i++; 
                } else if (v[i] === 'x') {
                    result *= +v[i + 1];
                    i++; 
                } else if (v[i] === '-') {
                    result -= +v[i + 1];
                    i++; 
                } else if (v[i] === '+') {
                    result += +v[i + 1];
                    i++;
                } else if (v[i] === '%') {
                    result = result / 100;
                } else if (v[i] === '**') {
                    result = Math.pow(result, v[i + 1]);
                    i++;
                } else if (v[i] === '//') {
                    result = Math.sqrt(result);
                }
                else {
                    result += +v[i];
                }
            }
            input.value = result;
            backWord.push(result);
            if (backWord.length > 3) backWord.shift();
            sessionStorage.setItem('operationV', JSON.stringify(backWord));
        } else if (action !== '=' || action !== '<<' || content !== '+/-' || action !== 'C') {
            input.value = value + action;
        }
        value = input.value;
    });
}

const buttons = [
    {content: '<i class="fa-solid fa-c"></i>', class: '', action: 'C', title: 'del-all'},
    {content: '<i class="fa-solid fa-delete-left"></i>', class: '', action: '<<', title: 'del-left'},
    {content: '/', class: '', action: ' / ', title: 'division'},
    {content: '%', class: '', action: ' %', title: 'percentage'},
    {content: '**', class: '', action: ' ** ', title: 'square'},
    {content: '//', class: '', action: ' // ', title: 'sqrt'},
    {content: 'x', class: '', action: ' x ', title: 'multiple'},
    {content: '7', class: '', action: '7', title: 'num 7'},
    {content: '8', class: '', action: '8', title: 'num 8'},
    {content: '9', class: '', action: '9', title: 'num 9'},
    {content: '-', class: '', action: ' - ', title: 'subtract'},
    {content: '4', class: '', action: '4', title: 'num 4'},
    {content: '5', class: '', action: '5', title: 'num 5'},
    {content: '6', class: '', action: '6', title: 'num 6'},
    {content: '+', class: '', action: ' + ', title: 'addition'},
    {content: '1', class: '', action: '1', title: 'num 1'},
    {content: '2', class: '', action: '2', title: 'num 2'},
    {content: '3', class: '', action: '3', title: 'num 3'},
    {content: '<i class="fa-solid fa-equals"></i>', class: '', action: '=', title: 'equal'},
    {content: '+/-', class: '', action: '', title: 'change status'},
    {content: '0', class: '', action: '0', title: 'zero'},
    {content: '.', class: '', action: '.', title: 'point'},
];


buttons.forEach( b => { createButtons(b.content, b.class, b.action, b.title) });

back.addEventListener('click', () => {
    let storage = JSON.parse(sessionStorage.getItem('operationV'));
    const num = storage.pop();
    input.value = num;
    value = input.value;
    storage.unshift(num);
    sessionStorage.setItem('operationV', JSON.stringify(storage));
});

