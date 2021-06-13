class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Elements
const UIalert = document.querySelector('#alert');

const UIform = document.querySelector('form');
const UIinputTitle = document.querySelector('#title');
const UIinputAuthor = document.querySelector('#author');
const UIinputISBN = document.querySelector('#isbn');

const UIinputFilterSelector = document.querySelector('#filter-by');
const UIinputFilter = document.querySelector('#filter-input');

const UItable = document.querySelector('.card table');

// SECONDARY FUNCTIONS

function callAlert(color, message) {

    UIalert.classList.add(color);
    UIalert.firstElementChild.textContent = message;
    window.setTimeout(function () {
        UIalert.classList.remove(color);
        UIalert.firstElementChild.textContent = '';

    }, 2000);
}

function getLS() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

// MAIN FUNCTIONS

function addBook(e) {

    if (UIinputTitle.value === '' || UIinputAuthor.value === '' || UIinputISBN.value === '') {
        callAlert('red', 'Please enter all inputs');
        
    } else {
        const book = new Book(UIinputTitle.value, UIinputAuthor.value, UIinputISBN.value);

        UI.addBook(book);
        LS.addBook(book);
    }

    e.preventDefault();
}

function deleteBook(e) {

    if (e.target.parentElement.className === 'delete') {
        UI.deleteBook(e);
        LS.deleteBook(e);
    }

    e.preventDefault();
}

function filterBooks(e) {
    const textUser = e.target.value.toLowerCase();
    const filterSelector = UIinputFilterSelector.value;
    const items = Array.from(UItable.lastElementChild.children);

    items.forEach(function (item) {
        let textElement;

        if (filterSelector === 'title') {
            textElement = item.children[0].textContent.toLowerCase();
        }

        if(filterSelector === 'author') {
            textElement = item.children[1].textContent.toLowerCase();
        }

        if(filterSelector === 'isbn') {
            textElement = item.children[2].textContent.toLowerCase();
            
        }
        if (textElement.indexOf(textUser) != -1) {
            item.style.display = 'table-row';
        } else {
            item.style.display = 'none';
        }
    });

}

// DOM AND LOCAL STORAGE FUNCTIONS

const UI = {
    addBook(book, alert) {

        if (alert == undefined) {
            callAlert('green', 'Book added');
        }

        // creating elements
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');

        // preparing elements
        td1.textContent = book.title;
        td2.textContent = book.author;
        td3.textContent = book.isbn;
        td4.innerHTML = '<a href="#" class="delete"><i class="fas fa-minus-circle"></i></a>';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        // last append
        UItable.lastElementChild.appendChild(tr);

        // reset inputs
        UIinputTitle.value = '';
        UIinputAuthor.value = '';
        // '' or null?
        UIinputISBN.value = null;

    },

    deleteBook(e) {
        e.target.parentElement.parentElement.parentElement.remove();
        callAlert('red', 'Book deleted');

    }
}

const LS = {

    booksLS: getLS(),

    addBook(book) {
        this.booksLS.push(book);
        localStorage.setItem('books', JSON.stringify(this.booksLS));
    },

    deleteBook(e) {
        const isbn = e.target.parentElement.parentElement.parentElement.children[2].textContent;

        this.booksLS.forEach(function (book, index) {
            if (book.isbn === isbn) {
                LS.booksLS.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(this.booksLS));
    },

    reload() {

        LS.booksLS.forEach(function (book) {

            UI.addBook(book, true);
        });
    }
}


// Listeners

UIform.addEventListener('submit', addBook);
UItable.addEventListener('click', deleteBook);
document.addEventListener('DOMContentLoaded', LS.reload);
UIinputFilter.addEventListener('keyup', filterBooks);
