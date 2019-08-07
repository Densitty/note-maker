const notes = getSavedNotes();
const addNote = document.querySelector('.addNote');
const form = document.querySelector('#nameForm');
const search = document.querySelector('.searchNote');
const sort = document.querySelector('#sort');


//Set our search parameter for filtering
const filters = {
	searchText: ''
};

//call the function to display
renderNotes(notes, filters);

//setting of the text to search for in the input
search.addEventListener('input', function (e) {
	filters.searchText = e.target.value;
	//call the function to display to screen upon input of a text
	renderNotes(notes, filters);
});

sort.addEventListener('change', function (e) {
	console.log(e.target.value);
})

addNote.addEventListener('click', function () {
	notes.push({
		id: uuidv4(),
		title: '',
		body: ''
	});
	//call the function saving to storage
	saveToStorage(notes)
	//render the function calling the notes
	renderNotes(notes, filters);
})
// form.addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	console.log(e.target.children.noteTitle.value);
// 	console.log(e.target.elements.noteTitle.value);
// 	e.target.elements.noteTitle.value = '';
// });
