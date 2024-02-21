class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // clear variables
    clear() {
        //remove all values
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // removing single number
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1); // chop off the last digit
    }

    // add number to screen everytime user clicks on it
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) // allow user to add period only once
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString(); //convert to string 
    }

    // choose operation
    chooseOperation(operation) {
        if (this.currentOperand === '') return //if current op is an empty string, dont let execute further
        if (this.previousOperand !== '') {
            this.compute(); //if we have something computed, we need to do the computation
        }
        this.operation = operation; //so calculator knows what operation
        this.previousOperand = this.currentOperand; // update the current op
        this.currentOperand = ''; //clear out value
    }

    // take values in calculator and display
    compute() {

        let result;
        const prev = parseFloat(this.previousOperand); //actual number version of prev operand
        const current = parseFloat(this.currentOperand); //actual number version of current operand

        if (isNaN(prev) || isNaN(current)) return; // if no prev or current value and user hits equal

        switch (this.operation) {

            case '+':
                result = prev + current;
                break; // exit switch statement

            case '×':
                result = prev * current;
                break; // exit switch statement

            case '÷':
                result = prev / current;
                break; // exit switch statement

            case '-':
                result = prev - current;
                break; // exit switch statement

            default: //else, if none of the above values are executed
                return;

        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';

    } //compute()

    //used a getter so that any changes made in prev/current operand values 
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]); //split number according to decimal
        const decimalDigits = stringNumber.split('.')[1]; //split number according to decimal
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        //check if any decimal digits
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else
            return integerDisplay;

    } //getDisplayNumber(number)

    // update values inside output
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            //display prev operand text element
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else //empty out prev operand value
            this.previousOperandTextElement.innerText = '';
    } //updateDisplay()

} //class


// CONSTANTS
const numberButtons = document.querySelectorAll('[data-number]'); // get all number buttons
const operationButtons = document.querySelectorAll('[data-operator]'); // get all number buttons
const equalsButton = document.querySelector('[data-equals]'); // get the button "="
const deleteButton = document.querySelector('[data-delete]'); // get the delete
const ACButton = document.querySelector('[data-AC]'); // get the button "="
const previousOperandTextElement = document.querySelector('[data-previous-operand]'); // get data prev operand
const currentOperandTextElement = document.querySelector('[data-current-operand]'); // get data current operand

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay(); //constantly updated everytime we click
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay(); //constantly updated everytime we click
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

ACButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})