const showRecipe = (recipeId, fromPopstateEvt) => {
  if (history.pushState && !fromPopstateEvt) {
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

  const checkbox = `<input type="checkbox" ${(SelectedRecipesModule.get().includes(recipeId) ? " checked" : "")} onclick="selectRecipe('${recipeId}')" style="margin-top:8px" />`;

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
    ${getIngredientsHTML(recipeObj)}
    <br/><br />
    <div style="margin-left: 100px;"><h4>Gör så här</h4></div>
    ${recipeObj.directions}
    <br /><br />
    `).show();

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    content += '<div style="font-size:12px; margin-top:20px; margin-bottom:22px"><i><a href="javascript:resetStored();">Tryck här</a> för att nollställa alla val.</i></div>';

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
    
    content += `${getHrLongHtml()}<br /><br />`;

    SelectedRecipesModule.get().forEach((selectedRecipe) => {
      const recipeObj = RecipesModule.get().find(recipe => recipe.id === selectedRecipe);

      content += `
        <div style="font-size:12px">
          <b>${recipeObj.name}</b>
        </div>
        ${getIngredientsHTML(recipeObj)}
        <br/>
      `;
    });
  }

  $( ".listview" ).hide();
  $( ".singleview" ).html(content).show();
}

const clickedIngr = (el) => {
  let firstTd = el.parentElement.children[el.rowIndex].firstChild;

  //let table2 = el.parentElement.parentElement.nextElementSibling;

  //const correspondingTr = table2.rows[el.rowIndex];
  
  const isChecked = (firstTd.style.visibility === 'visible');

  firstTd.style.visibility = isChecked ? 'hidden' : 'visible';
  el.style.setProperty("text-decoration", isChecked ? 'none' : 'line-through');

}

const getIngredientsHTML = (recipeObj) => {
  const lineHeight = '26px';
  //const tdHeight = lineHeight;

  let ingredients = '';

  if(Array.isArray(recipeObj.ingredients)){
    ingredients += "<table style='max-width:90%'>";

    recipeObj.ingredients.forEach((ingredient) => {
      ingredients += `<tr onclick="clickedIngr(this)" style="cursor:pointer; line-height:${lineHeight}">`;

      const checkmarkHtml = `<td style="visibility:hidden; color: green; min-width: 18px; vertical-align: top; padding-top: 6px;"><i class="fa fa-check"></i></td>`;
      const ingrTdHtml = `${checkmarkHtml}<td style="vertical-align: top; border-bottom:1px dotted #d7d7d7;" class="ingr">`;

      if(Array.isArray(ingredient)){
        const formattedIngr = ingredient[1].charAt(0).toUpperCase() + ingredient[1].slice(1);
        ingredients += `${ingrTdHtml}${formattedIngr}</td><td style="vertical-align: top; border-bottom:1px dotted #ccc;"><i>${ingredient[0]}</i></td>`;
      } else {
        const formattedIngr = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
        ingredients += `${ingrTdHtml}${formattedIngr}</td><td style="vertical-align: top; border-bottom:1px dotted #ccc;"></td>`;
      }

      ingredients += "</tr>";
    });

    ingredients += "</table>";
  }
/*
  ingredients += '<table style="background-color:transparent">';
  recipeObj.ingredients.forEach((ingredient) => {
    ingredients += `<tr style="color: green; visibility:hidden; height:${lineHeight}"><td style="min-width: 1px;"><i class="fa fa-check"></i></td></tr>`;
  });
  ingredients += '</table><div style="clear: both;"></div>';
*/
  return ingredients;
}
