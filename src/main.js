function render(filter) {
  $( ".cat_menu").removeClass('cat_active');
  $( "#"+filter).addClass('cat_active');

  var newContent = '';
  for(var i=0; i<recipes.length; i++) {
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

    var cats = recipes[i].categories;
    var catsOnRowEl = '';
    if(!cats) {
        cats = '';
    } else {
      for(var j=0; j<recipes[i].categories.length; j++){
        catsOnRowEl += '<div class="row_cat '+catMap[recipes[i].categories[j]]+'_cat"></div>';
      };
    }

    newContent += '<div class="row"><div class="row_cats_cont"><div class="row_cats">' + 
    catsOnRowEl + '</div></div>' + recipes[i].name + 
    '</div><br/>';
  };

  $( ".contentcontainer" ).html(newContent);

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
var recipes = [];
getRecipes();

var catMap = {
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
};