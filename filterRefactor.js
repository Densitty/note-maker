//Read exisiting notes from Local Storage function
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')
    //find from local storage
    if (notesJSON !== null) {
        return JSON.parse(notesJSON);
    } else {
        return [];
    }
}

//Save notes to local storage
const saveToStorage = function (notes) {
    return localStorage.setItem('notes', JSON.stringify(notes))
}

//Remove a note from the list
const removeNote = function (id) {
    const noteIndex = notes.findIndex(function (note) {
        console.log(note.id === id)
        return note.id === id
    })

    //check if the index is found
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//Generate DOM for the note
const generateNoteDOM = function (filteredNote, index) {
    const div = document.createElement('div');
    const button = document.createElement('button');
    const para = document.createElement('span');
    //create button content
    button.textContent = 'x';
    //delete a note on click of a button
    button.addEventListener('click', function () {
        console.log(div)
        removeNote(filteredNote.id);
        saveToStorage(notes);
        renderNotes(notes, filters)
    })

    div.appendChild(button);

    if (filteredNote.title.length > 0) {
        para.textContent = `${index + 1}. ${filteredNote.title}`;
    } else {
        para.textContent = 'No named note';
    }


    div.appendChild(para);
    return div;
}

//Render output whenever our note is searched
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    //clear all the contents of the container
    document.querySelector('#notes').innerHTML = '';

    //display our result onto the document body
    filteredNotes.forEach((filteredNote, index) => {
        const para = generateNoteDOM(filteredNote, index);

        document.querySelector('#notes').appendChild(para);
    });
};