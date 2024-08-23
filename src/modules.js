const RecipesModule = (() => {
  let recipes = [];
  let currentVersion = 1;
  
  const setRecipes = (data) => {
    recipes = [...data];
  }

  const getRecipes = () => [...recipes];

  const setVersion = (version) => {
    currentVersion = version;
  }

  const getVersion = () => currentVersion;

  return {
      set: setRecipes,
      get: getRecipes,
      setVersion,
      getVersion
  };
})();

const SelectedRecipesModule = (() => {
  let selectedRecipes = [];

  const setSelectedRecipes = (data) => {
    selectedRecipes = [...data];
  }

  const getSelectedRecipesCopy = () => [...selectedRecipes];

  return {
      set: setSelectedRecipes,
      get: getSelectedRecipesCopy,
      getArrayCopy: getSelectedRecipesCopy
  };
})();