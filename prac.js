var cont = document.querySelector(".container")
console.log(cont)

fetch("http://localhost:5000/api/courses")
    .then((res) => { 
        return res.json()
    })
    .then((res) => { 
        res = res.courses;
        cont.innerHTML = res.map((data) => { 
            return `
            <h5>${data.title}</h2>
            <h5>${data.description}</h2>
            <img width="50" height="50" src="${data.image_url}">
            <h5>${data.id}</h2>
            <br>
            <hr>
            `;
        }).join("");
    })
    .catch()
