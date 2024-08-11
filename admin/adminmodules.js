const RecipesModule = (() => {
  let recipes = [];
  let currentFile = 'recipes';

  const setRecipes = (data) => {
    recipes = [...data];
  }

  const getRecipes = () => [...recipes];

  const setCurrentFile = (file) => {
    currentFile = file;
  }

  const getCurrentFile = () => currentFile;
  
  return {
      set: setRecipes,
      get: getRecipes,
      setCurrentFile,
      getCurrentFile
  };
})();
