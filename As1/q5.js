function getNestedValue(obj, key) {
    // Implement the function here
    // Use type guards to check if obj is an object and has the key
    // Use type assertion if necessary
    var keys = key.split('.');
    return keys.reduce(function (acc, k) { return acc === null || acc === void 0 ? void 0 : acc[k]; }, obj);
}
// Test cases, do not modify
var testObj = { a: { b: { c: 42 } } };
console.log(getNestedValue(testObj, "a.b.c")); // Should print: 42
console.log(getNestedValue(testObj, "x.y.z")); // Should print: undefined
console.log(getNestedValue(null, "a.b.c")); // Should print: undefined
