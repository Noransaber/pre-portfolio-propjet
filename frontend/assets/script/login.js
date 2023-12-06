let form = document.querySelector(".fr")
let subButton = document.querySelector(".submit-btn")
let host = "http://localhost:5000";
// var host = "https://skillhub.devmarc.tech"

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
        cont.addEventListener("mouseover", function () {
            cursor.setAttribute("style", "outline:white solid")
        })
        var cont = document.querySelector('.form-container');
        cont.addEventListener("mouseout", function () {
            cursor.setAttribute("style", "outline:black solid")
        });
        // This adds some nice ellipsis to the description:
        document.querySelectorAll(".projcard-description").forEach(function (box) {
            $clamp(box, { clamp: 6 });
        });
    }

// Adding events on the log in button of the log in page that fetches user
// details from backed database based on given login credentials
// All response error are managed
subButton.addEventListener("click", (e)=>{
  e.preventDefault();
  
  let formData = new FormData(form);
  let email_ = ""
  let password_ = ""
  
  for (const pair of formData.entries()) {
    if (pair[0] === "email") email_ = pair[1];
    if (pair[0] === "password") password_ = pair[1];
  }
  
  if (!email_ || !password_) {
    alert("Login Credentials not complete, check and try again!");
  } else {
    subButton.value = "loading...";

    let params = {email: email_, password: password_}
    let param = new URLSearchParams(params);
    let fullurl = `${host}/api/users?${param}`
    fetch(fullurl)
    .then((res)=>{
      if (!res.ok) {
	if (res.status == 404) {
	  alert("User not found, ensure your details are correctly typed or kindly sign up if you're new");
	}
	if (res.status == 500) {
	  alert("Database error, please try again later");
	}
	throw new Error(res.status);	
      }

      return res.json();
    })
    .then((res)=>{
      let user = res.user
      let userDict = {
	name: user.name,
	id: user.id,
	selected_course: null
      }

      localStorage.setItem("user-data", JSON.stringify(userDict));
      if (localStorage.getItem("likes-reg")) {
        localStorage.removeItem("likes-reg");
      }
      location.href = "index.html";
      subButton.value = "Log In";
    })
    .catch((err)=>{
      subButton.value = "Log In";
      console.error(err);
    })
  }
})


adjustingCursorInForm()
