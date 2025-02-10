function getNestedValue(obj, key) {
    // Implement the function here
    // Use type guards to check if obj is an object and has the key
    // Use type assertion if necessary
    var keys = key.split('.');
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var k = keys_1[_i];
        if (obj === null || typeof obj !== 'object') {
            return undefined;
        }
        obj = obj[k];
    }
    return obj;
    //return keys.reduce((acc, k) => acc?.[k], obj);
}
// Test cases, do not modify
var testObj = { a: { b: { c: 42 } } };
console.log(getNestedValue(testObj, "a.b.c")); // Should print: 42
console.log(getNestedValue(testObj, "x.y.z")); // Should print: undefined
console.log(getNestedValue(null, "a.b.c")); // Should print: undefined
