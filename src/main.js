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
      if(recipes[i].categories && recipes[i].categories.length > 0){
        continue;
      }
    }

    if(filter && filter !== 'all' && filter !== 'uncategorized') {
      if(!recipes[i].categories || !recipes[i].categories.includes(catMapReverse[filter])){
        continue;
      }
    }

    let catsOnRowEl = '';
    if(recipes[i].categories) {
      for(let j=0; j<recipes[i].categories.length; j++){
        catsOnRowEl += '<div class="row_cat ' + catMap[recipes[i].categories[j]] + '_cat"></div>';
      };
    }

    newContent += '<div class="row"><div class="row_cats_cont"><div class="row_cats">' + 
      catsOnRowEl + '</div></div><div class="recipe_link" onclick="showRecipe(\'' + 
      recipes[i].id + '\')">' + recipes[i].name + 
      '</div></div>';
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

  let catsEl = '<div class="row_cats">';
  if(recipeObj.categories) {
    for(let i = 0; i < recipeObj.categories.length; i++){
      catsEl += '<div class="row_cat ' + catMap[recipeObj.categories[i]] + '_cat"></div>';
    };
  }
  catsEl += '</div>';

  let recipeSource = '';
  if(recipeObj.source) {
    if(recipeObj.source.substring(0,4) === 'http'){
      recipeSource = 'Källa: ' + '<a target="_blank" href="' + recipeObj.source + '">' + recipeObj.source+'</a>' + '<br/>';
    } else {
      recipeSource = 'Källa: ' + recipeObj.source + '<br/>';
    }
  }

  let portionsInfo = '';
  if(recipeObj.portions) {
    portionsInfo = 'Antal portioner: ' + recipeObj.portions;
  }
  $( ".contentcontainer" ).html(catsEl + '<h3>' + recipeObj.name + '</h3>' +
    '<i>' + recipeSource +
    portionsInfo +
    '</i><h4>Ingredienser</h4>' + recipeObj.ingredients + 
    '<br/><br/><h4>Gör så här</h4>' + recipeObj.directions + '<br /><br />');
}

function getRecipes() {
  $.ajax({
    url: "./src/recipes.json",
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
  'Burgare': 'burger',
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
  'burger': 'Burgare',
};