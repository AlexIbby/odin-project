/*Checking if Books Dont Exist in Local Stroage, if not set to an string array*/

if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify([]));
}

console.log(localStorage.getItem('books'))
updateContainerHeight();

/*********************************************
 *            Delcaring Variables            *
 *********************************************/

/*Add Book Area*/
const addBookContainer = document.querySelector(".add-book-container");
const addBookBtn = document.getElementById("add-book-btn")

/*Add Book Form*/
const form = document.querySelector('.add-book-form');

/*Sort Library Buttons*/
const sortTitleBtn = document.getElementById("sort-title")
const sortAuthorBtn = document.getElementById("sort-author")
const sortPagesBtn = document.getElementById("sort-pages")
const deleteBtns = document.getElementsByClassName("delete-btn");
const hamburgerMenuBtn = document.getElementById("hamburger-click")



/*********************************************
 *            Event Listners                 *
 *********************************************/

addBookBtn.addEventListener("click", addBook);
sortTitleBtn.addEventListener("click", sortTitle )
sortAuthorBtn.addEventListener("click", sortAuthor)
sortPagesBtn.addEventListener("click", sortPages)
hamburgerMenuBtn.addEventListener("click", hamburgerOpenClose)


/*********************************************
 *            Functions                      *
 *********************************************/

/*Hides and Shows the add book form*/

function addBook(){
    
    if (addBookContainer.classList.contains('hide-form')) {
        addBookContainer.classList.remove('hide-form');
        addBookBtn.innerText = "Hide"
    } else {
        addBookContainer.classList.add('hide-form');
        addBookBtn.innerHTML = '<span id="plus-sign">+</span>Add a Book'
    }
    
}


/*Dynamically resize for mobile*/

/*Processing the Form and adding the book*/

form.addEventListener('submit', async function(event) {
    // Prevent the form from actually submitting 
    event.preventDefault();

    let bookTitle = document.querySelector('#book-title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').value;
    let cover = await getBookCoverByTitle(bookTitle)

    //Construct the book
    let newBook = new Book(bookTitle, author, pages, read, cover)

    addToLocalStorage(newBook)
    addBookCards() 
    
});



/*Object Constructor for Book Objects*/


function Book(bookTitle, author, pages, read, cover){
    this.bookTitle = bookTitle;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.cover = cover 
}

/*Fetch to Grab Book Cover URL from Open Books*/


