let course_tit = document.querySelector("#course-tit");
let course_desc = document.querySelector("#course-desc");
let course_likes = document.querySelector("#tot-likes");
let userDet = localStorage.getItem("user-data");
let course = {};

function verifySignIn() {
  if (!userDet) {
    alert("You need to be signed in to access this page!");
    location.href = "index.html";
  } else {
    let course_id = JSON.parse(userDet).selected_course;
    if (!course_id) {
      alert("Please sign in again and retry!");
      location.href = "index.html";
    }

    let url = `http://localhost:5000/api/courses/${course_id}`;
    fetch(url)
    .then((res)=>{
      if (!res.ok) {
        if (res.status == 500) {
          alert("Internal database error, please try again later!");
          throw new Error(res.status);
        }
        throw new Error(res.status);
      }

      return res.json();
    })
    .then((res)=>{
      course = res.course;
      course_desc.innerText = course.description;
      course_tit.innerText = course.title;
      course_likes.innerText = `TOTAL LIKES: ${course.likes}`;
    })
    .catch((err)=>{
      console.error(err.message);
    })
  }
}



verifySignIn();
