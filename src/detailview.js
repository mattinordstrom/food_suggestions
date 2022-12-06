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

  let ingredients = '';
  if(Array.isArray(recipeObj.ingredients)){
    ingredients += "<table>";
    for(let i=0; i<recipeObj.ingredients.length; i++) {
      ingredients += "<tr>";
      if(Array.isArray(recipeObj.ingredients[i])){
        ingredients += '<td>'+recipeObj.ingredients[i][1]+"</td>"+"<td>"+recipeObj.ingredients[i][0]+"</td>";
      } else {
        ingredients += "<td>"+recipeObj.ingredients[i]+"</td><td></td>";
      }
      ingredients += "</tr>";
    }
    ingredients += "</table>";
  } else {
    ingredients = recipeObj.ingredients;
  }

  $( ".listview" ).hide();
  $( ".singleview" ).html('<div class="recipe_head">'+checkbox + catsEl + '<div class="recipe_title">' + recipeObj.name + '</div></div>' +
    '<br/>' + recipeSource +
    portionsInfo + getHrLongHtml() +
    '<div style="margin-left: 100px;"><h4>Ingredienser</h4></div>' + ingredients + '<br/><br />' + getHrLongHtml() +
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

function showSelectedContent() {
  let content = '';
  if(selectedRecipes.length === 0) {
    content += '<div><br/>Inga maträtter valda.</div>';
  } else {
    content += '<div style="font-size:12px"><i><a href="">Ladda om sidan</a> för att återställa alla val.</i></div><br/>'+getHrLongHtml();
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
      
      let ingredients = '';
      if(Array.isArray(recipeObj.ingredients)){
        for(let i=0; i<recipeObj.ingredients.length; i++) {
          if(Array.isArray(recipeObj.ingredients[i])){
            ingredients += recipeObj.ingredients[i][1]+" &nbsp;&nbsp;"+recipeObj.ingredients[i][0]+"<br/>";
          } else {
            ingredients += recipeObj.ingredients[i]+"<br/>";
          }
        }
      } else {
        ingredients = recipeObj.ingredients;
      }

      content += '<div style="font-size:12px"><b>'+recipeObj.name + "</b></div><br />" + ingredients
      content += getHrShortHtml();
    }
  }

  $( ".listview" ).hide();
  $( ".singleview" ).html(content).show();
}