async function getBookCoverByTitle(title) {
    const BASE_URL = 'http://openlibrary.org/search.json?q=';
    
    try {
      // Fetch search results for the given title
      const response = await fetch(`${BASE_URL}${encodeURIComponent(title)}`);
      const data = await response.json();
      
      // Ensure there are results and a cover ID
      if (data.docs && data.docs.length > 0 && data.docs[0].cover_i) {
        const coverId = data.docs[0].cover_i;
        
        // Construct the URL for the medium-sized cover
        const coverUrl = `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  
        console.log('Cover URL:', coverUrl);  // Log the cover URL to the console
  
        return coverUrl;
      } else {
        throw new Error('No cover found for this title.');
      }
    } catch (error) {
      console.error('Error fetching book cover:', error);
      return null;
    }
  }
  

/*Adding Books to Local Stroage*/

function addToLocalStorage(book) {
    let storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    storedBooks.push(book);
    localStorage.setItem('books', JSON.stringify(storedBooks));
  }

function getBooks() {
    let books = localStorage.getItem('books');

    if (books) {
        return JSON.parse(books);
    } else {
        return [];
    }
}

// Set the books to localStorage
function setBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}


function showBooks(){

    let storedBooks = JSON.parse(localStorage.getItem('books')) || [];

}


function addBookCards() {
    // Retrieve the books data from localStorage
    const storedBooks = localStorage.getItem('books');
    const books = storedBooks ? JSON.parse(storedBooks) : [];

    // Construct the cards HTML
    let cardsHtml = '';
    
    for (const book of books) {
        const readIconSrc = book.read === 'yes' ? '/images/read-yes.png' : '/images/read-no.png';
        const readIconAlt = book.read === 'yes' ? 'Has been read' : 'Not read yet';

        cardsHtml += `
            <div class="book-card">
                <img class="book-cover-card" src="${book.cover}" alt="${book.bookTitle} Cover">
                <p class="title-card">${book.bookTitle}</p>
                <p class="author-card">${book.author}</p>
                <p class="number-card">${book.pages} Pages</p>
                <p class="read-container">Read:  <img class="read-icon" src="${readIconSrc}" alt="${readIconAlt}"></p>
                <div>
                    <button class="delete-btn" >Remove</button>
                    <button id="edit-btn" >Edit</button>
                </div>
            </div>
        `;
    }

    // Add the constructed HTML to the library div
    const libraryElement = document.querySelector('.library');
    libraryElement.innerHTML = cardsHtml;

    // Add event listeners to all delete buttons after adding the cards
    const deleteBtns = document.getElementsByClassName("delete-btn");
    for (let btn of deleteBtns) {
            btn.addEventListener("click", deleteBook);
    }
}


function sortTitle(){
    const storedBooks = localStorage.getItem('books');
    const books = storedBooks ? JSON.parse(storedBooks) : [];

    // Sorting the books by title
    books.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));

    let cardsHtml = '';

    for (const book of books) {
        const readIconSrc = book.read === 'yes' ? '/images/read-yes.png' : '/images/read-no.png';
        const readIconAlt = book.read === 'yes' ? 'Has been read' : 'Not read yet';

        cardsHtml += `
            <div class="book-card">
                <img class="book-cover-card" src="${book.cover}" alt="${book.bookTitle} Cover">
                <p class="title-card">${book.bookTitle}</p>
                <p class="author-card">${book.author}</p>
                <p class="number-card">${book.pages} Pages</p>
                <p class="read-container">Read:  <img class="read-icon" src="${readIconSrc}" alt="${readIconAlt}"></p>
                <div>
                    <button class="delete-btn" >Remove</button>
                    <button id="edit-btn" >Edit</button>
                </div>
            </div>
        `;
    }


    // Add the constructed HTML to the library div
    const libraryElement = document.querySelector('.library');
    libraryElement.innerHTML = cardsHtml;
}

function sortAuthor(){
    const storedBooks = localStorage.getItem('books');
    const books = storedBooks ? JSON.parse(storedBooks) : [];

    // Sorting the books by title
    books.sort((a, b) => a.author.localeCompare(b.author));

    let cardsHtml = '';

    for (const book of books) {
        const readIconSrc = book.read === 'yes' ? '/images/read-yes.png' : '/images/read-no.png';
        const readIconAlt = book.read === 'yes' ? 'Has been read' : 'Not read yet';

        cardsHtml += `
            <div class="book-card">
                <img class="book-cover-card" src="${book.cover}" alt="${book.bookTitle} Cover">
                <p class="title-card">${book.bookTitle}</p>
                <p class="author-card">${book.author}</p>
                <p class="number-card">${book.pages} Pages</p>
                <p class="read-container">Read:  <img class="read-icon" src="${readIconSrc}" alt="${readIconAlt}"></p>
                <div>
                    <button class="delete-btn" >Remove</button>
                    <button id="edit-btn" >Edit</button>
                </div>
            </div>
        `;
    }


    // Add the constructed HTML to the library div
    const libraryElement = document.querySelector('.library');
    libraryElement.innerHTML = cardsHtml;
}


function sortPages() {
    const storedBooks = localStorage.getItem('books');
    const books = storedBooks ? JSON.parse(storedBooks) : [];

    // Check current sorting order from localStorage
    const currentSortOrder = localStorage.getItem('sortOrder') || "ascending";

    if (currentSortOrder === "ascending") {
        // If it's currently ascending, sort descending
        books.sort((a, b) => parseInt(b.pages) - parseInt(a.pages));
        localStorage.setItem('sortOrder', "descending");
        sortPagesBtn.innerText = "No. of Pages (Ascending)"
        
    } else {
        // If it's currently descending or not set, sort ascending
        books.sort((a, b) => parseInt(a.pages) - parseInt(b.pages));
        localStorage.setItem('sortOrder', "ascending");
        sortPagesBtn.innerText = "No. of Pages (Descending)"
    }

    let cardsHtml = '';
    for (const book of books) {
        const readIconSrc = book.read === 'yes' ? '/images/read-yes.png' : '/images/read-no.png';
        const readIconAlt = book.read === 'yes' ? 'Has been read' : 'Not read yet';

        cardsHtml += `
            <div class="book-card">
                <img class="book-cover-card" src="${book.cover}" alt="${book.bookTitle} Cover">
                <p class="title-card">${book.bookTitle}</p>
                <p class="author-card">${book.author}</p>
                <p class="number-card">${book.pages} Pages</p>
                <p class="read-container">Read:  <img class="read-icon" src="${readIconSrc}" alt="${readIconAlt}"></p>
                <div>
                    <button class="delete-btn" >Remove</button>
                    <button id="edit-btn" >Edit</button>
                </div>
            </div>
        `;
    }


    // Add the constructed HTML to the library div
    const libraryElement = document.querySelector('.library');
    libraryElement.innerHTML = cardsHtml;
}


function deleteBook(event) {
    const bookCard = event.target.closest(".book-card");

    // Extract book details from the bookCard
    const bookTitle = bookCard.querySelector(".title-card").textContent;
    const author = bookCard.querySelector(".author-card").textContent;

    // Store the book details in data attributes for later use
    const confirmModal = document.getElementById("confirmModal");
    confirmModal.setAttribute('data-book-title', bookTitle);
    confirmModal.setAttribute('data-book-author', author);

    // Show the confirmation modal
    confirmModal.style.display = "block";
}



document.getElementById("confirmDelete").addEventListener("click", function() {
    // Fetch the book details using the data attributes stored in the modal
    const confirmModal = document.getElementById("confirmModal");
    const bookTitle = confirmModal.getAttribute('data-book-title');
    const author = confirmModal.getAttribute('data-book-author');

    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");

    const updatedBooks = storedBooks.filter(book => {
        return book.bookTitle !== bookTitle || book.author !== author;
    });

    localStorage.setItem("books", JSON.stringify(updatedBooks));

    // Find the book-card to delete based on the title. 
    // We loop through all .title-card elements to find a match.
    const titleCards = document.querySelectorAll(".title-card");
    for (let titleCard of titleCards) {
        if (titleCard.textContent === bookTitle) {
            const bookCardToDelete = titleCard.closest(".book-card");
            if (bookCardToDelete) {
                bookCardToDelete.remove();
                break;  // once found, no need to continue the loop
            }
        }
    }

    // Close the modal
    confirmModal.style.display = "none";
});

document.getElementById("cancelDelete").addEventListener("click", function(){
    const confirmModal = document.getElementById("confirmModal");
    confirmModal.style.display = "none";
})



//Edit Modal Work
// Function to open the modal
function openModal(book) {
    document.getElementById("edit-title").value = book.bookTitle;
    document.getElementById("edit-author").value = book.author;
    document.getElementById("edit-pages").value = book.pages + " Pages";
    document.getElementById("edit-read").value = book.read.toLowerCase() === "yes" ? "yes" : "no";
    document.getElementById("editModal").style.display = "block";
}

// Getting books from localStorage
function getBooksFromStorage() {
    let books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

// Event Listener for the Edit button
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'edit-btn') {
        // Get the book title from the respective card
        let title = e.target.parentElement.parentElement.querySelector('.title-card').innerText;
        let books = getBooksFromStorage();
        let book = books.find(b => b.bookTitle === title);
        
        if (book) {
            openModal(book);
        }
    }
});

// Function to close the modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// Event Listener for the Cancel button
document.getElementById("cancel-edit").addEventListener("click", function() {
    closeModal();
});

function updateBookInStorage(bookTitle, updatedBook) {
    // Get the current list of books from localStorage
    let books = getBooksFromStorage();
    
    // Find the index of the book to be updated
    let bookIndex = books.findIndex(b => b.bookTitle === bookTitle);

    // If the book was found, update its details
    if (bookIndex !== -1) {
        // Save the current cover value
        let currentCover = books[bookIndex].cover;
        
        // Set the cover value to the updatedBook
        updatedBook.cover = currentCover;

        // Now, update the book details in the array
        books[bookIndex] = updatedBook;
    }

    // Save the updated list back to localStorage
    localStorage.setItem('books', JSON.stringify(books));
}


document.getElementById("submit-edit").addEventListener("click", function() {
    // Get the original book title
    let originalTitle = document.getElementById("edit-title").value;

    // Fetch updated values from the modal
    
    let updatedTitle = document.getElementById("edit-title").value;
    let updatedAuthor = document.getElementById("edit-author").value;
    let updatedPages = document.getElementById("edit-pages").value.replace(' Pages', ''); // Remove the " Pages" text
    let updatedRead = document.getElementById("edit-read").value;

    // Create an updated book object
    let updatedBook = {
        bookTitle: updatedTitle,
        author: updatedAuthor,
        pages: updatedPages,
        read: updatedRead
    };

    // Update the book in localStorage
    updateBookInStorage(originalTitle, updatedBook);

    // Refresh or update the UI to reflect the changes (if you have a function for this)
    addBookCards()

    // Close the modal after updating
    closeModal();
});


function hamburgerOpenClose(){

    
    const menuItems = document.querySelector(".menu-item-container")
    const userProfileInfo = document.querySelector(".header-books-right")
    
    if (menuItems.style.display === "none" || menuItems.style.display === "") {
        // If menuItems is not displayed, show it
        menuItems.style.display = "block";
    } else {
        // If menuItems is displayed, hide it
        menuItems.style.display = "none";
    }

    if (userProfileInfo.style.display === "none" || userProfileInfo.style.display === "") {
        // If userProfileInfo is not displayed, show it
        userProfileInfo.style.display = "flex";
  
    } else {
        // If userProfileInfo is displayed, hide it
        userProfileInfo.style.display = "none";

    }

}

window.addEventListener('resize', function() {
    const menuItems = document.querySelector(".menu-item-container");
    const userProfileInfo = document.querySelector(".header-books-right");
    
    // Check the screen width
    if (window.innerWidth > 521) {
        // For screens wider than 521px, always display the elements
        menuItems.style.display = "block";
        userProfileInfo.style.display = "flex";
    }

    if (window.innerWidth < 521) {
        // For screens wider than 521px, always display the elements
        menuItems.style.display = "none";
        userProfileInfo.style.display = "none";
    }
});

function hamburgerOpenClose(){
    
    const menuItems = document.querySelector(".menu-item-container");
    const userProfileInfo = document.querySelector(".header-books-right");
    
    if (menuItems.style.display === "none" || menuItems.style.display === "") {
        // If menuItems is not displayed, show it
        menuItems.style.display = "block";
    } else {
        // If menuItems is displayed, hide it
        menuItems.style.display = "none";
    }

    if (userProfileInfo.style.display === "none" || userProfileInfo.style.display === "") {
        // If userProfileInfo is not displayed, show it
        userProfileInfo.style.display = "flex";
    } else {
        // If userProfileInfo is displayed, hide it
        userProfileInfo.style.display = "none";
    }
}

/*Function to Resize for Sticky Positioning*/
function updateContainerHeight() {
    const container = document.querySelector('.container');
    
    // Check if screen width is under 520px
    if (window.innerWidth <= 520) {
        const bodyHeight = document.body.scrollHeight;
        container.style.minHeight = `${bodyHeight + 5}px`;
    } else {
        container.style.minHeight = ''; // Reset to default value when screen is wider than 520px
    }
}



// Call the functions needed on page load
window.addEventListener('DOMContentLoaded', addBookCards);
window.addEventListener('resize', updateContainerHeight);
