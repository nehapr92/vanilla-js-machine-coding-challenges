class Calculator {
    constructor(initialValue = 0) {
        this.value = initialValue;
    }

    add(amount) {
        this.value += amount;
        return this; // Enable method chaining
    }

    subtract(amount) {
        this.value -= amount;
        return this; // Enable method chaining
    }

    multiply(factor) {
        this.value *= factor;
        return this; // Enable method chaining
    }

    getValue() {
        return this.value;
    }
}

// this will return same instance of the Calculator, will allow method chaining
const calculator = new Calculator(2);
console.log(calculator.add(3).multiply(4).subtract(5).getValue());