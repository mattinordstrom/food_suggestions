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
    portionsInfo + getHrLongHtml() +
    '<div style="margin-left: 100px;"><h4>Ingredienser</h4></div>' + getIngredientsHTML('', '20px', recipeObj) + '<br/><br />' + getHrLongHtml() +
    '<div style="margin-left: 100px;"><h4>Gör så här</h4></div>' + recipeObj.directions + '<br /><br />').show();
}

function showCandidatesContent() {
  let content = '&nbsp;<br/>';
  for(let i=0; i<candidates.length; i++) {
    content += '<div>&nbsp;<a target="_blank" href="' + 
    candidates[i].source + '">'+candidates[i].source+'</a>&nbsp;'+
    (candidates[i].name ? ('('+candidates[i].name+')') : '') +
    '</div><br/>'+getHrLongHtml()+'<br/>';
  }

  $( ".listview" ).hide();
  $( ".singleview" ).html(content).show();
}

function resetCookie() {
  document.cookie = "recipes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  selectedRecipes = [];
  $( "#selected div" ).html('Valda ('+selectedRecipes.length+')');
  render('selected');
}

function showSelectedContent() {
  let content = '';
  if(selectedRecipes.length === 0) {
    content += '<div><br/>Inga maträtter valda.</div>';
  } else {
    content += '<div style="font-size:12px"><i><a href="javascript:resetCookie();">Klicka här</a> för att återställa alla val.</i></div><br/>'+getHrLongHtml();
    for(let i=0; i<selectedRecipes.length; i++) {
      const recipeObj = recipes.find(recipe => recipe.id === selectedRecipes[i]);
      let catsOnRowEl = '';
      if(recipeObj.categories) {
        for(let j=0; j<recipeObj.categories.length; j++){
          catsOnRowEl += '<div class="row_cat ' + catMap[recipeObj.categories[j]] + '_cat"></div>';
        };
      }

      const checkbox = '<input type="checkbox" checked onclick="selectRecipe(\''+recipeObj.id+'\',true)" />';

      content += '<div class="row">'+checkbox+'<div class="row_cats_cont"><div class="row_cats">' + 
        catsOnRowEl + '</div></div><div class="recipe_link" onclick="showRecipe(\'' + 
        recipeObj.id + '\')">' + recipeObj.name + 
        '</div></div>';
    }
    
    content += getHrLongHtml();
    for(let i=0; i<selectedRecipes.length; i++) {
      const recipeObj = recipes.find(recipe => recipe.id === selectedRecipes[i]);

      content += '<div style="font-size:12px"><b>'+recipeObj.name + "</b></div><br />" + getIngredientsHTML('normal', '', recipeObj)
      content += getHrShortHtml();
    }
  }

  $( ".listview" ).hide();
  $( ".singleview" ).html(content).show();
}

function getIngredientsHTML(lineHeight, tdHeight, recipeObj) {
  let ingredients = '';
  if(Array.isArray(recipeObj.ingredients)){
    ingredients += "<table>";
    for(let i=0; i<recipeObj.ingredients.length; i++) {
      ingredients += '<tr style="line-height:'+lineHeight+';">';
      if(Array.isArray(recipeObj.ingredients[i])){
        const formattedIngr = recipeObj.ingredients[i][1].charAt(0).toUpperCase() + recipeObj.ingredients[i][1].slice(1);
        ingredients += '<td style="height:'+tdHeight+'">'+formattedIngr+"</td>"+"<td><i>"+recipeObj.ingredients[i][0]+"</i></td>";
      } else {
        const formattedIngr = recipeObj.ingredients[i].charAt(0).toUpperCase() + recipeObj.ingredients[i].slice(1);
        ingredients += '<td style="height:'+tdHeight+'">'+formattedIngr+"</td><td></td>";
      }
      ingredients += "</tr>";
    }
    ingredients += "</table>";
  } else {
    ingredients = recipeObj.ingredients;
  }

  return ingredients;
}
