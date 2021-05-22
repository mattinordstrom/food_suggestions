function init() {
  var page = window.location.search.split("?page=")[1];
  
  if(!page) {
    render('all');
  } else if(page.substring(0,3) === 'cat') {
    render(page.substring(4));
  } else if(page.substring(0,3) === 'rec') {
    showRecipe(page.substring(4));
  }
}

function render(filter) {
  if (history.pushState) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=cat_'+filter;
    window.history.pushState({path:newurl},'',newurl);
  }

  $( ".cat_menu").removeClass('cat_active');
  $( "#"+filter).addClass('cat_active');

  let newContent = '';
  for(let i=0; i<recipes.length; i++) {
    if(filter && filter === 'uncategorized') {
      if(recipes[i].categories){
        continue;
      }
    }

    if(filter && filter !== 'all' && filter !== 'uncategorized') {
      if(!recipes[i].categories || !recipes[i].categories.includes(catMapReverse[filter])){
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
      recipes[i].id + '\')">' + recipes[i].name + 
      '</div></div><br/>';
  };

  $( ".contentcontainer" ).html(newContent);

}

function showRecipe(recipeId) {
  if (history.pushState) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=rec_'+recipeId;
    window.history.pushState({path:newurl},'',newurl);
  }
  $( ".cat_menu").removeClass('cat_active');

  const recipeObj = recipes.find(recipe => recipe.id === recipeId);

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
    init();
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

const catMapReverse = {
  'meat': 'Kött',
  'fish': 'Fisk',
  'chicken': 'Kyckling',
  'veg': 'Vegetariskt',
  'potato': 'Potatis',
  'pasta': 'Pasta',
  'rice': 'Ris',
  'noodles': 'Nudlar',
  'wheat': 'Matvete',
  'pie': 'Paj',
  'pizza': 'Pizza',
};