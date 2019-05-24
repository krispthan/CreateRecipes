import Search from './models/Search';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
/** Global State of the app
 * -Search Object
 * -Current Recipe Object
 * -Shopping list object
 * -liked recipes
 */

/*Search Controller*/
const state = {};
const controlSearch = async () =>{
  //1)get query from view 
  const query = searchView.getInput();

  if(query){
    //2)New search object and add to state
    state.search = new Search(query);
    //3)Prepare UI for results
    searchView.clearInput();
 
    renderLoader(elements.searchResult);

    //4)search for recipes
    await state.search.getResults();//returns a promise
    //5)render results on UI
    clearLoader();
   
  }
}
elements.searchForm.addEventListener('submit', e=>{
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e =>{
  const btn = e.target.closest('.btn-inline')
  if(btn){
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);

  }
});

/*Recipe Controller*/
const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');

  if (id) {
      // Prepare UI for changes
      recipeView.clearRecipe();
      renderLoader(elements.recipe);

      // Highlight selected search item
      if (state.search) searchView.highlightSelected(id);

      // Create new recipe object
      state.recipe = new Recipe(id);

      try {
          // Get recipe data and parse ingredients
          await state.recipe.getRecipe();
          state.recipe.parseIngredients();

          // Calculate servings and time
          state.recipe.calcTime();
          state.recipe.calcServings();
  
          // Render recipe
          clearLoader();
          recipeView.renderRecipe(
              state.recipe,
              state.likes.isLiked(id)
          );

      } catch (err) {
          console.log(err);
          alert('Error processing recipe!');
      }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));