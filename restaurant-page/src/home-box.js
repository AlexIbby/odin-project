// homeBoxModule.js

import homePageImage1 from './assets/images/food-home.jpg';
const imgElement1 = new Image();
imgElement1.src = homePageImage1;

import homePageImage2 from './assets/images/food-home2.jpg';
const imgElement2 = new Image();
imgElement2.src = homePageImage2;


import instagramImage from './assets/images/instagram.png';
const footerImg = new Image();
footerImg.src = instagramImage;


function homeContent() {
    const homeBox = document.createElement('div');
    homeBox.id = 'home-box';

    homeBox.innerHTML = `
        <p class="about-para">
            Located in Brooklyn, Bedford and Sycamore is a local brunch spot blending old and new. We use fresh, local ingredients to make delicious dishes. 
        </p>

        <p class="about-para">
            Whether it's a sunny morning or a cozy evening, our place offers a simple, tasty meal. Come join us for a bite.
        </p>
        
        <img src="${homePageImage1}" alt="An outdoor patio" id="food-home" />
        <img src="${homePageImage2}" alt="Shashuka and other breakfast items" id="food-home" />

        
        <img src="${instagramImage}" id="footer-img" ></img>
        <p id="footer">Alex Ibrahim - Odin Project 2023</p>
        
    `;

    return homeBox;
}

export default homeContent;