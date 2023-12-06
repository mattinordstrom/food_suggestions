const init = () => {
  const storedSelected = localStorage.getItem('foodSuggestionsSelected');
  if(storedSelected) {
    SelectedRecipesModule.set(JSON.parse(storedSelected));
  }

  $( "#selected div" ).html('Valda (' + SelectedRecipesModule.get().length + ')');

  const page = window.location.search.split("?page=")[1];
  
  if(!page) {
    render('all');
  } else if(page.substring(0,3) === 'cat') {
    render(page.substring(4));
  } else if(page.substring(0,3) === 'rec') {
    showRecipe(page.substring(4));
  } else {
    render('all');
  }
}

const getRecipesAndInit = async () => {
  try {
    const response = await fetch('./src/recipes.json');
    const result = await response.json();
    
    RecipesModule.set(result);
    
    try {
      const response = await fetch('./src/candidates.json');
      const result = await response.json();
      
      CandidatesModule.set(result);
  
    } catch (error) {
        console.error('Fetch error candidates:', error);
    }
  } catch (error) {
      console.error('Fetch error recipes:', error);
  }

  init();
}

const selectRecipe = (recipeId, inSelectedView) => {
  const selectedRecipes = SelectedRecipesModule.getArrayCopy();

  if(selectedRecipes.includes(recipeId)) {
    selectedRecipes.splice(selectedRecipes.indexOf(recipeId), 1);

    SelectedRecipesModule.set(selectedRecipes);
    storeSelected();

    if(inSelectedView) {
      render('selected');
    }
  } else {
    selectedRecipes.push(recipeId);

    SelectedRecipesModule.set(selectedRecipes);
    storeSelected();
  }

  $( "#selected div" ).html('Valda (' + SelectedRecipesModule.get().length + ')');
}

const storeSelected = () => {
  localStorage.setItem('foodSuggestionsSelected', JSON.stringify(SelectedRecipesModule.get()));
}
