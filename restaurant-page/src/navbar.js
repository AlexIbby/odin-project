// src/navbar.js
function createNav() {
    const nav = document.createElement('nav');

    nav.innerHTML = `
        <h2>Beford and Sycamore</h2>
        <div class="nav-items">
            <ul>
                <li><a id="home-link" href="#home">Home</a></li>
                <li><a id="menu-link" href="#menu">Menu</a></li>
                <li><a id="contact-link" href="#contact">Contact</a></li>
            </ul>
        </div>
    `;

    return nav;
}

function attachNavListeners(homeCallback, menuCallback, contactCallback) {
    let homeLink = document.getElementById("home-link");
    if (homeLink) { 
        homeLink.addEventListener("click", homeCallback);
    }

    let menuLink = document.getElementById("menu-link");
    if (menuLink) {
        menuLink.addEventListener("click", menuCallback);
    }

    
    let contactLink = document.getElementById("contact-link");
    if (contactLink) {
        contactLink.addEventListener("click", contactCallback);
    }
}




export { createNav, attachNavListeners };
