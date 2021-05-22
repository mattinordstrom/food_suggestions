function render(filter) {
  $( ".cat_menu").removeClass('cat_active');
  $( "#"+filter).addClass('cat_active');

  let newContent = '';
  for(let i=0; i<recipes.length; i++) {
    if(filter && filter === 'Okategoriserat') {
      if(recipes[i].categories){
        continue;
      }
    }

    if(filter && filter !== 'Alla' && filter !== 'Okategoriserat') {
      if(!recipes[i].categories || !recipes[i].categories.includes(filter)){
        continue;
      }
    }

    let cats = recipes[i].categories;
    let catsOnRowEl = '';
    if(!cats) {
        cats = '';
    } else {
      for(let j=0; j<recipes[i].categories.length; j++){
        catsOnRowEl += '<div class="row_cat ' + catMap[recipes[i].categories[j]] + '_cat"></div>';
      };
    }

    newContent += '<div class="row"><div class="row_cats_cont"><div class="row_cats">' + 
      catsOnRowEl + '</div></div><div class="recipe_link" onclick="showRecipe(\'' + 
      recipes[i].name + '\')">' + recipes[i].name + 
      '</div></div><br/>';
  };

  $( ".contentcontainer" ).html(newContent);

}

function showRecipe(recipeName) {
  $( ".cat_menu").removeClass('cat_active');

  const recipeObj = recipes.find(recipe => recipe.name === recipeName);

  let recipeSource = recipeObj.source;
  if(recipeObj.source && recipeObj.source.substring(0,4) === 'http') {
    recipeSource = '<a target="_blank" href="' + recipeObj.source + '">' + recipeObj.source+'</a>';
  }

  $( ".contentcontainer" ).html('<h2>' + recipeObj.name +
    '</h2><i>Källa: ' + (recipeSource || '') + 
    '</i><br/><h3>Ingredienser</h3>' + recipeObj.ingredients + 
    '<br/><h3>Gör så här</h3>' + recipeObj.directions);
}

function getRecipes() {
  $.ajax({
    url: "https://mattinordstrom.github.io/food_suggestions/src/recipes.json",
    dataType: "json"
  }).done(function(result){
    recipes = result;
    render('Alla');
  });
}
let recipes = [];
getRecipes();

const catMap = {
  'Kött': 'meat',
  'Fisk': 'fish',
  'Kyckling': 'chicken',
  'Vegetariskt': 'veg',
  'Potatis': 'potato',
  'Pasta': 'pasta',
  'Ris': 'rice',
  'Nudlar': 'noodles',
  'Matvete': 'wheat',
  'Paj': 'pie',
  'Pizza': 'pizza',
};
