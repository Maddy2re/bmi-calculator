function calculateBMI() {
  let weight = parseFloat(document.getElementById("weight").value);
  let height = parseFloat(document.getElementById("height").value);
 
  const weightUnit = document.getElementById("weight-unit").value;
  const heightUnit = document.getElementById("height-unit").value;
  
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      document.getElementById("result").innerText = "Please enter valid positive numbers for weight and height!";
      document.getElementById('resultPopup').style.display = 'block';
      return;
  }

  if (weightUnit === "lb") {
      weight = convertPoundsToKg(weight);
  }

  if (heightUnit === "feet") {
      height = convertFeetToMeters(height);
  } else if (heightUnit === "cm") {
      height = convertCmToMeters(height); 
  }

  const bmi = (weight / (height * height)).toFixed(2);

  let bmiStatus = "";
  if (bmi < 18.5) {
      bmiStatus = "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
      bmiStatus = "Average (i.e You are of Normal Weight)";
  } else if (bmi >= 25 && bmi <= 29.9) {
      bmiStatus = "Overweight";
  } else {
      bmiStatus = "Obese";
  }

  document.getElementById("result").innerText = `Your BMI is ${bmi}. You are ${bmiStatus}.`;
  document.getElementById('resultPopup').style.display = 'block';
}

function convertPoundsToKg(pounds) {
  return pounds * 0.453592; 
}

function convertFeetToMeters(feet) {
  return feet * 0.3048; 
}

function convertCmToMeters(cm) {
  return cm / 100; 
}

function closePopup() {
  document.getElementById('resultPopup').style.display = 'none';
}
