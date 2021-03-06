showNotes();
//code for adding title in note


let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt')
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-3 mx-3" style="width: 18rem ; background-color: #a7c4b4;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class='card-text'>${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="btn" style="background-color:#308254">Delete note</button>
        </div>
        </div>
                `
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    }
    else {
        notesElm.innerHTML = 'there is no notes are writen before'
    }
}

function deleteNote(index) {
    console.log('I am deleteing', index);
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// let search = document.getElementById('searchTxt')

// search.addEventListener('input',function () {
//     let inputval=search.value;
//     let noteCards = document.getElementsByClassName('noteCard');
//     Array.from(noteCards).forEach(function(element) {
//         console.log(element);
//     });
// })

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})