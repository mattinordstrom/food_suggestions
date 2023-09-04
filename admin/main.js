let recipes = [];
let newRecipe = {};
let allRecipes = {};

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
  //TODO index
  $('#ingredients').prepend('<input type="text" id="amount1" placeholder="amount"><input type="text" id="ingredient1" placeholder="ingredient"><br/>');
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

  //TODO add ingredients from $('#ingredient_form div[id="ingredients"]')
  newRecipe.ingredients = "";

  //TODO replace \n with <br/>
  newRecipe.directions = $('#ingredient_form textarea[id="directions"]')[0].value;

  if(!validateInputs()) {
    //TODO Reset globals? (newRecipe)
    return;
  }

  const jsonString = JSON.stringify(newRecipe, null, 2);
  const htmlString = jsonString.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
  $('#jsontext').html(htmlString);
  
  //TODO Write to json
  //TODO sort json on name
  //TODO Reset globals? (newRecipe)
  writeJsonToFile();
}

function writeJsonToFile() {
  //TODO!!!

  const obj = { key1: "value1", key2: "value2" };
  const jsonStr = JSON.stringify(obj, null, 2);
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


//INIT
getRecipesAndInit();