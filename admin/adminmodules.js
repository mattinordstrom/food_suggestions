const RecipesModule = (() => {
  let recipes = [];

  const setRecipes = (data) => {
    recipes = [...data];
  }

  const getRecipes = () => [...recipes];

  return {
      set: setRecipes,
      get: getRecipes
  };
})();
