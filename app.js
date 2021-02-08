const mealList = document.getElementById('meal');
const searchResult = document.getElementById('searchResult');
const mealDetails = document.getElementById('meal-details');


function searchMeal() {
    const searchText = document.getElementById('searchText').value.trim();
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let html = "";
            data.meals.forEach(meal => {
                html += `
                <div data-id="${meal.idMeal}" class="meal-item col-6 col-md-3 my-3" onclick="mealDetail('${meal.idMeal}')">
                <div class="meal-image">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="meal-name py-4">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `
            });
            mealList.innerHTML = html;
        })
        .catch(error => (mealList.innerHTML = "<h3 class='text-danger'>Meal not found!</h3>"));
    searchResult.style.display = 'block';
}

function mealDetail(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            meal = data.meals[0];
            let html = '';
            html += `
                <div data-id="${meal.idMeal}" class="col-6 my-3">
                <div class="meal-image">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="meal-name py-4">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `
            mealDetails.innerHTML = html;
            mealList.style.display = "none";
        })
}