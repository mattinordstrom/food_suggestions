function render(filter) {
  if (history.pushState) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=cat_'+filter;
    window.history.pushState({path:newurl},'',newurl);
  }

  $( ".cat_menu").removeClass('cat_active');
  $( "#"+filter).addClass('cat_active');

  let newContent = '';
  if(filter === 'candidates') {
    showCandidatesContent();
    return;
  } else if(filter === 'selected') {
    showSelectedContent();
    return;
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
