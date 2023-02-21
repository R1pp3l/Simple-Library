const myLibrary = [];
let counter = 0;
const bookContainer = document.getElementById("book-container");

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function renderBook(book) {
  const cardCell = document.createElement("div");
  cardCell.classList.add("cards-cell");
  cardCell.id = `cards-cell-${counter}`;
  counter += 1;

  const card = document.createElement("div");
  card.classList.add("cards");

  const cardList = document.createElement("ul");
  cardList.classList.add("card-list");

  const title = document.createElement("li");
  title.classList.add("title");
  title.textContent = book.title;

  const author = document.createElement("li");
  author.classList.add("author");
  author.textContent = book.author;

  const pages = document.createElement("li");
  pages.classList.add("pages");
  pages.textContent = book.pages;

  const status = document.createElement("li");
  status.classList.add("read-status");
  status.textContent = book.status;

  cardList.appendChild(title);
  cardList.appendChild(author);
  cardList.appendChild(pages);
  cardList.appendChild(status);

  card.appendChild(cardList);
  cardCell.appendChild(card);
  bookContainer.appendChild(cardCell);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderBook(book);
}

const form = document.querySelector("form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pageInput = document.getElementById("pages-input");
const statusSelect = document.getElementById("status-read");
const addBookButton = document.querySelector(".add-button");
const modal = document.querySelector("#modal");

addBookButton.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

function showModal() {
  modal.style.display = "flex";
}

function hideModal() {
  modal.style.display = "none";
}

addBookButton.addEventListener("click", () => {
  showModal();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const page = pageInput.value;
  const status = statusSelect.value;
  const book = new Book(title, author, page, status);
  addBookToLibrary(book);
  hideModal();
});
