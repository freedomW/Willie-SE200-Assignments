// Create a function calculateArea that takes a Shape as a parameter and returns its area
function calculateArea(shape) {
    if (shape.kind === "circle") {
        return Math.PI * Math.pow(shape.radius, 2);
    }
    else {
        return shape.width * shape.height;
    }
}
// Test cases, do not modify
var circle = { kind: "circle", radius: 5 };
var rectangle = { kind: "rectangle", width: 4, height: 6 };
console.log(calculateArea(circle));
console.log(calculateArea(rectangle));
