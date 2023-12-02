var JoinNow = document.querySelector('.joinNow');
var login = document.querySelector('.login');
var aboutBtn = document.querySelector('.about-btn');
var popularCourses = document.querySelector('.container') 
var courses = []

function getCourses() {
  fetch("http://localhost:5000/api/courses")
    .then(function(data) {
      if (!data.ok) {
      	throw new Error('Error Fetching Courses!');	
      }
      return data.json();
    })
    .then(function(data) {
      courses = data.courses;
      console.log(courses);
      popularCourses.innerHTML = courses.map((course)=>{
	return `
	<div class="square" onclick="courseClick('${course.id}')">
          <img
            src="${course.image_url}">
            <div class="title">${course.title}</div>
          <p class='desc'>${course.description}
          </p>
        </div>`
      }).join("");
    })
    .catch(function(error) {
      popularCourses.innerHTML = `<p class='courseError'>Error Fetching Courses</p>`;
    })
}

function courseClick(course_id) {
 console.log(course_id);
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
