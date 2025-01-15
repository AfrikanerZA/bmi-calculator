let bmiResults = document.getElementById("bmiResults");
let bmiResultsMessage = document.getElementById("bmiResultsMessage");
let unitToggle = document.getElementsByName("unitToggle");
let metricUnit = document.getElementById("metricUnit");
let imperialUnit = document.getElementById("imperialUnit");
let nameInput = document.getElementById("nameInput");
let heightInput = document.getElementById("heightInput");
let weightInput = document.getElementById("weightInput");

let outputResults = 0;

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

let userLog = {
    date : currentDate,
    unit : "",
    name : "",
    bmiResults : "",
}

unitToggle = addEventListener("click", function(){
    let heightInputStyle = document.getElementById("heightInputStyle");
    let weightInputStyle = document.getElementById("weightInputStyle");

    if (metricUnit.checked === true) {
        heightInputStyle.innerHTML = "Height(cm):";
        weightInputStyle.innerHTML = "Weight(kg):";
        heightInput.placeholder = "165";
        weightInput.placeholder = "62";
        console.log("Changed to metric unit.");
    } else if (imperialUnit.checked === true) {
        heightInputStyle.innerHTML = "Height(in):";
        weightInputStyle.innerHTML = "Weight(lbs):";
        heightInput.placeholder = "64.96";
        weightInput.placeholder = "136.69";
        console.log("Changed to imperial unit.");
    }
})

function calBMI() {
    let nameInputValue = nameInput.value;
    let heightInputValue = heightInput.value;
    let weightInputValue = weightInput.value;

    let weightCal = parseFloat(weightInputValue);
    let heightCal = parseFloat(heightInputValue);

    checkEmptyFields();

    if (metricUnit.checked === true) {
        heightCal /= 100; 
        outputResults = weightCal / (heightCal ** 2);
        userLog.unit = "Metric";
    } else if (imperialUnit.checked === true) {
        outputResults = (weightCal / (heightCal ** 2)) * 703;
        userLog.unit = "Imperial";
    }

    userLog.name = nameInputValue;
    userLog.bmiResults = outputResults.toFixed(2);
    console.log(userLog)

    if (userLog.bmiResults === "NaN") {
        bmiResults.innerHTML = "0.00";
    } else {
        bmiResults.innerHTML = outputResults.toFixed(2);
    }
    
    bmiClassif();
}

function bmiClassif() {
    if (userLog.bmiResults === "NaN") {
        bmiResultsMessage.innerHTML = "Normal";
    } else if (outputResults <= 18.5) {
        bmiResultsMessage.innerHTML = "Underweight";
    } else if (outputResults <= 24.9) {
        bmiResultsMessage.innerHTML = "Normal";
    } else if (outputResults <= 29.9) {
        bmiResultsMessage.innerHTML = "Overweight";
    } else {
        bmiResultsMessage.innerHTML = "Obesity";
    }
}

function clearLog(){
    nameInput.value = "";
    heightInput.value = "";
    weightInput.value = "";
    bmiResults.innerHTML = "0.00";
    bmiResultsMessage.innerHTML = "Normal";
    console.log("All input and output cleared.");
}

function checkEmptyFields(){
    if (nameInput.value === "") {
        alert ("Please enter your name");
    } else if (heightInput.value === "") {
        alert ("Please enter your height");
    } else if (weightInput.value === "") {
        alert ("Please enter your weight")
    }
}