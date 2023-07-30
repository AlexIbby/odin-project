// src/menu.js

function createMenu() {
    const menu = document.createElement('div');
    menu.id = "menuID"; 

    menu.innerHTML = `
    <div class="menu-section">
        <h3 class="menu-item">Farmhouse Omelette</h3>
        <p class="menu-item-description">Fluffy omelette filled with fresh farm vegetables and cheddar.</p>
        <p class="menu-item-price">19</p>
    </div>
    
    <div class="menu-section">
        <h3 class="menu-item">Rustic Pancake Stack</h3>
        <p class="menu-item-description">Hearty whole-grain pancakes topped with maple syrup and berries.</p>
        <p class="menu-item-price">16</p>
    </div>
    
    <div class="menu-section">
        <h3 class="menu-item">Bacon & Egg Casserole</h3>
        <p class="menu-item-description">Layered casserole with crispy bacon, eggs, and a touch of cream.</p>
        <p class="menu-item-price">21</p>
    </div>
    
    <div class="menu-section">
        <h3 class="menu-item">Country Biscuits & Gravy</h3>
        <p class="menu-item-description">Homemade biscuits smothered in rich country gravy.</p>
        <p class="menu-item-price">18</p>
    </div>
    
    <div class="menu-section">
        <h3 class="menu-item">Harvest Fruit Bowl</h3>
        <p class="menu-item-description">Seasonal fruits drizzled with a light honey glaze.</p>
        <p class="menu-item-price">15</p>
    </div>
    `;

    return menu;
}

export default createMenu;
