/*Checking if Books Dont Exist in Local Stroage, if not set to an string array*/

if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify([]));
}

console.log(localStorage.getItem('books'))


/*********************************************
 *            Delcaring Variables            *
 *********************************************/

/*Add Book Area*/
const addBookContainer = document.querySelector(".add-book-container");
const addBookBtn = document.getElementById("add-book-btn")

/*Add Book Form*/
const form = document.querySelector('.add-book-form');


/*********************************************
 *            Event Listners                 *
 *********************************************/

addBookBtn.addEventListener("click", addBook);


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
        addBookBtn.innerText = "Add a Book"
    }
    
}


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
        cardsHtml += `
            <div class="book-card">
                <img class="book-cover-card" src="${book.cover}" alt="${book.Title} Cover">
                <p id="title-card">${book.bookTitle}</p>
                <p class="author-card">${book.author}</p>
                <p class="number-card">${book.pages} Pages</p>
                <p>Read Yet?:${book.read} </p>
            </div>
        `;
    }

    // Add the constructed HTML to the library div
    const libraryElement = document.querySelector('.library');
    libraryElement.innerHTML = cardsHtml;
}

// Call the function on page load
window.addEventListener('DOMContentLoaded', addBookCards);