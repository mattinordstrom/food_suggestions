const RecipesModule = (() => {
  let recipes = [];

  const setRecipes = (data) => {
    recipes = data;
  }

  const getRecipes = () => recipes;

  return {
      set: setRecipes,
      get: getRecipes
  };
})();

const CandidatesModule = (() => {
  let candidates = [];

  const setCandidates = (data) => {
    candidates = data;
  }

  const getCandidates = () => candidates;

  return {
      set: setCandidates,
      get: getCandidates
  };
})();

const SelectedRecipesModule = (() => {
  let selectedRecipes = [];

  const setSelectedRecipes = (data) => {
    selectedRecipes = data;
  }

  const getSelectedRecipesCopy = () => [...selectedRecipes];

  return {
      set: setSelectedRecipes,
      get: getSelectedRecipesCopy,
      getArrayCopy: getSelectedRecipesCopy
  };
})();