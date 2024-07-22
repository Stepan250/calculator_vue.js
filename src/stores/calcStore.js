import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCalculatorStore = defineStore('calculatorStore', () => {
    const input = ref('');
    const result = ref('');
    const history = ref(JSON.parse(localStorage.getItem('history')) || []);

    const buttons = ['7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '=', '/'];

    const clickButton = (button) => {
        if (button !== '=') {
            if (button === 'X') {
                input.value += '*';
            } else {
                input.value += button;
            }
        } else {
            const res = calculate(input.value);
            const date = new Date().toLocaleString();
            history.value.push(`${input.value}=${res} (${date})`);
            localStorage.setItem('history', JSON.stringify(history.value));
            result.value = res;
            input.value = '';
        }
    };

    const calculate = (expression) => {
        const operators = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b
        };

        const operatorPrecedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };

        const outputQueue = [];
        const operatorStack = [];

        const tokens = expression.split(/([+\-*/])/).filter(token => token.trim() !== '');

        tokens.forEach(token => {
            if (!isNaN(token)) {
                outputQueue.push(parseFloat(token));
            } else if (token in operators) {
                while (operatorStack.length &&
                operatorPrecedence[operatorStack[operatorStack.length - 1]] >= operatorPrecedence[token]) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            }
        });

        while (operatorStack.length) {
            outputQueue.push(operatorStack.pop());
        }

        const stack = [];
        outputQueue.forEach(token => {
            if (typeof token === 'number') {
                stack.push(token);
            } else if (token in operators) {
                const b = stack.pop();
                const a = stack.pop();
                stack.push(operators[token](a, b));
            }
        });

        return stack.pop().toString();
    };

    return {
        buttons,
        input,
        result,
        history,
        clickButton,
    };
});
