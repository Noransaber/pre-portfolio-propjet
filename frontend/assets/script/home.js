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