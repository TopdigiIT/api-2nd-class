let mealsData = [];

const loadMeals = (mealName = '') => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            mealsData = data.meals || [];
            displayMeals(mealsData);
        })
        .catch(error => console.error('Error fetching meals:', error));
};

const displayMeals = (meals) => {
    const mealsDiv = document.getElementById('meals');
    mealsDiv.innerHTML = ''; // Clear previous results

    // Sort meals alphabetically
    meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal');

        mealDiv.innerHTML = `
                    <h2 onclick="showFullScreen('${meal.idMeal}')" style="cursor: pointer;">${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" onclick="showFullScreen('${meal.idMeal}')">
                    <p><strong>Category:</strong> ${meal.strCategory}</p>
                    <p><strong>Area:</strong> ${meal.strArea}</p>
                    <button class="details-btn" onclick="showFullScreen('${meal.idMeal}')">Details</button>
                `;

        mealsDiv.appendChild(mealDiv);
    });
};

const showFullScreen = (mealId) => {
    const meal = mealsData.find(m => m.idMeal === mealId);
    const modal = document.getElementById('mealModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Description:</strong> ${meal.strInstructions}</p>
            `;

    modal.style.display = 'flex'; // Show modal
};

const closeModal = (event) => {
    const modal = document.getElementById('mealModal');
    // Close modal if clicked outside the content
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide modal
    }
};

const filterMeals = () => {
    const searchInput = document.getElementById('searchInput').value;
    loadMeals(searchInput);
};

// Load default meals on page load
loadMeals();