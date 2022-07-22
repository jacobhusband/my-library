const addBookButton = document.getElementById("submit");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pageCount = document.getElementById("page-count");
const finished = document.getElementById("finished");
const summary = document.getElementById("summary");
const modal = document.getElementById("myModal");
const closeModal = document.getElementById("close-modal");
let cardCount = 2;

createNewBook();

let bookObj = {
  title: "title",
  author: "author",
  pageCount: 1,
  imageURL: "imageURL",
  finished: false,
  summary: "summary",
};

let library = [];

addBookButton.addEventListener("click", (event) => {
  bookObj.title = title.value;
  bookObj.author = author.value;
  bookObj.pageCount = pageCount.value;
  bookObj.finished = finished.value;
  bookObj.summary = summary.value;
  library.push[bookObj];
  updateLibrary();
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

function updateLibrary() {
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

  card.className = "card";
  card["data-id"] = `${cardCount}`;
  cardTitle.className = "card-content";
  cardTitle.textContent = `${bookObj.title}`;
  checkboxLabel.className = "checkbox cardcheck";
  checkboxInput.type = "checkbox";
  checkboxSpan.className = "finished";
  cardButtons.className = "card-buttons";
  cardInfoButton.className = "remove-book";
  cardInfoButton.id = "info-button";
  cardInfoButton.textContent = "Info";
  cardRemoveButton.className = "remove-book";
  cardRemoveButton.id = "remove-button";
  cardRemoveButton.textContent = "Remove";
  newBookCard.className = "card";
  newBookCard.id = "new-book";
  addBookCard.id = "add-book";
  addBookCard.textContent = "+";

  const newBookRowElement = document.getElementsByClassName("row")[0];
  const newBookCardElement = document.getElementById("new-book");
  newBookRowElement.removeChild(newBookCardElement);
  checkboxLabel.append(checkboxInput, checkboxSpan);
  cardButtons.append(cardInfoButton, cardRemoveButton);
  card.append(cardTitle, checkboxLabel, cardButtons);
  newBookRowElement.appendChild(card);

  const newBookCardAddition = document.createElement("div");
  const newBookParagraphAddition = document.createElement("p");

  newBookCardAddition.className = "card";
  newBookCardAddition.id = "new-book";

  newBookParagraphAddition.id = "add-book";
  newBookParagraphAddition.textContent = "+";

  newBookCardAddition.appendChild(newBookParagraphAddition);
  newBookRowElement.appendChild(newBookCardAddition);
  createNewBook();
  cardCount++;
}

function createNewBook() {
  let newBook = document.getElementById("new-book");
  newBook.addEventListener("click", (event) => {
    modal.style.display = "block";
  });
  Array.from(document.getElementsByClassName("cardcheck")).forEach(
    (checkbox) => {
      checkbox.addEventListener("click", (event) => {
        updateCardBorderColor(event);
      });
    }
  );
}

function updateCardBorderColor(event) {
  if (event.target.checked) {
    event.currentTarget.parentNode.style.borderColor = "rgba(0, 95, 16, 0.5)";
  } else {
    event.currentTarget.parentNode.style.borderColor = "rgba(255, 2, 2, 0.5)";
  }
}
