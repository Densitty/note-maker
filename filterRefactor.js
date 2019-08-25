//Read exisiting notes from Local Storage function
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    //find from local storage
    notesJSON !== null ? JSON.parse(notesJSON) : [];
    /*if (notesJSON !== null) {
        return JSON.parse(notesJSON);
    } else {
        return [];
    }*/
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

//Render output whenever our note is searched
const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    //clear all the contents of the container
    document.querySelector('#notes').innerHTML = '';

    //display our result onto the document body
    filteredNotes.forEach((filteredNote, index) => {
        const para = generateNoteDOM(filteredNote, index);

        document.querySelector('#notes').appendChild(para);
    });
};