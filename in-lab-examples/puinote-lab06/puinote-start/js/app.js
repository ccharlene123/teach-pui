// We use this class to represent our notecards. Each notecard object contains
// data for a single note, and a reference to a DOM element corresponding to
// that notecard.
class Notecard {

  // When we create a new Notecard object, the "constructor"
  // function is run. In the constructor, "this" refers to the
  // newly created Notecard object.
  constructor(imageURL, title, body) {
    this.noteImageURL = imageURL;
    this.noteTitle = title;
    this.noteBody = body;

    this.element = null;
  }
}

// Create an empty Set, which will hold all of our notecard objects. A Set is
// similar to an Array, but in a Set, an item can only be added once (there
// are no duplicates). Sets also allow for easy removal of items, using the
// Set.delete(item) function.
const notecardSet = new Set();

// This function creates a new Notecard object, and adds it to notecardSet.
function addNewNote(imageURL, title, body) {
  // Create a new notecard object. The Notecard constructor takes three
  // arguments: the image URL, title text,  and body text.
  const notecard = new Notecard(imageURL, title, body);

  // Add the notecard object to our notecard Set, which keeps track of all
  // the notecards in our application.
  notecardSet.add(notecard);

  return notecard;
}

function createElement(notecard) {
  // make a clone of the notecard template
  const template = document.querySelector('#notecard-template');
  const clone = template.content.cloneNode(true);
  
  // connect this clone to our notecard.element
  // from this point we only need to refer to notecard.element
  notecard.element = clone.querySelector('.notecard');

  const btnDelete = notecard.element.querySelector('.icon-delete');
  console.log(btnDelete);
  btnDelete.addEventListener('click', () => {
    deleteNote(notecard);
  });
  
  // add the notecard clone to the DOM
  // find the notecard parent (#notecard-list) and add our notecard as its child
  const notecardListElement = document.querySelector('#notecard-list');
  notecardListElement.prepend(notecard.element);
  
  // populate the notecard clone with the actual notecard content
  updateElement(notecard);
}

function updateElement(notecard) {
  // get the HTML elements that need updating
  const noteImageElement = notecard.element.querySelector('.notecard-thumbnail');
  const noteTitleElement = notecard.element.querySelector('.note-title');
  const noteBodyElement = notecard.element.querySelector('.note-body');
  
  // copy our notecard content over to the corresponding HTML elements
  noteImageElement.src = notecard.noteImageURL;
  noteTitleElement.innerText = notecard.noteTitle;
  noteBodyElement.innerText = notecard.noteBody;
}

function deleteNote(notecard) {
  // remove the notecard DOM object from the UI
  notecard.element.remove();

  // remove the actual Notecard object from our set of notecards
  notecardSet.delete(notecard);
}


/**** EXERCISE 6 CODE BELOW ***************************************************/

function submitNote() {
  let titleElement = document.querySelector('#note-editor-title'); //accesses the box
  let title = titleElement.value; //accesses the content inside the box

  let bodyElement = document.querySelector('#note-editor-body');
  let body = bodyElement.value;

  let imageElement = document.querySelector('#note-editor-image');
  let imageURL = imageElement.src;

  let notecard = addNewNote(imageURL, title, body);
  createElement(notecard);

  console.log("Submitted Note!");
  saveToLocalStorage();
}

//convert notecard set to a string and save to local storage
function saveToLocalStorage() {
  let notecardArray = Array.from(notecardSet); //array.from is a static method creates a new, shallow-copied Array instance from an iterable or array-like object.
  console.log(notecardArray); //the array

  let notecardJSON = JSON.stringify(notecardArray);
  console.log(notecardJSON); //the string of the array from above

  localStorage.setItem('storedNotes', notecardJSON); //where storedNotes is the key and notecardJSON is the thing you want to save
  //can check in the application tab to see what you saved in the local storage
  //at this point, it will be in local storage but it wont be there when reload because you need to retrieve it
  //call this func in submitnote so every time a note is submited it is saved
}

function retrieveFromLocalStorage() {
  let notecardJSON = localStorage.getItem('storedNotes');

  if (notecardJSON == null) {
    return;
  }

  let notecardArray = JSON.parse(notecardJSON); //reverse stringify it using parse

  for (let noteData of notecardArray) { //allows us to create instances of the notecard class, if we dont do this they will just be generic objects
    let notecard = addNewNote(noteData.noteImageURL, noteData.noteTitle, noteData.noteBody);
    createElement(notecard);
  }
}  

retrieveFromLocalStorage();