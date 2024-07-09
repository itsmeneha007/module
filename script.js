import { renderNavbar } from './navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    setupEventListeners();
    showPage('search-page');
    fetchRecipeOfTheDay();
    fetchRandomRecipes();
});

function setupEventListeners() {
    document.getElementById('search-btn').addEventListener('click', searchRecipes);
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function searchRecipes() {
    const query = document.getElementById('search-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => displaySearchResults(data.meals))
        .catch(error => console.error('Error fetching recipes:', error));
}



function fetchRecipeOfTheDay() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => displayRecipeOfTheDay(data.meals[0]))
        .catch(error => console.error('Error fetching recipe of the day:', error));
}

function displayRecipeOfTheDay(meal) {
    const recipeDayDiv = document.getElementById('recipe-day');
    recipeDayDiv.innerHTML = `<h3>${meal.strMeal}</h3><p>${meal.strInstructions}</p>`;
}

function fetchRandomRecipes() {
    fetch('https://www.themealdb.com/api/json/v1/1/randomselection.php')
        .then(response => response.json())
        .then(data => displayRandomRecipes(data.meals))
        .catch(error => console.error('Error fetching random recipes:', error));
}


export function renderNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
        <a href="#" onclick="showPage('search-page')">Search</a>
        <a href="#" onclick="showPage('recipe-day-page')">Recipe of the Day</a>
        <a href="#" onclick="showPage('random-recipes-page')">Random Recipes</a>
    `;
}


