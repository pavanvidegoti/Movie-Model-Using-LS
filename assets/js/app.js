let cl = console.log;

const darkMode = document.getElementById("darkMode");
const body = document.getElementById("night");
const showModel = document.getElementById("showModel");
const backDrop = document.getElementById("backDrop");
const myModal = document.getElementById("myModal");
const movieClose = [...document.querySelectorAll(".movieClose")];
const titleControl = document.getElementById("title");
const imgUrlControl = document.getElementById("imgUrl");
const overviewControl = document.getElementById("overview");
const ratingControl = document.getElementById("rating");
const movieForm = document.getElementById("movieForm");
const myMovie = document.getElementById("myMovie");
const submitBtn = document.getElementById("submitBtn");
const upDateBtn = document.getElementById("upDateBtn");



let movieArray = [];

const onDarkMode = () => {
    darkMode.classList.toggle("active");
    body.classList.toggle("night");
}

const onShowHideHandler = () => {
    myModal.classList.toggle("active");
    backDrop.classList.toggle("active");
}
const movieTemplating = (arr) => {
    let result = "";
    arr.forEach((ele)=>{
        result += `
                    <div class="col-md-4 mb-4">
                        <div class="card" id="${ele.movieId}">
                            <figure class="movieContainer">
                                <img src="${ele.imgeUrl}" alt="${ele.title}" target="${ele.title}">
                                <figcaption>
                                    <div class="heading">
                                        <div class="row">
                                            <div class="col-sm-10">
                                                <h4>
                                                    ${ele.title}
                                                </h4>
                                            </div>
                                            <div class="col-sm-2 d-flex align-items-center">
                                                ${ele.rating>4 ?`<span class="badge badge-success">${ele.rating}</span>`:
                                                ele.rating>=2 && ele.rating<=4 ?`<span class="badge badge-warning">${ele.rating}</span>`:
                                                `<span class="badge badge-danger">${ele.rating}</span>`}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="overviewSection">
                                        <h5>
                                            <em>
                                                Overview
                                            </em>
                                        </h5>
                                        <p>
                                            ${ele.overview}
                                        </p>
                                        <div class="d-flex justify-content-between">
                                            <button class="btn btn-primary" id="onEditBtn" onclick="onMovieEdit(this)">Edit</button>
                                             <button class="btn btn-danger" id="onDeleteBtn" onclick="onMovieDelete(this)">Delete</button>

                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                        
                        `;
    })
    myMovie.innerHTML = result;

}
if(localStorage.getItem("movieArr")){
    movieArray = JSON.parse(localStorage.getItem("movieArr"));
    movieTemplating(movieArray);
}

const addMovieCard = (obj) => {
    let card = document.createElement("div");
    card.id = obj.movieId;
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
                    <div class="card" id="${obj.movieId}">
                        <figure class="movieContainer">
                            <img src="${obj.imgeUrl}" alt="${obj.title}" target="${obj.title}">
                            <figcaption>
                                <div class="heading">
                                    <div class="row">
                                        <div class="col-sm-10">
                                            <h4>
                                                ${obj.title}
                                            </h4>
                                        </div>
                                        <div class="col-sm-2 d-flex align-items-center">
                                            ${obj.rating>4 ?`<span class="badge badge-success">${obj.rating}</span>`:
                                            obj.rating>=2 && obj.rating<=4 ?`<span class="badge badge-warning">${obj.rating}</span>`:
                                            `<span class="badge badge-danger">${obj.rating}</span>`}
                                        </div>
                                    </div>
                                </div>
                                <div class="overviewSection">
                                    <h5>
                                        <em>
                                            Overview
                                        </em>
                                    </h5>
                                    <p>
                                        ${obj.overview}
                                    </p>
                                    <div class="d-flex justify-content-between">
                                        <button class="btn btn-primary" id="onEditBtn" onclick="onMovieEdit(this)">Edit</button>
                                        <button class="btn btn-danger" id="onDeleteBtn" onclick="onMovieDelete(this)">Delete</button>

                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                        `;
    myMovie.prepend(card);
}

const uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
}

const onMovieDelete = (ele) =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            let deleteId = ele.closest(".card").id;
        let getDeleteIndex = movieArray.findIndex(movie => movie.movieId === deleteId);
        movieArray.splice(getDeleteIndex,1);
        localStorage.setItem("movieArr",JSON.stringify(movieArray));
        ele.closest(".col-md-4").remove();
        }
        Swal.fire({
            title:`${ele.title}Movie is Deleted Successfully !!`,
            icone:"success",
            timer: 2500
        })
      });
    
}

const onMovieUpdate = () => {
    let updatedId = localStorage.getItem("editId");
    cl(updatedId)
    let updatedObj = {
        title : titleControl.value,
        imgeUrl:imgUrlControl.value,
        overview:overviewControl.value,
        rating:ratingControl.value,
        movieId:updatedId
    }
    cl(updatedObj)
    let getIndex = movieArray.findIndex(movie => movie.movieId === updatedId);
    cl(getIndex)
    movieArray[getIndex] = updatedObj;
    localStorage.setItem("movieArr",JSON.stringify(movieArray));
    let getCard = document.getElementById(updatedId);
    getCard.innerHTML = `
                        <figure class="movieContainer">
                            <img src="${updatedObj.imgeUrl}" alt="${updatedObj.title}" target="${updatedObj.title}">
                            <figcaption>
                                <div class="heading">
                                    <div class="row">
                                        <div class="col-sm-10">
                                            <h4>
                                                ${updatedObj.title}
                                            </h4>
                                        </div>
                                        <div class="col-sm-2 d-flex align-items-center">
                                            ${updatedObj.rating>4 ?`<span class="badge badge-success">${updatedObj.rating}</span>`:
                                            updatedObj.rating>=2 && updatedObj.rating<=4 ?`<span class="badge badge-warning">${updatedObj.rating}</span>`:
                                            `<span class="badge badge-danger">${updatedObj.rating}</span>`}
                                        </div>
                                    </div>
                                </div>
                                <div class="overviewSection">
                                    <h5>
                                        <em>
                                            Overview
                                        </em>
                                    </h5>
                                    <p>
                                        ${updatedObj.overview}
                                    </p>
                                    <div class="d-flex justify-content-between">
                                        <button class="btn btn-primary" id="onEditBtn" onclick="onMovieEdit(this)">Edit</button>
                                        <button class="btn btn-danger" id="onDeleteBtn" onclick="onMovieDelete(this)">Delete</button>

                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                            `;
    onShowHideHandler();
    upDateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    Swal.fire({
        title:`${updatedObj.title}Movie is Updated Successfully !!`,
        icone:"success",
        timer: 2500
    })
    movieForm.reset();

}

const onMovieEdit = (ele) => {
    let editId = ele.closest(".card").id;
    localStorage.setItem("editId",editId);
    let editObj = movieArray.find(movie => movie.movieId === editId)
    onShowHideHandler()
   titleControl.value = editObj.title;
   imgUrlControl.value = editObj.imgeUrl;
   overviewControl.value = editObj.overview;
   ratingControl.value = editObj.rating;
   upDateBtn.classList.remove("d-none");
   submitBtn.classList.add("d-none");

}
const onAddMovie = (ele) => {
    ele.preventDefault();
    let movieObj = {
        title:titleControl.value,
        imgeUrl:imgUrlControl.value,
        overview:overviewControl.value,
        rating:ratingControl.value,
        movieId:uuid()
    }
   movieArray.unshift(movieObj);
   localStorage.setItem("movieArr",JSON.stringify(movieArray));
   addMovieCard(movieObj);
   onShowHideHandler();
   Swal.fire({
    title:`${movieObj.title} Movie is Added Successfully !!`,
    icone:"success",
    timer: 2500
})
   ele.target.reset();
}

darkMode.addEventListener("click", onDarkMode);
showModel.addEventListener("click",onShowHideHandler);
movieClose.forEach(ele => ele.addEventListener("click",onShowHideHandler));
movieForm.addEventListener("submit",onAddMovie);
upDateBtn.addEventListener("click",onMovieUpdate);


