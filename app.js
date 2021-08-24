// help from https://www.youtube.com/watch?v=MkHR2PAsy3I&t=152s
// this is my first time using js in a project so I needed a lot of help


const bill = document.getElementById('bill-value');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('inp-tip');
const people = document.getElementById('inp-people');
const errorMsg = document.querySelectorAll('.error-msg');
const results = document.querySelectorAll('.dollar-output');
const resetBtn = document.querySelector('.reset-btn');

let billValue = 0.0; //default
let tipValue = 0.15; //default
let peopleValue = 1; //default

bill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click',  handleClick);
});
tipCustom.addEventListener('input', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);

function validateFloat (s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt (s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue () {
    if (bill.value.includes(',')) {
        bill.value = bill.value.replace(',', '.');
    }

    if (!validateFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length - 1);
    }

    billValue = parseFloat(bill.value);

    calculateTip();
}

function handleClick () {
    tipBtns.forEach(btn => {
        //clear active state
        btn.classList.remove('btn-active');

        //set active state
        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML) / 100;
        }
    });

    tipCustom.value = '';
    
    calculateTip();
}

function setTipCustomValue () {
    if  (!validateInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
    }
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    tipValue = parseFloat(tipCustom.value / 100);

    if (tipCustom !== '') {
        calculateTip();
    }
}

function setPeopleValue () {
    if  (!validateInt(people.value)) {
        people.value = people.value.substring(0, people.value.length - 1);
    }

    peopleValue = parseFloat(people.value);

    if (peopleValue <= 0) {
        errorMsg.forEach(error => {
            error.classList.add('show-error-msg');

            setTimeout(() => {
            error.classList.remove('show-error-msg');
            }, 3000);
        });
    }

    calculateTip();
}

function calculateTip () {
    if (peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;

        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);

        activateReset()
    }
}

function reset () {
    bill.value = '0.0'
    setBillValue();

    tipBtns[2].click();

    people.value = '1';
    setPeopleValue();

    deActivateReset();
}

function activateReset () {
    resetBtn.classList.add('button-active');
}

function deActivateReset () {
    resetBtn.classList.remove('button-active');
    //this could probably be done in the activateReset function but idk how yet
}
