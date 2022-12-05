let recipes = [];
let candidates = [];
let selectedRecipes = [];

function init() {
  var page = window.location.search.split("?page=")[1];
  
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

function getRecipesAndInit() {
  $.ajax({
    url: "./src/recipes.json",
    dataType: "json"
  }).done(function(result){
    recipes = result;
  
    $.ajax({
      url: "./src/candidates.json",
      dataType: "json"
    }).done(function(result){
      candidates = result;

      $(document).ready(function(){
        init();
      })
    });
  });
}

function selectRecipe(recipeId, inSelectedView) {
  if(selectedRecipes.includes(recipeId)) {
    selectedRecipes.splice(selectedRecipes.indexOf(recipeId), 1);
    if(inSelectedView) {
      render('selected');
    }
  } else {
    selectedRecipes.push(recipeId);
  }
}

//INIT
getRecipesAndInit();