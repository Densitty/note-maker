'use strict'

const title = document.querySelector('#noteTitle');
const body = document.querySelector('#noteBody');
//on this page, there is a location.hash attached; to access the id, we strip off the # using substring
const noteId = location.hash.slice(1);
//render the notes array, if any exists, from the local storage
let notes = getSavedNotes();

const dateElement = document.querySelector('#last-edited');
let note = notes.find(function (note) {
    return note.id === noteId
})
console.log(note)
if (note === undefined) {
    location.assign(`index.html`)
}

title.value = note.title;
body.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

document.querySelector('#addNote').addEventListener('click', function () {
    saveToStorage(notes);
    location.assign(`index.html`)
})


title.addEventListener('input', function (e) {
    note.title = e.target.value;
    //whenever we edit the  note, capture the timestamp
    note.updatedAt = moment().valueOf();
    //on editing the title, update and record the time
    dateElement.textContent = generateLastEdited(note.updatedAt);
    saveToStorage(notes)
});

body.addEventListener('input', function (e) {
    note.body = e.target.value;
    //whenever we edit the  note, capture the timestamp
    note.updatedAt = moment().valueOf();
    //on editing the body of the note, update and record the time
    dateElement.textContent = generateLastEdited(note.updatedAt);
    saveToStorage(notes)
})

document.querySelector('#removeNote').addEventListener('click', function () {
    //remove the note by calling the removeNote()
    removeNote(note.id);
    //save the notes array to local storage again on modification
    saveToStorage(notes);
    //redirect back to the homepage
    location.assign(`index.html`)
})

//to synchronise the changes we make to the array across all the tabs, if we are to make multiple tabs of same page. This event is triggered on the second opened tab and not the current tab we are working on
window.addEventListener('storage', function (e) {
    if (e.key === 'notes') {
        //resave the notes array into what was 
        notes = JSON.parse(e.newValue);
        let note = notes.find(function (note) {
            return note.id === noteId
        })

        if (note === undefined) {
            location.assign(`index.html`)
        }

        title.value = note.title;
        body.value = note.body;
        //this allows timestamp to be captured when we duplicate the window
        dateElement.textContent = generateLastEdited(note.updatedAt);
    }
})