let course_tit = document.querySelector("#course-tit");
let course_desc = document.querySelector("#course-desc");
let course_likes = document.querySelector("#tot-likes");
let video_cont = document.querySelector(".video-container");
let userDet = localStorage.getItem("user-data");
let course = {};
let course_videos = [];


function course_render() {
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
      // Updating the course info with the course data
      course = res.course;
      course_desc.innerText = course.description;
      course_tit.innerText = course.title;
      course_likes.innerText = `TOTAL LIKES: ${course.likes}`;

      // Updating the course videos with the video values of the course data
      course_videos = course.videos;
      console.log(course_videos);
      video_cont.innerHTML = course_videos.map((video)=>{
        console.log(video);
        return `
          <div class="video-details">    
            <div class="video-title">    
              <h3>${video.title}</h3>    
            </div>    
            <div class="video">
              ${video.embed_link}
              <div class='heart'></div>    
              <div class='clock'></div>    
              <div class='share'></div> 
            </div>    
          </div>`
      }).join("");
    })
    .catch((err)=>{
      console.error(err.message);
    })
  }
}


//course_render();
