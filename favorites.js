// When the page loads, display the favorites
window.onload = function() {
    // Retrieve the favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');

    // Check if there are no favorites
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorites added yet.</p>';
    } else {
        // Loop through each favorite and display it
        favorites.forEach((coffee, index) => {
            const coffeeItem = document.createElement('div');
            coffeeItem.classList.add('favorite-item');
            coffeeItem.innerHTML = `
                <div class="favorite-item-img">
                    <img src="${coffee.image}" alt="${coffee.name}">
                </div>
                <div class="favorite-item-details">
                    <h2>${coffee.name}</h2>
                    <p>${coffee.price}</p>
                </div>
                <button class="trash-btn" onclick="removeFavorite(${index})">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            `;
            favoritesContainer.appendChild(coffeeItem);
        });
    }
};

// Function to remove a favorite from the list
function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Remove the favorite at the specific index
    favorites.splice(index, 1);

    // Update the localStorage with the new favorites list
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Reload the page to reflect changes
    window.location.reload();
}
