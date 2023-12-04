let createBtn = document.querySelector(".submit-btn")
let fnameEle = document.querySelector("#fname")
let emailEle = document.querySelector("#email")
let passwordEle = document.querySelector("#Password")


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


createBtn.addEventListener("click", function(e){
  e.preventDefault();

  createBtn.value = "...";

  let fname = fnameEle.value;
  let email = emailEle.value;
  let password = passwordEle.value;

  if (!fname || !email || !password) {
    alert("Credentials not complete, check and try again!");
    createBtn.value = "Create account";
  } else {

    let params = {
      name: fname,
      email: email,
      password: password
    }
    let headers = {
      'Content-Type': 'application/json'
    }

    // Sending out the data to DB
    fetch("http://localhost:5000/api/users", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
    .then((res)=>{
      if (!res.ok) {
        if (res.status == 500) {
          alert("Internal Server Error, please try again");
        }
        throw new Error(res.status);
      }

      return res.json();
    })
    .then((res)=>{
      alert("Account Created successfully");
      let user = res.user;
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
      createBtn.value = "Create account";
    })
    .catch((err)=>{
      alert("An error as occured, please try again later");
      createBtn.value = "Create account";
      console.error(err);
    })
  }
})


adjustingCursorInForm();
