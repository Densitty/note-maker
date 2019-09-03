'use strict'


//Read exisiting notes from Local Storage function
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    //prevent our script from crashing even if an error occurs
    try {
        //find from local storage
        return notesJSON !== null ? JSON.parse(notesJSON) : []
        //either use ternary operator above or if/else below
        /* if (notesJSON !== null) {return JSON.parse(notesJSON);
        } else { return []; }*/
    } catch (e) {
        return [];
    }

}

//Save notes to local storage
const saveToStorage = notes => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//Remove a note from the list
const removeNote = id => {
    const noteIndex = notes.findIndex((note) => note.id === id
    )

    //check if the index is found
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//Generate DOM for the note
const generateNoteDOM = (filteredNote, index) => {
    const div = document.createElement('div');
    const button = document.createElement('button');
    const para = document.createElement('a');
    //create button content
    button.textContent = 'x';
    //delete a note on click of a button
    button.addEventListener('click', () => {
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
    //on creating the note link to each note and clicking on it, I get directed to the href specified below with a unique id attached to locate that note
    para.setAttribute('href', `note.html#${filteredNote.id}`)
    div.appendChild(para);
    return div;
}

//sort notes created
const sortNotes = function (notes, sortBy) {
    if (sortBy === 'lastEdited') {
        return notes.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'lastCreated') {
        return notes.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0;
            }
        })
    } else {
        return notes
    }
}

//Render output whenever our note is searched
//renderNotes work on the notes array and the filters object
const renderNotes = (notes, filters) => {
    //call the sortNotes() in this function and assign it to the notes array; 
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    //clear all the contents of the notes div before renderinng any content unto it again
    document.querySelector('#notes').innerHTML = '';

    //display our result onto the document body
    filteredNotes.forEach((filteredNote, index) => {
        const para = generateNoteDOM(filteredNote, index);

        document.querySelector('#notes').appendChild(para);
    });
};

//Generate the last edited message from the timestamp
const generateLastEdited = function (timestamp) {
    return `Last edited ${moment(timestamp).fromNow()}`
}