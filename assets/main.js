// Workin on index.html button to make them functional, starting with landing buttons, about section buttons, then footer links
// * Langing section *
// When they click Join now it shouldshow the sign-up Form
// Have the button
var JoinNow = document.querySelector(".joinNow")

// console.log(JoinNow)

// Make an even, When we click on the button
JoinNow.addEventListener("click", function () {
  // it changes the page to the sign-up form
  location.href = "signup.html"
})

// When they click README it should show the about us page

// Have the button
var JoinNow = document.querySelector(".land-readme")

// console.log(JoinNow)

// Make an even, When we click on the button
JoinNow.addEventListener("click", function () {
  // it changes the page to the about-us page
  location.href = "about.html"
})
// * About section *

// When they click README in about section it should show the about us page

// Have the button
var JoinNow = document.querySelector(".about-btn")

// console.log(JoinNow)

// Make an even, When we click on the button
JoinNow.addEventListener("click", function () {
  // it changes the page to the about-us page
  location.href = "about.html"
})

// * Footer section *








var cursor = document.querySelector(".mymouse")
document.body.addEventListener("mousemove", function(e){
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/*change mouse color*/

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
  

