// Wait for the window to load
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
});

// Blueprint for making the library with classes

// Create a class for the bookshelf
class Bookshelf {
  static dom = document.getElementById("bookshelf");
  static newBook = this.dom.querySelector("#new-book");
  static cardRow = this.dom.querySelector("#card-row");

  constructor() {
    this.cards = [];
  }

  addNewBookListener(func) {
    Bookshelf.newBook.addEventListener("click", func);
  }

  addBookButtonListener(func) {
    Modal.addBook.addEventListener("click", func.bind(this));
  }

  updateBookButtonListener(func) {
    Modal.updateBook.addEventListener("click", func.bind(this));
  }

  createNewCard() {
    let card = new Card(
      Modal.title.value,
      Modal.author.value,
      Modal.pageCount.value,
      Modal.finished.checked,
      Modal.summary.value
    );
    this.cards.push(card);
  }

  updateCard() {
    modal.currentCard.title = Modal.title.value;
    modal.currentCard.author = Modal.author.value;
    modal.currentCard.pageCount = Modal.pageCount.value;
    modal.currentCard.finished = Modal.finished.checked;
    modal.currentCard.summary = Modal.summary.value;

    modal.currentCard.modifyDOMElements();
  }

  removeCard() {
    let index = bookshelf.cards.indexOf(this);
    bookshelf.cards.splice(index, 1);
  }
}

// Create a class for the card
class Card {
  constructor(title, author, pageCount, finished, summary) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.finished = finished;
    this.summary = summary;
    this.createDOMElements();
    this.modifyDOMElements();
    this.addDOMElementsToBookshelf();

    // Listeners
    // Remove button
    this.cardRemoveButton.addEventListener(
      "click",
      this.removeDOMElementsFromBookshelf.bind(this)
    );
    this.cardRemoveButton.addEventListener(
      "click",
      bookshelf.removeCard.bind(this)
    );

    // Info button
    this.cardInfoButton.addEventListener(
      "click",
      this.showInfoModal.bind(this)
    );
  }

  createDOMElements() {
    // Create DOM elements to make book card
    this.card = document.createElement("div");
    this.cardTitle = document.createElement("p");
    this.checkboxLabel = document.createElement("label");
    this.checkboxInput = document.createElement("input");
    this.checkboxSpan = document.createElement("span");
    this.cardButtons = document.createElement("div");
    this.cardInfoButton = document.createElement("button");
    this.cardRemoveButton = document.createElement("button");
  }

  modifyDOMElements() {
    if (this.finished) {
      this.checkboxInput.checked = true;
      this.card.style.borderColor = "rgba(0, 95, 16, 0.5)";
    }

    // Add classes, ids, and data types to elements
    this.card.className = "card";
    this.cardTitle.className = "card-content";
    this.cardTitle.textContent = this.title;
    this.checkboxLabel.className = "checkbox cardcheck";
    this.checkboxInput.type = "checkbox";
    this.checkboxInput.className = "cardcheck";
    this.checkboxSpan.className = "finished";
    this.cardButtons.className = "card-buttons";
    this.cardInfoButton.className = "info-button card-button";
    this.cardInfoButton.textContent = "Info";
    this.cardRemoveButton.className = "remove-button card-button";
    this.cardRemoveButton.textContent = "Remove";
  }

  addDOMElementsToBookshelf() {
    // Add card DOM structure and append to parent
    this.checkboxLabel.append(this.checkboxInput, this.checkboxSpan);
    this.cardButtons.append(this.cardInfoButton, this.cardRemoveButton);
    this.card.append(this.cardTitle, this.checkboxLabel, this.cardButtons);
    Bookshelf.cardRow.insertBefore(this.card, Bookshelf.newBook);

    // Give the checkbox a listener
    this.checkboxInput.addEventListener("input", () => {
      if (this.checkboxInput.checked) {
        this.card.style.borderColor = "rgba(0, 95, 16, 0.5)";
      } else {
        this.card.style.borderColor = "rgba(255, 2, 2, 0.5)";
      }
    });
  }

  removeDOMElementsFromBookshelf() {
    Bookshelf.cardRow.removeChild(this.card);
  }

  showInfoModal() {
    modal.showModal();
    modal.changeText(true);
    modal.populateInputs(this);
  }
}

// Create a super class for modal
class Modal {
  static dom = document.getElementById("modal");
  static addBook = this.dom.querySelector("#add-book-button");
  static updateBook = this.dom.querySelector("#update-book-button");
  static xButton = this.dom.querySelector("#close-modal");
  static title = this.dom.querySelector("#title");
  static author = this.dom.querySelector("#author");
  static pageCount = this.dom.querySelector("#page-count");
  static finished = this.dom.querySelector("#finished");
  static summary = this.dom.querySelector("#summary");

  constructor() {
    this.keywords = ["title", "author", "page-count", "summary"];
    this.addListeners();
  }

  showModal() {
    Modal.dom.style.display = "block";
    Modal.dom.querySelector("#title").focus();
    modal.changeText(false);
  }

  addListeners() {
    for (let word of this.keywords) {
      Modal.dom
        .querySelector(`#${word}`)
        .addEventListener("keypress", (event) => {
          if (event.key === "Enter") {
            if (Modal.addBook.style.display === "block") {
              bookshelf.createNewCard();
            } else {
              bookshelf.updateCard();
            }
            modal.hideModal();
          }
        });
    }
  }

  hideModal() {
    Modal.dom.style.display = "none";
    this.changeModalInput(["", "", "", ""], false);
  }

  changeModalInput(values, checked) {
    for (const word of this.keywords) {
      Modal.dom.querySelector(`#${word}`).value =
        values[this.keywords.indexOf(word)];
    }
    Modal.dom.querySelector(`#finished`).checked = checked;
  }

  getModalInput(id) {
    if (Modal.dom.querySelector(`#${id}`).value) {
      Modal.dom.querySelector(`#${id}`).value;
    } else {
      Modal.dom.querySelector(`#${id}`).checked;
    }
  }

  addBookButtonListener(func) {
    Modal.addBook.addEventListener("click", func.bind(this));
  }

  updateBookButtonListener(func) {
    Modal.updateBook.addEventListener("click", func.bind(this));
  }

  closeModalButtonListener(func) {
    Modal.xButton.addEventListener("click", func.bind(this));
  }

  changeText(updateInfo) {
    if (updateInfo) {
      Modal.dom.querySelector("h1.modal-title").textContent = "Update Info";
      Modal.addBook.style.display = "none";
      Modal.updateBook.style.display = "block";
    } else {
      Modal.dom.querySelector("h1.modal-title").textContent = "New Book";
      Modal.addBook.style.display = "block";
      Modal.updateBook.style.display = "none";
    }
  }

  populateInputs(card) {
    const arr = [card.title, card.author, card.pageCount, card.summary];
    this.changeModalInput(arr, card.checked);
    this.currentCard = card;
  }
}

// Create instances
let bookshelf = new Bookshelf();
let modal = new Modal();

// Add listeners
bookshelf.addNewBookListener(modal.showModal);
bookshelf.addBookButtonListener(bookshelf.createNewCard);
modal.addBookButtonListener(modal.hideModal);
bookshelf.updateBookButtonListener(bookshelf.updateCard);
modal.updateBookButtonListener(modal.hideModal);
modal.closeModalButtonListener(modal.hideModal);
