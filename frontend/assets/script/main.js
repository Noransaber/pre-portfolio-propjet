// Workin on index.html button to make them functional, starting with landing buttons, about section buttons, then footer links
// * Langing section *
// When they click Join now it shouldshow the sign-up Form
if (document.getElementById("home")) {
  // Have the button JoinNow
var JoinNow = document.querySelector(".joinNow")
// Make an even, When we click on the button
  JoinNow.addEventListener("click", function () {
  // It render the signup.html page
  location.href = "signup.html"
  })
  
// When click on log in button it shows the log in form
// 1. We should have the button
var login = document.querySelector(".login")

// 2. Add Event when we clikck it redirect us to the log in form
  login.addEventListener("click", function () {
    location.href = "login.html"
  
  })
  
// * About section *

// When they click README in about section it should show the about us page
var aboutBtn = document.querySelector(".about-btn")
// Make an even, When we click on the button
aboutBtn.addEventListener("click", function () {
  // it changes the page to the about-us page
  location.href = "about.html"
})
}

// --------------------------------------------------------------------------------------------
// Funtion adjust the curson in sign up and log in form
function adjustingCursorInForm() {
  // Select the cursor
  var cursor = document.querySelector(".mymouse")
  document.body.addEventListener("mousemove", function (e) {
    // Set the left position of the 'cursor' element to the X coordinate of the mouse.
    cursor.style.left = e.clientX + "px";
    // Set the top position of the 'cursor' element to the Y coordinate of the mouse.
    cursor.style.top = e.clientY + "px";
  });
  
  /* *change mouse color* */
  var cont = document.querySelector('.fr');
  cont.addEventListener("mouseover", function(){
    cursor.setAttribute("style", "outline:white solid")
  })
  var cont = document.querySelector('.form-container');
  cont.addEventListener("mouseout", function(){
    cursor.setAttribute("style", "outline:black solid")
  });
  // This adds some nice ellipsis to the description:
  document.querySelectorAll(".projcard-description").forEach(function(box) {
      $clamp(box, {clamp: 6});
  });
}
// *SignUp Form Code*
if (document.getElementById("signup")) {
  adjustingCursorInForm()
}
// *Login Form Code*
if (document.getElementById("login")) {
  adjustingCursorInForm()

}
// ---------------------------------------------------------------------------


if (document.getElementById("interestPopup")) {
  // Function to display the popup
function showPopup() {
  document.getElementById('interestPopup').style.display = 'block';
}

// Function to close the popup
function closePopup() {
  document.getElementById('interestPopup').style.display = 'none';
}

// Function to submit the form (you can modify this to handle form submission)
function submitForm() {
  // Get the selected interests
  var interests = [];
  var checkboxes = document.getElementsByName('interest');
  checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
          interests.push(checkbox.value);
      }
  });

  // Do something with the selected interests (e.g., send them to the server)
  console.log('Selected Interests:', interests);

  // Close the popup (you can remove this if you want to keep the popup open)
  closePopup();
}

// Show the popup when the page loads (you can remove this if you want to show the popup in response to a button click)
window.onload = showPopup;

}