var user = localStorage.getItem("user-data");
var JoinNow = document.querySelector('.joinNow');
var login = document.querySelector('.login');
var aboutBtn = document.querySelector('.about-btn');
var logout = document.getElementById("logout");

function checkUserSign() {
    if (user != null) {
        if (JoinNow) {
            JoinNow.style.display = "none";
        }
        if (login) {
            login.style.display = "none";
        }
        if (logout) {
            logout.style.display = "inline";;
        }
    }
}
  
logout.addEventListener('click', function () {
    localStorage.removeItem("user-data");
    // location.reload();
    location.href = "index.html";
})
  
checkUserSign();