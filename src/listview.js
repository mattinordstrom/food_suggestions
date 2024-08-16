const render = (filter, fromPopstateEvt) => {
  if (history.pushState && !fromPopstateEvt) {
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=cat_' + filter;
    
    //console.log('newurl render: ' + newurl);

    window.history.pushState({ path: newurl }, '', newurl);
  }

  $( ".cat_menu").removeClass('cat_active');
  $( "#" + filter).addClass('cat_active');

  let newContent = '';
  if(filter === 'candidates') {
    showCandidatesContent();

    return;
  } else if(filter === 'selected') {
    showSelectedContent();

    return;
  } else {
    RecipesModule.get().forEach((recipe) => {
      if(filter && filter === 'uncategorized') {
        if(recipe.categories && recipe.categories.length > 0){
          return;
        }
      }

      if(filter && filter !== 'all' && filter !== 'uncategorized') {
        if(!recipe.categories || !recipe.categories.includes(catMapReverse[filter])){
          return;
        }
      }

      let catsOnRowEl = '';
      if(recipe.categories) {
        recipe.categories.forEach((cat) => { 
          catsOnRowEl += `<div class="row_cat ${catMap[cat]}_cat"></div>`;
        });
      }

      const checkbox = `<input type="checkbox" ${(SelectedRecipesModule.get().includes(recipe.id) ? " checked" : "")} onclick="selectRecipe('${recipe.id}')" />`;

      newContent += `
        <div class="row">
          ${checkbox}
          <div class="row_cats_cont">
            <div class="row_cats"> 
              ${catsOnRowEl}
            </div>
          </div>
          <div class="recipe_link" onclick="showRecipe('${recipe.id}')">
            ${recipe.name}
          </div>
        </div>`;
    });
  }

  $( ".singleview" ).hide();
  $( ".listview" ).html(newContent).show();
}
