class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear () {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber (number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    choseOperation (operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute () {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return

        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                console.log('invalid operation')
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber (number) {
        const stringNum = number.toString()
        const intDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]

        let intDisplay

        if (isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if (decimalDigits != null) {
            return intDisplay + '.' + decimalDigits 
        } else {
            return intDisplay
        }
    }

    updateDisplay () {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) + ' ' + this.operation
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const clearBtn = document.querySelector('[data-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerHTML)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.choseOperation(btn.innerHTML)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})