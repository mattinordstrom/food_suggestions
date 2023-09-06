let recipes = [];
let newRecipe = {};

function init() {
  $('.jsoninfo').html('recipes.json length: '+recipes.length);

  let i = 0;
  for (const key in catMap) {
    i++;

    $('.cat_checkboxes').append('<input type="checkbox" id="checkbox'+i+'"></input><label for="checkbox'+i+'">'+key+'</label>&nbsp;&nbsp;');

    if (i % 5 === 0) {
      $('.cat_checkboxes').append('<br />');
    }
  }

  addEmptyIngredient();
  addEmptyIngredient();
  addEmptyIngredient();
  addEmptyIngredient();
  addEmptyIngredient();

  //console.log("Test admin. " + recipes.length);
}

function addEmptyIngredient() {
  const count = $('#ingredients').find('.ingredient').length;
  $('#ingredients').append('<div class="ingredient"><input type="text" id="amount'+count+'" placeholder="amount">&nbsp;<input type="text" id="ingredient'+count+'" placeholder="ingredient"></div><br/>');
}

function validateInputs() {
  if(!newRecipe.id) {
    alert("Missing id!");
    return false;
  }
  
  if(!newRecipe.name) {
    alert("Missing name!");
    return false;
  }

  for(let i=0; i<recipes.length; i++) {
    if(newRecipe.id === recipes[i].id){
      alert("ID already in use!");
      return false;
    }
  }

  return true;
}

function addToJSON() {
  newRecipe.id = $('#ingredient_form input[id="id"]')[0].value;
  newRecipe.name = $('#ingredient_form input[id="name"]')[0].value;
  newRecipe.source = $('#ingredient_form input[id="source"]')[0].value;
  newRecipe.portions = $('#ingredient_form input[id="portions"]')[0].value;

  newRecipe.categories = [];
  $('.cat_checkboxes input[type="checkbox"]').each(function() {
    const labelText = $(this).next('label').text();
  
    if ($(this).is(':checked')) {
      newRecipe.categories.push(labelText);
    }
  });

  newRecipe.ingredients = [];
  $('#ingredient_form div[id="ingredients"] div[class="ingredient"]').each(function(a,b,c) {
    const amount = $(this)[0].children[0].value;
    const ingredient = $(this)[0].children[1].value;

    if(ingredient) {
      newRecipe.ingredients.push([amount, ingredient]);
    }
  });

  let directions = $('#ingredient_form textarea[id="directions"]')[0].value;
  directions = directions.replace(/\n/g, '<br/>');
  newRecipe.directions = directions;

  if(!validateInputs()) {
    newRecipe = {};
    return;
  }

  const jsonStr = customStringify([newRecipe]);
  const escapedString = escapeHtml(jsonStr);
  const htmlString = escapedString.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
  $('#jsontext').html(htmlString);

  recipes.push(newRecipe);
  recipes.sort((a, b) => a.name.localeCompare(b.name, 'sv'));

  writeJsonToFile();
  newRecipe = {};
}

function writeJsonToFile() {
  const jsonStr = customStringify(recipes);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "recipes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function getRecipesAndInit() {
  $.ajax({
    url: "../src/recipes.json",
    dataType: "json"
  }).done(function(result){
    recipes = result;

    $(document).ready(function(){
      init();
    })
  });
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function customStringify(jsonObject) {
  return (
    "[\n" +
    jsonObject
      .map((obj) => {
        const entries = Object.entries(obj)
          .map(
            ([key, value]) =>
              `    "${key}": ${
                Array.isArray(value) || typeof value === "object"
                  ? JSON.stringify(value)
                  : `"${value}"`
              }`
          )
          .join(",\n");
        return `  {\n${entries}\n  }`;
      })
      .join(",\n") +
    "\n]"
  );
}

//INIT
getRecipesAndInit();