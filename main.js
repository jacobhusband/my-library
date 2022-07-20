const addBookButton = document.getElementById("submit");
let bookObj = {
  title: "title",
  author: "author",
  pageCount: 1,
  imageURL: "imageURL",
  finished: false,
  summary: "summary",
};

addBookButton.addEventListener("click", () => {
  const title = document.getElementById("title").textContent;
  console.log(title);
});
