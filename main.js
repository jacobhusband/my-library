const addBookButton = document.getElementById("submit");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pageCount = document.getElementById("page-count");
const finished = document.getElementById("finished");
const summary = document.getElementById("summary");

let bookObj = {
  title: "title",
  author: "author",
  pageCount: 1,
  imageURL: "imageURL",
  finished: false,
  summary: "summary",
};

addBookButton.addEventListener("click", (event) => {
  console.log(title.value);
  console.log(author.value);
  console.log(pageCount.value);
  console.log(finished.checked);
  console.log(summary.value);
});
