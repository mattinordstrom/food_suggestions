let recipes = [];
let candidates = [];
let selectedRecipes = [];

function init() {
  const recipesCookie = document.cookie.split('; ').find((row) => row.startsWith('recipes='))?.split('=')[1]; 
  selectedRecipes = recipesCookie ? recipesCookie.split(",") : [];
  $( "#selected div" ).html('Valda ('+selectedRecipes.length+')');

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
    setRecipesCookie(selectedRecipes.toString());
    if(inSelectedView) {
      render('selected');
    }
  } else {
    selectedRecipes.push(recipeId);

    setRecipesCookie(selectedRecipes.toString());
  }
  $( "#selected div" ).html('Valda ('+selectedRecipes.length+')');
}

function setRecipesCookie(cvalue) {
  const exdays = 14;
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = "recipes=" + cvalue + ";" + expires + ";path=/";
}

//INIT
getRecipesAndInit();