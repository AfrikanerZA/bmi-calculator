let bmiResults = document.getElementById("bmiResults");
let bmiResultsMessage = document.getElementById("bmiResultsMessage");
let unitToggle = document.getElementsByName("unitToggle");
let metricUnit = document.getElementById("metricUnit");
let imperialUnit = document.getElementById("imperialUnit");
let nameInput = document.getElementById("nameInput");
let heightInput = document.getElementById("heightInput");
let weightInput = document.getElementById("weightInput");

let outputResults = 0;

function todayDate(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    return currentDate;
}

let userLog = {
    date : todayDate(),
    unit : "",
    name : "",
    bmiResults : "",
};



let userLogArray = [];

unitToggle = addEventListener("click", function(){
    let heightInputStyle = document.getElementById("heightInputStyle");
    let weightInputStyle = document.getElementById("weightInputStyle");

    if (metricUnit.checked === true) {
        heightInputStyle.innerHTML = "Height(cm):";
        weightInputStyle.innerHTML = "Weight(kg):";
        heightInput.placeholder = "165";
        weightInput.placeholder = "62";
    } else if (imperialUnit.checked === true) {
        heightInputStyle.innerHTML = "Height(in):";
        weightInputStyle.innerHTML = "Weight(lbs):";
        heightInput.placeholder = "64.96";
        weightInput.placeholder = "136.69";
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
    
    userLogArray.push({...userLog});

    console.log(userLog);
    console.log(userLogArray);

    if (userLog.bmiResults === "NaN") {
        bmiResults.innerHTML = "0.00";
        userLogArray.splice(userLogArray.length - 1, 1);
    } else {
        bmiResults.innerHTML = outputResults.toFixed(2);
        outputUserDetails();
        clearAfterSubmit();
    }
    
    bmiClassif();
}

function bmiClassif(){
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

function clearAfterSubmit(){
    nameInput.value = "";
    heightInput.value = "";
    weightInput.value = "";
    console.log("All input cleared after submit.");
}

function clearInput(){
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



let alignUserInfo = document.getElementById("alignUserInfo");
let showHiddenLog = true;

function displayUserLog(){
    let userLogBtn = document.getElementById("userLogBtn");
    let userLogDesign = document.getElementById("userLogDesign");
    let userLogLayout = document.getElementById("userLogLayout");
    let userLogBtnMobile = document.getElementById("userLogBtnMobile");

    if (showHiddenLog === true) {
        userLogDesign.classList.add("smoothDisplay");
        userLogLayout.classList.add("moveBtn");
        userLogBtn.classList.add("moveUserLogBtn");
        userLogBtnMobile.classList.add("mobileUserLogBtn");
        alignUserInfo.style.fontSize = "14px";
        alignUserInfo.style.display = "grid";
        showHiddenLog = false;
    } else {
        userLogDesign.classList.remove("smoothDisplay");
        userLogLayout.classList.remove("moveBtn");
        userLogBtn.classList.remove("moveUserLogBtn");
        userLogBtnMobile.classList.remove("mobileUserLogBtn");
        alignUserInfo.style.fontSize = "0px";
        alignUserInfo.style.display = "none";
        showHiddenLog = true;
    }
}

function outputUserDetails(){
    let span = document.createElement("span");

    if (userLogArray.length > 10) {
        userLogArray.splice(userLogArray.length - 1, 1);
        alert("User log is full. Please refresh/reload page.");
    } else {
        span.appendChild(document.createTextNode(`Name: ${userLog.name}`));
        span.appendChild(document.createElement("br"));
        span.appendChild(document.createTextNode(`Date: ${userLog.date}`));
        span.appendChild(document.createElement("br"));
        span.appendChild(document.createTextNode(`BMI: ${userLog.bmiResults}`));

        alignUserInfo.appendChild(span);
    }
}



let invalidInput = document.querySelectorAll(".invalidInput");
const invalidSymbol = ["e", "+", "-"];

for (let i = 0; i < invalidInput.length; i++) {
    invalidInput[i].addEventListener("keydown", function(e) {
        if (invalidSymbol.includes(e.key)) {
          e.preventDefault();
        }
    });
}
