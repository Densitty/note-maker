const title = document.querySelector('#noteTitle');
const body = document.querySelector('#noteBody');
//on this page, there is a location.hash attached; to access the id, we strip off the # using substring
const noteId = location.hash.slice(1);
//render the notes, if any exists, array from the local storage
let notes = getSavedNotes();

let note = notes.find(function (note) {
    return note.id === noteId
})

if (note === undefined) {
    location.assign(`/3.%20FIltering%20List/index.html`)
}

title.value = note.title;
body.value = note.body;

document.querySelector('#addNote').addEventListener('click', function () {
    saveToStorage(notes);
    location.assign(`/3.%20FIltering%20List/index.html`)
})


title.addEventListener('input', function (e) {
    note.title = e.target.value;
    saveToStorage(notes)
});

body.addEventListener('input', function (e) {
    note.body = e.target.value;
    saveToStorage(notes)
})

document.querySelector('#removeNote').addEventListener('click', function () {
    //remove the note by calling the removeNote()
    removeNote(note.id);
    //save the notes array to local storage again on modification
    saveToStorage(notes);
    //redirect back to the homepage
    location.assign(`/3.%20FIltering%20List/index.html`)
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
            location.assign(`/3.%20FIltering%20List/index.html`)
        }

        title.value = note.title;
        body.value = note.body;
    }
})