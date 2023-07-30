import './styles.css';
import { createNav, attachNavListeners } from './navbar.js';
import homeContent from './home-box';
import createMenu from './menu';
import createContact from './contact'

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    content.appendChild(createNav());
    content.appendChild(homeContent());
    attachNavListeners(homeClick, menuClick, contactClick);
});

function homeClick(event) {
    event.preventDefault();
    const content = document.getElementById('content');
    content.innerHTML = "";
    content.appendChild(createNav());

    //Change Active Tab Color
    const linkClicked = document.getElementById("home-link")
    linkClicked.style.backgroundColor = "black"
    linkClicked.style.color = "white"
    linkClicked.style.fontWeight = "700"

    //Adding Active Tab Content
    attachNavListeners(homeClick, menuClick, contactClick);
    content.appendChild(homeContent());
}

function menuClick(event) {
    event.preventDefault();
    const content = document.getElementById('content');
    content.innerHTML = "";
    content.appendChild(createNav());

    //Change Active Tab Color
    const linkClicked = document.getElementById("menu-link")
    linkClicked.style.backgroundColor = "black"
    linkClicked.style.color = "white"
    linkClicked.style.fontWeight = "700"

    //Adding Active Tab Content
    attachNavListeners(homeClick, menuClick, contactClick);
    content.appendChild(createMenu());
}

function contactClick(event) {
    event.preventDefault();
    const content = document.getElementById('content');
    content.innerHTML = "";
    content.appendChild(createNav());


    //Change Active Tab Color
    const linkClicked = document.getElementById("contact-link")
    linkClicked.style.backgroundColor = "black"
    linkClicked.style.color = "white"
    linkClicked.style.fontWeight = "700"

    attachNavListeners(homeClick, menuClick, contactClick);
    content.appendChild(createContact());
}




