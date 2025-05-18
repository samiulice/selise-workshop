
        const operationDisplay = document.querySelector('.operation-display');
        const currentDisplay = document.querySelector('.current-display');
        let currentValue = '0';
        let firstOperand = null;
        let operator = null;
        let waitingForSecondOperand = false;

        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => handleNumber(button.textContent));
        });

        document.querySelectorAll('.operator').forEach(button => {
            if(button.textContent !== '=') {
                button.addEventListener('click', () => handleOperator(button.textContent));
            }
        });

        document.querySelector('.equals').addEventListener('click', handleEquals);
        document.querySelector('.clear').addEventListener('click', clear);
        document.querySelector('.percent').addEventListener('click', handlePercent);
        document.querySelector('.sign').addEventListener('click', toggleSign);

        function handleNumber(num) {
            if(waitingForSecondOperand) {
                currentValue = num;
                waitingForSecondOperand = false;
            } else {
                currentValue = currentValue === '0' ? num : currentValue + num;
            }
            currentDisplay.textContent = currentValue;
        }

        function handleOperator(op) {
            const inputValue = parseFloat(currentValue);
            
            if(operator && waitingForSecondOperand) {
                operator = op;
                updateOperationDisplay();
                return;
            }
            
            if(firstOperand === null) {
                firstOperand = inputValue;
            } else if(operator) {
                const result = calculate(firstOperand, inputValue, operator);
                currentValue = String(result);
                firstOperand = result;
                currentDisplay.textContent = currentValue;
            }
            
            operator = op;
            waitingForSecondOperand = true;
            updateOperationDisplay();
        }

        function handleEquals() {
            if(operator === null || waitingForSecondOperand) return;
            
            const inputValue = parseFloat(currentValue);
            const result = calculate(firstOperand, inputValue, operator);
            
            operationDisplay.textContent = '';
            currentValue = String(result);
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            currentDisplay.textContent = currentValue;
        }

        function calculate(first, second, operator) {
            switch(operator) {
                case '+': return first + second;
                case '-': return first - second;
                case '×': return first * second;
                case '÷': return second === 0 ? 'Undefined' : first / second;
                default: return second;
            }
        }

        function clear() {
            currentValue = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            operationDisplay.textContent = '';
            currentDisplay.textContent = '0';
        }

        function handlePercent() {
            const value = parseFloat(currentValue);
            currentValue = String(value / 100);
            currentDisplay.textContent = currentValue;
        }

        function toggleSign() {
            currentValue = String(parseFloat(currentValue) * -1);
            currentDisplay.textContent = currentValue;
        }

        function updateOperationDisplay() {
            operationDisplay.textContent = 
                `${firstOperand || ''} ${operator || ''}`;
        }