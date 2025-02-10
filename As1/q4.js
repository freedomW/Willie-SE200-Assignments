function mathOperation(a, b, operation) {
    return operation(a, b);
}
// Implement add, subtract, and multiply functions
var add = function (a, b) { return a + b; };
var subtract = function (a, b) { return a - b; };
var multiply = function (a, b) { return a * b; };
// Test cases, do not modify
console.log(mathOperation(5, 3, add)); // Output: 8
console.log(mathOperation(10, 4, subtract)); // Output: 6
console.log(mathOperation(3, 7, multiply)); // Output: 21
