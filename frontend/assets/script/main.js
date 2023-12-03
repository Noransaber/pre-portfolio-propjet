var user = localStorage.getItem('user-data');
var JoinNow = document.querySelector('.joinNow');
var login = document.querySelector('.login');
var aboutBtn = document.querySelector('.about-btn');
var logout = document.getElementById('logout');
var showCourse = document.querySelector('.show-courses');

function checkUserSignIn() {
  if (user != null) {
    if (JoinNow) {
      JoinNow.style.display = 'none';
    }
    if (login) {
      login.style.display = 'none';
    }
    if (logout) {
      logout.style.display = 'inline';
      logout.addEventListener('click', function () {
	localStorage.removeItem('user-data');    
  	// location.reload();    
  	location.href = 'index.html';
      });
    }

    let userDict = JSON.parse(localStorage.getItem("user-data"));
    if (typeof(userDict) !== 'object' || Array.isArray(userDict) || !userDict.id) {
      localStorage.removeItem("user-data");
      location.reload();
    } else {
      let fullurl = `http://localhost:5000/api/users/${userDict.id}`    
      fetch(fullurl)    
      .then((res)=>{    
        if (!res.ok) {     
          throw new Error(res.status);        
        }    
    
        return res.json();    
      })
      .then((res)=>{
	res = res.user;
        if (res.id == userDict.id && res.name == userDict.name) {
          console.log("MainUserCheck OK");
	} else {
	  localStorage.removeItem("user-data");
	}
      })
      .catch((err)=>{
	localStorage.removeItem("user-data");
	console.log(err);
      })

    }
  }
}

if (showCourse) {
  showCourse.addEventListener('click', function () {
    // It render the signup.html page
    location.href = 'allCourses.html';
  });
}

checkUserSignIn();
