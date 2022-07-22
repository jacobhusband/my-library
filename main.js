const addBookButton = document.getElementById("submit");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pageCount = document.getElementById("page-count");
const finished = document.getElementById("finished");
const summary = document.getElementById("summary");
const modal = document.getElementById("myModal");
const closeModal = document.getElementById("close-modal");

let library = [];

addBookButton.addEventListener("click", (event) => {
  // Update book object
  let bookObj = {
    title: title.value,
    author: author.value,
    pageCount: pageCount.value,
    finished: finished.checked,
    summary: summary.value,
  };

  // Hide modal
  modal.style.display = "none";

  updateBookshelf(bookObj);
});

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function updateBookshelf(bookObj = undefined) {
  let count = 1;

  if (bookObj !== undefined) {
    // Add book object to library
    library.push(bookObj);
  }

  // Remove all cards from bookshelf
  const rowElement = document.getElementsByClassName("row")[0];
  let cardElements = Array.from(document.getElementsByClassName("card"));
  cardElements.forEach((card) => {
    rowElement.removeChild(card);
  });

  // Add all books to bookshelf
  library.forEach((book) => {
    // Create a counter for book objects
    addToBookshelf(book.title, count, book.finished);
    count++;
  });

  createAndAddPlusCard(rowElement);
  listenForNewBook();
}

function createAndAddPlusCard(rowElement) {
  // Create plus card
  const newBookCardAddition = document.createElement("div");
  const newBookParagraphAddition = document.createElement("p");
  newBookCardAddition.className = "card";
  newBookCardAddition.id = "new-book";
  newBookParagraphAddition.id = "add-book";
  newBookParagraphAddition.textContent = "+";

  // Add plus card
  newBookCardAddition.appendChild(newBookParagraphAddition);
  rowElement.appendChild(newBookCardAddition);
}

function addToBookshelf(title, count, finished = false) {
  // Create DOM elements to make book card
  const card = document.createElement("div");
  const cardTitle = document.createElement("p");
  const checkboxLabel = document.createElement("label");
  const checkboxInput = document.createElement("input");
  const checkboxSpan = document.createElement("span");
  const cardButtons = document.createElement("div");
  const cardInfoButton = document.createElement("button");
  const cardRemoveButton = document.createElement("button");
  const newBookCard = document.createElement("div");
  const addBookCard = document.createElement("p");

  if (finished === true) {
    checkboxInput.checked = true;
    card.style.borderColor = "rgba(0, 95, 16, 0.5)";
  }

  // Add classes, ids, and data types to elements
  card.className = "card";
  card.dataset.id = `${count}`;
  cardTitle.className = "card-content";
  cardTitle.textContent = title;
  checkboxLabel.className = "checkbox cardcheck";
  checkboxInput.type = "checkbox";
  checkboxInput.className = "cardcheck";
  checkboxSpan.className = "finished";
  cardButtons.className = "card-buttons";
  cardInfoButton.className = "info-button card-button";
  cardInfoButton.textContent = "Info";
  cardRemoveButton.className = "remove-button card-button";
  cardRemoveButton.textContent = "Remove";
  newBookCard.className = "card";
  newBookCard.id = "new-book";
  addBookCard.id = "add-book";
  addBookCard.textContent = "+";

  // // Remove plus card
  const newBookRowElement = document.getElementsByClassName("row")[0];
  // const newBookCardElement = document.getElementById("new-book");
  // console.log(newBookRowElement);
  // newBookRowElement.removeChild(newBookCardElement);

  // Add card DOM structure and append to parent
  checkboxLabel.append(checkboxInput, checkboxSpan);
  cardButtons.append(cardInfoButton, cardRemoveButton);
  card.append(cardTitle, checkboxLabel, cardButtons);
  newBookRowElement.appendChild(card);

  // // Create new plus card
  // const newBookCardAddition = document.createElement("div");
  // const newBookParagraphAddition = document.createElement("p");
  // newBookCardAddition.className = "card";
  // newBookCardAddition.id = "new-book";
  // newBookParagraphAddition.id = "add-book";
  // newBookParagraphAddition.textContent = "+";
  // newBookCardAddition.appendChild(newBookParagraphAddition);
  // newBookRowElement.appendChild(newBookCardAddition);

  // Add event listeners for the new book and all the checkboxes
  listenForCheckboxClicks();
  listenForRemoveClicks();
}

function listenForNewBook() {
  let newBook = document.getElementById("new-book");
  newBook.addEventListener("click", (event) => {
    modal.style.display = "block";
  });
}

function listenForCheckboxClicks() {
  let checkboxes = Array.from(document.getElementsByClassName("cardcheck"));
  checkboxes[checkboxes.length - 1].addEventListener("click", (event) => {
    let title = event.target.parentNode.parentNode.firstChild.textContent;
    updateCardBorderColor(event);
    searchLibraryByTitle(title, event.target.checked);
  });
}

function listenForRemoveClicks() {
  let removeButtons = Array.from(
    document.getElementsByClassName("remove-button")
  );
  removeButtons[removeButtons.length - 1].addEventListener("click", (event) => {
    let cardParent = event.currentTarget.parentNode.parentNode;
    library.splice(cardParent.dataset.id - 1, 1);
    updateBookshelf();
  });
}

function searchLibraryByTitle(title, finished) {
  library.forEach((book) => {
    if (book.title === title) {
      book.finished = finished;
    }
  });
}

function listenForInfoClicks() {
  let infoButtons = Array.from(document.getElementsByClassName("info-button"));
  infoButtons[infoButtons.length - 1].addEventListener("click", (event) => {
    let cardParent = event.currentTarget.parentNode.parentNode;
    library.splice(cardParent.dataset.id - 1, 1);
    updateBookshelf();
  });
}

function populateModal() {}

function updateCardBorderColor(event) {
  if (event.target.checked) {
    event.currentTarget.parentNode.parentNode.style.borderColor =
      "rgba(0, 95, 16, 0.5)";
  } else {
    event.currentTarget.parentNode.parentNode.style.borderColor =
      "rgba(255, 2, 2, 0.5)";
  }
}

listenForNewBook();
