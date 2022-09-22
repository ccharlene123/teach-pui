class Notecard {
    title;
    body;
    imageURL;
    element;

    constructor (title, body, img, elementID) {//variable name doesnt have to match the declared above
        this.title = title;
        this.body = body;
        this.imageURL = img;
        this.element = document.querySelector(elementID); 
    }

    updateElement() {
        let noteTitleElement = this.element.querySelector(".note-title"); //looks within the object rather than referencing the html document -- use this.element instead of document.
        noteTitleElement.innerText = this.title;

        let noteBodyElement = this.element.querySelector(".note-body");
        noteBodyElement.innerText = this.body;

        let noteImageElement = this.element.querySelector(".notecard-thumbnail");
        noteImageElement.src = this.imageURL;
    }
}

let notecardOne = new Notecard (
    "This is the First Note", 
    "Here is the body of the first note",
    "assets/warhol-frog.png",
    "#notecard-one"
);

let notecardTwo = new Notecard (
    "This is the Second Note", 
    "Here is the body of the second note",
    "assets/warhol-butterfly.png",
    "#notecard-two"
);

let notecardThree = new Notecard (
    "This is the Third Note", 
    "Here is the body of the third note",
    "assets/warhol-ram.png",
    "#notecard-three"
);

let notecards = [
    notecardOne,
    notecardTwo,
    notecardThree
];

for (let i = 0; i < notecards.length; i += 1) {
    let notecard = notecards[i];
    notecard.updateElement();
}