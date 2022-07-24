const addBookButton = document.getElementsByClassName("modal-button")[0];
const updateBookButton = document.getElementsByClassName("modal-button")[1];
const title = document.getElementById("title");
const author = document.getElementById("author");
const pageCount = document.getElementById("page-count");
const finished = document.getElementById("finished");
const summary = document.getElementById("summary");
const modal = document.getElementById("myModal");
const closeModal = document.getElementById("close-modal");

let library = [];
let count = 0;

updateBookButton.addEventListener("click", (event) => {
  updateBookInfo(index, event);
});

addBookButton.addEventListener("click", (event) => {
  // Create unique id for the book
  count++;

  // Create book object
  let bookObj = {
    title: title.value,
    author: author.value,
    pageCount: pageCount.value,
    finished: finished.checked,
    summary: summary.value,
    id: count,
  };

  // Send book object and id to the bookshelf
  updateBookshelf(bookObj, count);

  // Hide modal
  modal.style.display = "none";
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

function updateBookInfo(index, event) {
  const titleNode = event.currentTarget.parentNode.firstElementChild;
  const authorNode = titleNode.nextElementSibling;
  const pageCountNode = authorNode.nextElementSibling;
  const finishedNode = pageCountNode.nextElementSibling;
  const summaryNode = finishedNode.nextElementSibling;
  library[index].title = titleNode.value;
  library[index].author = authorNode.value;
  library[index].pageCount = pageCountNode.value;
  library[index].finished = finishedNode.firstElementChild.checked;
  library[index].summary = summaryNode.value;
  modal.style.display = "none";
  addBookButton.style.display = "block";
  updateBookButton.style.display = "none";
  updateBookshelf(undefined, library[index].id);
}

function updateBookshelf(bookObj = undefined, count) {
  if (bookObj != undefined) {
    // Add book object to library
    library.push(bookObj);
  }

  // Remove all books from bookshelf
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    document.getElementsByClassName("row")[0].removeChild(card);
  });

  // Add all books to bookshelf
  library.forEach((book) => {
    addToBookshelf(book.title, book.id, book.finished);
    // Add event listeners
    listenForCheckboxClicks();
    listenForInfoClicks();
    listenForRemoveClicks();
  });

  // Add plus card
  createAndAddPlusCard();
}

function createAndAddPlusCard() {
  // Create plus card
  const newBookCardAddition = document.createElement("div");
  const newBookParagraphAddition = document.createElement("p");
  newBookCardAddition.className = "card";
  newBookCardAddition.id = "new-book";
  newBookParagraphAddition.id = "add-book";
  newBookParagraphAddition.textContent = "+";

  // Add plus card
  newBookCardAddition.appendChild(newBookParagraphAddition);
  document.getElementsByClassName("row")[0].appendChild(newBookCardAddition);
  listenForNewBook();
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

  // Grab row element
  const newBookRowElement = document.getElementsByClassName("row")[0];

  // Add card DOM structure and append to parent
  checkboxLabel.append(checkboxInput, checkboxSpan);
  cardButtons.append(cardInfoButton, cardRemoveButton);
  card.append(cardTitle, checkboxLabel, cardButtons);
  newBookRowElement.appendChild(card);
}

function listenForNewBook() {
  let newBook = document.getElementById("new-book");
  newBook.addEventListener("click", (event) => {
    emptyModalInputs();
    showModal();
    showAddBookModalView();
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
    // Save the data id of the card clicked
    let currentCardId = event.target.parentNode.parentNode.dataset.id;

    // Find the index where the id of the book in the library matches the id of the card
    index = findIndexOfBook(currentCardId);

    // Remove the book with the matching id from the library
    library.splice(index, 1);

    // Show the new list of books
    updateBookshelf();
  });
}

function listenForInfoClicks() {
  let infoButtons = Array.from(document.getElementsByClassName("info-button"));
  infoButtons[infoButtons.length - 1].addEventListener("click", (event) => {
    // Open modal
    modal.style.display = "block";

    // Find ID
    let currentCardId = event.currentTarget.parentNode.parentNode.dataset.id;

    // Find index
    index = findIndexOfBook(currentCardId);

    // Change  title to Book Information
    document.getElementsByClassName("modal-title")[0].textContent =
      "Book Information";

    // Hide Add book button
    addBookButton.style.display = "none";

    // Show Update book button
    updateBookButton.style.display = "block";

    // Take info from library and change modal inputs
    updateModal(library[index]);

    // Update the info into the library array
    updateBookInfo(index);
  });
}

function searchLibraryByTitle(title, finished) {
  library.forEach((book) => {
    if (book.title === title) {
      book.finished = finished;
    }
  });
}

function updateCardBorderColor(event) {
  if (event.target.checked) {
    event.currentTarget.parentNode.parentNode.style.borderColor =
      "rgba(0, 95, 16, 0.5)";
  } else {
    event.currentTarget.parentNode.parentNode.style.borderColor =
      "rgba(255, 2, 2, 0.5)";
  }
}

function emptyModalInputs() {
  title.value = "";
  author.value = "";
  pageCount.value = "";
  finished.checked = false;
  summary.value = "";
}

function showModal() {
  modal.style.display = "block";
}

function showAddBookModalView() {
  document.getElementById("title").innerHTML = "New Book";
  document.getElementById("update-book-button").style.display = "none";
  document.getElementById("add-book-button").style.display = "block";
}

function findIndexOfBook(id) {
  for (let i = 0; i < library.length; i++) {
    if (id == library[i].id) {
      return i;
    }
  }
}

function updateModal(bookObj) {
  title.value = bookObj.title;
  author.value = bookObj.author;
  pageCount.value = bookObj.pageCount;
  finished.checked = bookObj.finished;
  summary.value = bookObj.summary;
}

listenForNewBook();
