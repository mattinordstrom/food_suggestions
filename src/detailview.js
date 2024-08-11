const showRecipe = (recipeId) => {
  if (history.pushState) {
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=rec_' + recipeId;
    window.history.pushState({ path: newurl }, '', newurl);
  }

  $( ".cat_menu").removeClass('cat_active');

  const recipeObj = RecipesModule.get().find(recipe => recipe.id === recipeId);

  let catsEl = '<div class="row_cats">';
  if(recipeObj.categories) {
    recipeObj.categories.forEach((cat) => {
      catsEl += `<div class="row_cat ${catMap[cat]}_cat"></div>`;
    });
  }
  catsEl += '</div>';

  let recipeSource = '';
  if(recipeObj.source) {
    if(recipeObj.source.substring(0,4) === 'http'){
      recipeSource = `
      <div style="font-size:12px">
        <strong>Källa: </strong><a target="_blank" href="${recipeObj.source}">${recipeObj.source}</a>
      </div>`;
    } else {
      recipeSource = `<div style="font-size:12px"><strong>Källa: </strong>${recipeObj.source}</div>`;
    }
  }

  let portionsInfo = '';
  if(recipeObj.portions) {
    portionsInfo = `<div style="font-size:12px"><strong>Antal portioner: </strong>${recipeObj.portions}</div>`;
  }

  const checkbox = `<input type="checkbox" ${(SelectedRecipesModule.get().includes(recipeId) ? " checked" : "")} onclick="selectRecipe('${recipeId}')" style="margin-top:6px" />`;

  $( ".listview" ).hide();

  $( ".singleview" ).html(
    `<div class="recipe_head">
      ${checkbox}${catsEl}<div class="recipe_title">${recipeObj.name}</div>
    </div>
    <br/>
    ${recipeSource}
    ${portionsInfo}
    ${getHrLongHtml()}
    <div style="margin-left: 100px;"><h4>Ingredienser</h4></div>
    ${getIngredientsHTML('', '20px', recipeObj)}
    <br/><br />
    ${getHrLongHtml()}
    <div style="margin-left: 100px;"><h4>Gör så här</h4></div>
    ${recipeObj.directions}
    <br /><br />
    `).show();
}

const showCandidatesContent = () => {
  let content = '&nbsp;<br/>';

  CandidatesModule.get().forEach((candidate) => {
    content += `
      <div>&nbsp;<a target="_blank" href="${candidate.source}">${candidate.source}</a>&nbsp;
      ${(candidate.name ? ('(' + candidate.name + ')') : '')}
      </div>
      <br/>${getHrLongHtml()}<br/>
    `;
  });

  $( ".listview" ).hide();
  $( ".singleview" ).html(content).show();
}

const resetStored = () => {
  localStorage.setItem('foodSuggestionsSelected'+RecipesModule.getVersion(), '');

  SelectedRecipesModule.set([])
  $( "#selected div" ).html('Valda ('+SelectedRecipesModule.get().length+')');
  render('selected');
}

const showSelectedContent = () => {
  let content = '';

  if(SelectedRecipesModule.get().length === 0) {
    content += '<div><br/>Inga maträtter valda.</div>';
  } else {
    content += '<div style="font-size:12px"><i><a href="javascript:resetStored();">Klicka här</a> för att återställa alla val.</i></div><br/>' + getHrLongHtml();

    SelectedRecipesModule.get().forEach((selectedRecipe) => {
      const recipeObj = RecipesModule.get().find(recipe => recipe.id === selectedRecipe);
      let catsOnRowEl = '';
      if(recipeObj.categories) {
        recipeObj.categories.forEach((category) => {
          catsOnRowEl += `<div class="row_cat ${catMap[category]}_cat"></div>`;
        });
      }

      const checkbox = `<input type="checkbox" checked onclick="selectRecipe('${recipeObj.id}',true)" />`;

      content += `
        <div class="row">
          ${checkbox}
          <div class="row_cats_cont">
            <div class="row_cats"> 
              ${catsOnRowEl}
            </div>
          </div>
          <div class="recipe_link" onclick="showRecipe('${recipeObj.id}')">${recipeObj.name}</div>
        </div>
      `;
    });
    
    content += getHrLongHtml();

    SelectedRecipesModule.get().forEach((selectedRecipe) => {
      const recipeObj = RecipesModule.get().find(recipe => recipe.id === selectedRecipe);

      content += `
        <div style="font-size:12px">
          <b>${recipeObj.name}</b>
        </div>
        <br />
        ${getIngredientsHTML('normal', '', recipeObj)}
        ${getHrShortHtml()}
      `;
    });
  }

  $( ".listview" ).hide();
  $( ".singleview" ).html(content).show();
}

const getIngredientsHTML = (lineHeight, tdHeight, recipeObj) => {
  let ingredients = '';

  if(Array.isArray(recipeObj.ingredients)){
    ingredients += "<table>";

    recipeObj.ingredients.forEach((ingredient) => {
      ingredients += `<tr style="line-height:${lineHeight};">`;

      if(Array.isArray(ingredient)){
        const formattedIngr = ingredient[1].charAt(0).toUpperCase() + ingredient[1].slice(1);
        ingredients += `<td style="height:${tdHeight}">${formattedIngr}</td><td><i>${ingredient[0]}</i></td>`;
      } else {
        const formattedIngr = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
        ingredients += `<td style="height:${tdHeight}">${formattedIngr}</td><td></td>`;
      }

      ingredients += "</tr>";
    });

    ingredients += "</table>";
  }

  return ingredients;
}
