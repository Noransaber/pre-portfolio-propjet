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

function personalPageFunctions() {
  $(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });
  
    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });
  
    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });
  
    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
  
    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Web Developer", "Open Source Contributor", "Action on Google Developer", "Freelancer", "AI Enthusiast", "Front End Enthusiast", "UI Designer", "Technical Writer", "Author"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
  
    var typed = new Typed(".typing-2", {
        strings: ["Web Developer", "Open Source Contributor", "Action on Google Developer", "Freelancer", "AI Enthusiast", "Front End Enthusiast", "UI Designer", "Technical Writer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
  
    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
  });
}

if (document.getElementById("noran")) {
  personalPageFunctions()
  
}