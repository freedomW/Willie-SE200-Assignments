// Create the printElectricCarInfo function
function printElectricCarInfo(car) {
    console.log("Make: ".concat(car.make, ", Model: ").concat(car.model, ", Battery Life: ").concat(car.batteryLife, " miles"));
}
// Test case, do not modify
var teslaModelS = {
    make: "Tesla",
    model: "Model S",
    batteryLife: 400
};
printElectricCarInfo(teslaModelS); // "Make: Tesla, Model: Model S, Battery Life: 400 miles" 
