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
const UItable = document.querySelector('.card table');

// Listener

UIform.addEventListener('submit', addBook);
UItable.addEventListener('click', deleteBook);


function addBook(e) {

    if (UIinputTitle.value === '' || UIinputAuthor.value === '' || UIinputISBN.value === '') {
        callAlert('red', 'Please enter all inputs');

    } else {

        callAlert('green', 'Book added');

        // creating book object
        const book = new Book(UIinputTitle.value, UIinputAuthor.value, UIinputISBN.value);


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
    }

    e.preventDefault();
}

function deleteBook(e) {
    
    if(e.target.parentElement.className === 'delete') {
        e.target.parentElement.parentElement.parentElement.remove();
        callAlert('red', 'Book deleted');
    }
    e.preventDefault();
}

function callAlert(color, message) {

    UIalert.classList.add(color);
    UIalert.firstElementChild.textContent = message;
    window.setTimeout(function () {
        UIalert.classList.remove(color);
        UIalert.firstElementChild.textContent = '';

    }, 2000);
}