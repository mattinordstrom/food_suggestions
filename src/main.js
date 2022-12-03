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

function render(filter) {
  if (history.pushState) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=cat_'+filter;
    window.history.pushState({path:newurl},'',newurl);
  }

  $( ".cat_menu").removeClass('cat_active');
  $( "#"+filter).addClass('cat_active');

  let newContent = '';
  if(filter === 'candidates') {
    for(let i=0; i<candidates.length; i++) {
      newContent += '<div>&nbsp;<a target="_blank" href="' + 
      candidates[i].source + '">'+candidates[i].source+'</a>&nbsp;'+
      (candidates[i].name ? ('('+candidates[i].name+')') : '') +
      '</div><br/>&nbsp;<br/>';
    }
  } else if(filter === 'selected') {
    if(selectedRecipes.length === 0) {
      newContent += '<div><br/>Inga maträtter valda.</div>';
    } else {
      newContent += '<div style="font-size:12px"><i><a href="">Ladda om sidan</a> för att återställa alla val.</i></div><br/>'+
      '<span style="color:#ccc">-----------------------------------------------------------------</span>';
      for(let i=0; i<selectedRecipes.length; i++) {
        const recipeObj = recipes.find(recipe => recipe.id === selectedRecipes[i]);
        let catsOnRowEl = '';
        if(recipeObj.categories) {
          for(let j=0; j<recipeObj.categories.length; j++){
            catsOnRowEl += '<div class="row_cat ' + catMap[recipeObj.categories[j]] + '_cat"></div>';
          };
        }

        const checkbox = '<input type="checkbox" checked onclick="selectRecipe(\''+recipeObj.id+'\',true)" />';

        newContent += '<div class="row">'+checkbox+'<div class="row_cats_cont"><div class="row_cats">' + 
          catsOnRowEl + '</div></div><div class="recipe_link" onclick="showRecipe(\'' + 
          recipeObj.id + '\')">' + recipeObj.name + 
          '</div></div>';
      }
      newContent += '<span style="color:#ccc">-----------------------------------------------------------------</span>';
      for(let i=0; i<selectedRecipes.length; i++) {
        const recipeObj = recipes.find(recipe => recipe.id === selectedRecipes[i]);
        newContent += '<div style="font-size:12px"><b>'+recipeObj.name + "</b></div><br />" + recipeObj.ingredients
        
        newContent += '<span style="color:#ccc">----------</span>';
      }
    }
  } else {
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

      const checkbox = '<input type="checkbox"'+
      (selectedRecipes.includes(recipes[i].id) ? " checked" : "")+
      ' onclick="selectRecipe(\''+recipes[i].id+'\')" />';

      newContent += '<div class="row">'+checkbox+'<div class="row_cats_cont"><div class="row_cats">' + 
        catsOnRowEl + '</div></div><div class="recipe_link" onclick="showRecipe(\'' + 
        recipes[i].id + '\')">' + recipes[i].name + 
        '</div></div>';
    };
  }

  $( ".singleview" ).hide();
  $( ".listview" ).html(newContent).show();
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
      recipeSource = '<div style="font-size:12px"><strong>Källa:</strong> ' + '<a target="_blank" href="' + recipeObj.source + '">' + recipeObj.source+'</a></div>';
    } else {
      recipeSource = '<div style="font-size:12px"><strong>Källa:</strong> ' + recipeObj.source + '</div>';
    }
  }

  let portionsInfo = '';
  if(recipeObj.portions) {
    portionsInfo = '<div style="font-size:12px"><strong>Antal portioner:</strong> ' + recipeObj.portions + '</div>';
  }

  const checkbox = '<input type="checkbox"'+
      (selectedRecipes.includes(recipeId) ? " checked" : "")+
      ' onclick="selectRecipe(\''+recipeId+'\')" style="margin-top:6px" />';

  $( ".listview" ).hide();
  $( ".singleview" ).html('<div class="recipe_head">'+checkbox + catsEl + '<div class="recipe_title">' + recipeObj.name + '</div></div>' +
    '<br/>' + recipeSource +
    portionsInfo + 
    '<span style="color:#ccc">-----------------------------------------------------------------</span>' +
    '<h4>Ingredienser</h4>' + recipeObj.ingredients + '<br/><br />' +
    '<span style="color:#ccc">-----------------------------------------------------------------</span>' +
    '<h4>Gör så här</h4>' + recipeObj.directions + '<br /><br />').show();
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

function getRecipesAndInit() {
  $.ajax({
    url: "./src/recipes.json",
    dataType: "json"
  }).done(function(result){
    recipes = result;
  });
  $.ajax({
    url: "./src/candidates.json",
    dataType: "json"
  }).done(function(result){
    candidates = result;

    $(document).ready(function(){
      init();
    })
  });
}

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

let recipes = [];
let candidates = [];
let selectedRecipes = [];

//INIT
getRecipesAndInit();