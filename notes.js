'use strict'

const notes = getSavedNotes();
const addNote = document.querySelector('.addNote');
const form = document.querySelector('#nameForm');
const search = document.querySelector('.searchNote');
const sort = document.querySelector('#sort');


//Set our search parameter for filtering
const filters = {
	searchText: '',
	//give our sorting criteria
	sortBy: 'lastEdited',
};

//call the function to display
renderNotes(notes, filters);

//setting of the text to search for in the input
search.addEventListener('input', e => {
	filters.searchText = e.target.value;
	//call the function to display to screen upon input of a text and rerender the notes based on the activity of the search box
	renderNotes(notes, filters);
});

//apply the change event when sorting our note
sort.addEventListener('change', e => {
	filters.sortBy = e.target.value;
	console.log(e.target.value);
	renderNotes(notes, filters);
})

addNote.addEventListener('click', () => {
	const noteTag = uuidv4();
	//create a timestamp using moment js
	const timestamp = moment().valueOf();

	notes.push({
		id: noteTag,
		title: '',
		body: '',
		createdAt: timestamp,
		updatedAt: timestamp
	});
	//call the function saving to storage
	saveToStorage(notes)
	//on clicking the create note button, I get directed to the href specified below with a unique id for the note (location.hash)
	location.assign(`/3.%20FIltering%20List/note.html#${noteTag}`);
})

//bring the synchronisation functionality into the home page too
window.addEventListener('storage', e => {
	if (e.key === 'notes') {
		//resave the notes array into what was 
		notes = JSON.parse(e.newValue);
		renderNotes(notes, filters)
	}
})
// form.addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	console.log(e.target.children.noteTitle.value);
// 	console.log(e.target.elements.noteTitle.value);
// 	e.target.elements.noteTitle.value = '';
// });
