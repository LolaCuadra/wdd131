import { recipes } from './recipes.mjs';

document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchInput) ||
    recipe.description.toLowerCase().includes(searchInput)
  );
  displayRecipes(filteredRecipes);
});

function displayRecipes(recipesList) {
  const recipeSection = document.querySelector('#recipe');
  recipeSection.innerHTML = '';

  recipesList.forEach(recipe => {
    const recipeElement = document.createElement('div');
    recipeElement.innerHTML = `
      <h2>${recipe.title}</h2>
      <div class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
        ${'⭐'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}
      </div>
      <p>${recipe.description}</p>
      <button>See Full Recipe</button>
    `;
    recipeSection.appendChild(recipeElement);
  });
}

// Initial display
displayRecipes(recipes);
