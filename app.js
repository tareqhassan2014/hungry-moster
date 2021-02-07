const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('meal-details-content');
const mealDetails = document.getElementById('meal-details');

// event listener 

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealDetails);
// get meal list that get with the Ingedients

function getMealList() {
    let searchInput = document.getElementById('search-input');
    let searchInputText = searchInput.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(Response => Response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <h2 class="title">Your Search Result :</h2>
                <div data-id="${meal.idMeal}" class="meal-item">
                <div class="meal-image">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="meal-r">
                    <h3>${meal.strMeal}</h3>
                    <a class="recipe-btn btn btn-warning" href="">get recipe</a>
                </div>
            </div>
                `
                });
            } else {
                html = "<h2 class='not-found'>Sorry we don't find any Meal!</h2>";
            }
            mealList.innerHTML = html;
            
        });
}

//get recipe for the meal
function getMealDetails(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(Response => Response.json())
            .then(data => mealRecipeModel(data.meals));
    }
}

//creat a model
function mealRecipeModel(meal) {
    meal = meal[0];
    html = `
    <h2 class="recipe-titel">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions :</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-image">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strSource}">Watck Video</a>
    </div>
    `;
    mealDetails.innerHTML = html;
    mealList.style.display = "none";
}
