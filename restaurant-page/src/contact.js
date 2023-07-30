// src/contact.js

function createContact() {
    const contactContent = document.createElement('div');
    contactContent.id = "contactContent";

    contactContent.innerHTML = `
    <div class="iframe-container">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1733982794526!2d-73.96791575877518!3d40.71419917151224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25961f5821591%3A0xe87bf78ace54ae7d!2sSunday%20In%20Brooklyn%20%2F%20Williamsburg!5e0!3m2!1sen!2sca!4v1693849294932!5m2!1sen!2sca" 
            frameborder="0" 
            style="border:0; width: 100%; height: 100%;" 
            allowfullscreen="" 
            aria-hidden="false" 
            tabindex="0">
        </iframe>
    </div>

    <div class="menu-section">
        <h3 class="menu-item">Bedford and Sycamore</h3>
        <p class="menu-item-description">348 Wythe Ave, Brooklyn NY, 11249</p>
        <p class="menu-item-description">United States</p>
        <p class="menu-item">Open 11-3, 6-11</p>
    </div>

    `;

    return contactContent;
}

export default createContact;
