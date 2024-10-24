/*

var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
let resultArea = document.querySelector(".comment");

modalContent = document.querySelector(".modal-content");
modalText = document.querySelector("#modalText");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];


function calculate(){
 
  if(age.value=='' || height.value=='' || weight.value=='' || (male.checked==false && female.checked==false)){
    modal.style.display = "block";
    modalText.innerHTML = `All fields are required!`;

  }else{
    countBmi();
  }

}


function countBmi(){
  var p = [age.value, height.value, weight.value];
  if(male.checked){
    p.push("male");
  }else if(female.checked){
    p.push("female");
  }

  var bmi = Number(p[2])/(Number(p[1])/100*Number(p[1])/100);
      
  var result = '';
  if(bmi<18.5){
    result = 'Underweight';
     }else if(18.5<=bmi&&bmi<=24.9){
    result = 'Healthy';
     }else if(25<=bmi&&bmi<=29.9){
    result = 'Overweight';
     }else if(30<=bmi&&bmi<=34.9){
    result = 'Obese';
     }else if(35<=bmi){
    result = 'Extremely obese';
     }



resultArea.style.display = "block";
document.querySelector(".comment").innerHTML = `You are <span id="comment">${result}</span>`;
document.querySelector("#result").innerHTML = bmi.toFixed(2);

}





// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


*/

var height = document.getElementById("height");
var weight = document.getElementById("weight");
var form = document.getElementById("form");
let resultArea = document.querySelector(".comment");

modalContent = document.querySelector(".modal-content");
modalText = document.querySelector("#modalText");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// Prevent form submission and calculate BMI
form.addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the form from refreshing the page
  calculate();  // Call the calculate function
});

function calculate() {
  console.log("Calculate BMI button clicked");

  // Validate that height and weight are provided
  if (height.value == '' || weight.value == '') {
    modal.style.display = "block";
    modalText.innerHTML = `Height and weight are required!`;
    console.log("Validation failed: Height and weight are required.");
  } else {
    console.log("Validation passed: Sending request to API.");
    fetchBmi();  // Call the API
  }
}

function fetchBmi() {
  let heightValue = height.value;
  let weightValue = weight.value;

  // API request to calculate BMI
  fetch(`http://localhost:3000/?weight=${weightValue}&height=${heightValue}`)
    .then(response => {
      // Check if response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);  // Log the entire API response

      // Check if the API call was successful
      if (data.success) {
        let bmi = data.bmi;  // Access the BMI value
        let result = data.label;  // Access the category label

        // Display the result
        resultArea.style.display = "block";
        document.querySelector(".comment").innerHTML = `You are <span id="comment">${result}</span>`;
        document.querySelector("#result").innerHTML = `BMI: ${bmi.toFixed(2)}`;
      } else {
        // Handle the case where success is false
        modal.style.display = "block";
        modalText.innerHTML = `Error: ${data.message || 'Unexpected error'}`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      modal.style.display = "block";
      modalText.innerHTML = `There was an error processing your request.`;
    });
    span.onclick = function() {
      modal.style.display = "none";
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
