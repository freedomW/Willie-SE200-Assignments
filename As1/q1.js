// ASSIGNMENT 1
// Question 1:
// Implement the processInput function
function processInput(input) {
    // Check if input is a number
    switch (typeof input) {
        case 'number':
            return Math.pow(input, 2);
        case 'string':
            return input + input;
        default:
            return "Invalid input";
    }
}
// Test cases, do not modify
console.log(processInput(5));
console.log(processInput("hello"));
// Question 2:
// Question 3:
// Question 4:
// Question 5:
