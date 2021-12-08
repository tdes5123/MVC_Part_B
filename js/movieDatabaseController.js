var selectedMovie = 0,
    movieIdx = 0;

function onInit() {
    assembleTable();

    document.getElementById("mvAddButton").addEventListener("click", toAddFormHandler);
    document.getElementById("mvCancelButton").addEventListener("click", cancelFormHandler);
    document.getElementById("mvSubmitButton").addEventListener("click", addNewMovieHandler);

    document.getElementById("mvGenreAA").addEventListener('click', setGenreHandler);
    document.getElementById("mvGenreD").addEventListener('click', setGenreHandler);
    document.getElementById("mvGenreC").addEventListener('click', setGenreHandler);
    document.getElementById("mvGenreR").addEventListener('click', setGenreHandler);
    document.getElementById("mvGenreSF").addEventListener('click', setGenreHandler);

    // Part B event listeners
    movieList.forEach(function (movie, idx) {
        document.getElementById('edit' + idx).addEventListener("click", function () {
            editBtnClicked(idx);
        });
        document.getElementById('delete' + idx).addEventListener("click", function () {
            deleteMovieHandler(idx);
        });
    });

    document.getElementById("mvUpdateButton").addEventListener("click", function () {
        editMovie(selectedMovie);
    });
}

// Create table
function assembleTable() {
    var movieList = getAllItems();

    movieList.forEach(function (movie) {
        addElementToTable(movie);
    });
}

function setGenreHandler(event) {
    var genres = {
        AA: {
            name: 'mvGenreAA',
            elm: document.getElementById('mvGenreAA'),
        },
        D: {
            name: 'mvGenreD',
            elm: document.getElementById('mvGenreD'),
        },
        C: {
            name: 'mvGenreC',
            elm: document.getElementById('mvGenreC'),
        },
        R: {
            name: 'mvGenreR',
            elm: document.getElementById('mvGenreR'),
        },
        SF: {
            name: 'mvGenreSF',
            elm: document.getElementById('mvGenreSF'),
        }
    };

    for (var genre in genres) {
        if (event.name == genre.name) {
            event.clicked = true;
            delete (genre);
        } else {
            elm.checked = false;
        }
    }
}

function setGenre(mvGenre) {
    var genresElm = document.getElementById('genres'),
        genres = genresElm.getElementsByTagName('input');

    for (var i = 0; i < genres.length; i++) {
        if (genres[i].value === mvGenre)
            genres[i].checked = true;
        else
            genres[i].checked = false;
    }
}

function getGenre() {
    var genresElm = document.getElementById('genres'),
        genres = genresElm.getElementsByTagName('input');

    for (var i = 0; i <= genres.length; i++) {
        if (genres[i].checked)
            return genres[i].value;
    }
}

// Add to table
function addElementToTable(movie) {
    var trAdd = document.createElement("tr"),
        element = document.getElementById("mvTable"),
        editBtn = document.createElement("button"),
        deleteBtn = document.createElement("button"),
        tdList = {
            tdTitle: document.createElement("td"),
            tdRating: document.createElement("td"),
            tdPersRating: document.createElement("td"),
            tdBlueRay: document.createElement("td"),
            tdEditBtn: document.createElement("td"),
            tdDeleteBtn: document.createElement("td")
        };

    tdList.tdTitle.appendChild(document.createTextNode(movie.title));
    tdList.tdTitle.classList.add('text-center');
    tdList.tdTitle.classList.add('table-data');
    tdList.tdTitle.setAttribute('id', 'title' + movieIdx);
    tdList.tdRating.appendChild(document.createTextNode(movie.rating));
    tdList.tdRating.classList.add('text-center');
    tdList.tdRating.classList.add('table-data');
    tdList.tdRating.setAttribute('id', 'rating' + movieIdx);
    tdList.tdPersRating.appendChild(document.createTextNode(movie.personal_rating));
    tdList.tdPersRating.classList.add('text-center');
    tdList.tdPersRating.classList.add('table-data');
    tdList.tdPersRating.setAttribute('id', 'persRating' + movieIdx);
    tdList.tdBlueRay.appendChild(document.createTextNode(movie.is_blueRay ? 'Yes' : 'No'));
    tdList.tdBlueRay.classList.add('text-center');
    tdList.tdBlueRay.classList.add('table-data');
    tdList.tdBlueRay.setAttribute('id', 'blueRay' + movieIdx);

    editBtn.innerHTML = "Edit";
    editBtn.classList.add('btn-yellow');
    editBtn.classList.add('btn');
    editBtn.setAttribute('id', 'edit' + movieIdx);
    tdList.tdEditBtn.appendChild(editBtn);
    tdList.tdEditBtn.classList.add('text-center');
    tdList.tdEditBtn.classList.add('table-data');

    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add('btn-red');
    deleteBtn.classList.add('btn');
    deleteBtn.setAttribute('id', 'delete' + movieIdx);
    tdList.tdDeleteBtn.appendChild(deleteBtn);
    tdList.tdDeleteBtn.classList.add('text-center');
    tdList.tdDeleteBtn.classList.add('table-data');

    trAdd.appendChild(tdList.tdTitle);
    trAdd.appendChild(tdList.tdRating);
    trAdd.appendChild(tdList.tdPersRating);
    trAdd.appendChild(tdList.tdBlueRay);
    trAdd.appendChild(tdList.tdEditBtn);
    trAdd.appendChild(tdList.tdDeleteBtn);

    trAdd.classList.add('table-data');
    trAdd.classList.add('text-center');

    trAdd.setAttribute('id', 'movie' + movieIdx);
    element.appendChild(trAdd);

    movieIdx++;
}

// Event Handler Functions
function toAddFormHandler() {
    var formElm = document.getElementById('mvForm'),
        formButton = document.getElementById('mvAddButton');

    formElm.hidden = false;
    formButton.hidden = true;
}

function cancelFormHandler() {
    var formElm = document.getElementById('mvForm'),
        formButton = document.getElementById('mvAddButton'),
        addMvBtn = document.getElementById('mvAddButton'),
        submitBtn = document.getElementById('mvSubmitButton'),
        updateBtn = document.getElementById('mvUpdateButton');

    formElm.hidden = true;
    formButton.hidden = false;
    submitBtn.hidden = false;
    addMvBtn.hidden = false;
    updateBtn.hidden = true;

    clearForm();
}

function clearForm() {
    document.getElementById("mvTitle").value = '';
    document.getElementById("mvRating").value = 'G';
    document.getElementById("mvYear").value = '';
    document.getElementById("mvPRating").value = '';
    setGenre("Action/Adventure");
    document.getElementById("mvBlueRay").checked = false;
}

function addNewMovieHandler() {
    try {
        var formElms = {
            title_elm: document.getElementById("mvTitle"),
            rating_elm: document.getElementById("mvRating"),
            year_produced_elm: document.getElementById("mvYear"),
            personal_rating_elm: document.getElementById("mvPRating"),
            genre_elm: document.getElementById("mvGenre"),
            is_blueRay_elm: document.getElementById("mvBlueRay")
        },
            newMovie = {
                id: movieList.length,
                title: formElms.title_elm.value,
                rating: formElms.rating_elm.value,
                year_produced: formElms.year_produced_elm.value,
                personal_rating: formElms.personal_rating_elm.value,
                genre: getGenre(),
                is_blueRay: (formElms.is_blueRay_elm.checked ? true : false)
            };

        if (!formVerify(newMovie))
            throw ("Error in form input");

        movieList.push(newMovie);

        addElementToTable(newMovie);
        document.getElementById('mvForm').hidden = true;
        document.getElementById('mvAddButton').hidden = false;

        document.getElementById('edit' + (movieIdx - 1)).addEventListener("click", function () {
            editBtnClicked(movieIdx - 1);
        });
        document.getElementById('delete' + (movieIdx - 1)).addEventListener("click", function () {
            deleteMovieHandler(movieIdx - 1);
        });

        clearForm();
    } catch (err) {
        console.log(err);
    }
}

// Edit Movie
function editBtnClicked(idx) {
    var movie = movieList[idx],
        formElm = document.getElementById('mvForm'),
        addMvBtn = document.getElementById('mvAddButton'),
        submitBtn = document.getElementById('mvSubmitButton'),
        updateBtn = document.getElementById('mvUpdateButton'),
        formData = {
            title_elm: document.getElementById("mvTitle"),
            rating_elm: document.getElementById("mvRating"),
            year_produced_elm: document.getElementById("mvYear"),
            personal_rating_elm: document.getElementById("mvPRating"),
            is_blueRay_elm: document.getElementById("mvBlueRay")
        };

    formData.title_elm.value = movie.title;
    formData.rating_elm.value = movie.rating;
    formData.year_produced_elm.value = movie.year_produced;
    formData.personal_rating_elm.value = movie.personal_rating;
    setGenre(movie.genre);
    formData.is_blueRay_elm.checked = movie.is_blueRay;


    selectedMovie = idx;
    addMvBtn.hidden = true;
    submitBtn.hidden = true;
    updateBtn.hidden = false;
    formElm.hidden = false;
}

function editMovie(idx) {
    try {
        var formElm = document.getElementById('mvForm'),
            addMvBtn = document.getElementById('mvAddButton'),
            submitBtn = document.getElementById('mvSubmitButton'),
            updateBtn = document.getElementById('mvUpdateButton'),
            tableElmData = {
                movie_title: document.getElementById("title" + idx),
                rating: document.getElementById("rating" + idx),
                personal_rating: document.getElementById("persRating" + idx),
                blue_ray: document.getElementById("blueRay" + idx)
            },
            formData = {
                title_elm: document.getElementById("mvTitle"),
                rating_elm: document.getElementById("mvRating"),
                year_produced_elm: document.getElementById("mvYear"),
                personal_rating_elm: document.getElementById("mvPRating"),
                is_blueRay_elm: document.getElementById("mvBlueRay")
            },
            updatedMovie = {
                id: idx,
                title: formData.title_elm.value,
                rating: formData.rating_elm.value,
                year_produced: formData.year_produced_elm.value,
                personal_rating: formData.personal_rating_elm.value,
                genre: getGenre(),
                is_blueRay: (formData.is_blueRay_elm.checked ? 'Yes' : 'No')
            };

        if (!formVerify(updatedMovie, true))
            throw ("Error in form input");

        movieList[idx] = updatedMovie;

        tableElmData.movie_title.innerHTML = updatedMovie.title;
        tableElmData.rating.innerHTML = updatedMovie.rating;
        tableElmData.personal_rating.innerHTML = updatedMovie.personal_rating;
        tableElmData.blue_ray.innerHTML = updatedMovie.is_blueRay;

        submitBtn.hidden = false;
        addMvBtn.hidden = false;
        updateBtn.hidden = true;
        formElm.hidden = true;
        clearForm();
    } catch (err) {
        console.log(err);
    }
}

// Delete Movie
function deleteMovieHandler(idx) {
    var movieToDelete = [];

    movieList.forEach(function (movie, idx) {
        if (movie.id === idx)
            movieToDelete = movie;
    });

    if (confirm("Are you sure you want to delete the " + movieToDelete.title + " movie?"))
        deleteMovie(idx);
}

function deleteMovie(id) {
    document.getElementById('movie' + id).remove();

    if (movieList.length > 1) {
        movieList.forEach(function (movie, idx) {
            if (movie.id === id)
                movieList.splice(idx, 1);
        });
    } else {
        movieList = [];
    }
}

// Form Validation
function formVerify(movie, edit) {
    var titleErr = document.getElementById("titleErr"),
        yearErr = document.getElementById("yearErr"),
        pRatingErr = document.getElementById("pRatingErr"),
        genreErr = document.getElementById("genreErr"),
        formVerified = true;

    titleErr.hidden = true;
    yearErr.hidden = true;
    pRatingErr.hidden = true;
    genreErr.hidden = true;

    // Title
    if (movie.title.length <= 0) {
        formVerified = false;
        titleErr.hidden = false;
    } else {
        movieList.forEach(function (item) {
            if (movie.title === item.title) {
                if (!edit && movie.id !== item.id) {
                    formVerified = false;
                    titleErr.hidden = false;
                }
            }
        });
    }

    // Year Produced
    if (movie.year_produced.length <= 0) {
        formVerified = false;
        yearErr.hidden = false;
    }

    // Personal Rating 
    if (movie.personal_rating < 0 || movie.personal_rating > 5 || movie.personal_rating === '') {
        formVerified = false;
        pRatingErr.hidden = false;
    }

    // Genre
    if (movie.genre <= 0) {
        formVerified = false;
        genreErr.hidden = false;
    }

    return formVerified;
}