var JoinNow = document.querySelector('.joinNow');
var login = document.querySelector('.login');
var aboutBtn = document.querySelector('.about-btn');


function getCourses() {
  fetch("http://localhost:5000/api/courses")
    .then(function (data) {
      return data.json()
    })
    .then(function (data) {
      

    })

}

// Make an even, When we click on the button
JoinNow.addEventListener('click', function () {
  // It render the signup.html page
  location.href = 'signup.html';
});

// 2. Add Event when we clikck it redirect us to the log in form
login.addEventListener('click', function () {
  location.href = 'login.html';
});

// Make an even, When we click on the button
aboutBtn.addEventListener('click', function () {
  // it changes the page to the about-us page
  location.href = 'about.html';
});

getCourses()