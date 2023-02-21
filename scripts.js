const myLibrary = [];
const counter = 0;
const bookContainer = document.getElementById("book-container");
const bookCount = document.querySelector(".book-count .value");

function Book(title, author, pages, status) {
  this.id = counter;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function renderBook(book) {
  const cardCell = document.createElement("div");
  cardCell.classList.add("cards-cell");
  cardCell.id = `cards-cell-${book.id}`;

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

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("card-buttons");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    // eslint-disable-next-line no-use-before-define
    deleteBook(book.id);
    bookContainer.removeChild(cardCell);
    // eslint-disable-next-line no-use-before-define
    updateBookCount();
  });

  const readButton = document.createElement("button");
  readButton.classList.add("card-buttons");
  readButton.textContent = "Change";
  readButton.addEventListener("click", () => {
    if (book.status === "Not Read") {
      // eslint-disable-next-line no-param-reassign
      book.status = "Read";
    } else {
      // eslint-disable-next-line no-param-reassign
      book.status = "Not Read";
    }
    status.textContent = book.status;
  });

  const buttonList = document.createElement("ul");
  buttonList.classList.add("card-buttons-list");
  const deleteButtonLi = document.createElement("li");
  const readButtonLi = document.createElement("li");
  deleteButtonLi.appendChild(deleteButton);
  readButtonLi.appendChild(readButton);
  buttonList.appendChild(deleteButtonLi);
  buttonList.appendChild(readButtonLi);

  card.appendChild(cardList);
  card.appendChild(buttonList);
  cardCell.appendChild(card);
  bookContainer.appendChild(cardCell);
}

function updateBookCount() {
  bookCount.textContent = myLibrary.length;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderBook(book);
  updateBookCount();
}

function deleteBook(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  myLibrary.splice(bookIndex, 1);
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

addBookButton.addEventListener("click", () => {
  showModal();
});

function hideModal() {
  modal.style.display = "none";
}

function validateForm(title, author, pages) {
  if (title === "" || author === "" || pages === "") {
    alert("Please fill in all fields.");
    return false;
  }
  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pageInput.value;
  const status = statusSelect.value;

  if (validateForm(title, author, pages)) {
    const book = new Book(title, author, pages, status);
    addBookToLibrary(book);
    hideModal();
    form.reset();
  }
});
