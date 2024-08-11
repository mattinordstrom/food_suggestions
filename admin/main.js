const init = () => {
  Object.keys(catMap).forEach((key, i) => {
    const idx = i+1;

    $('.cat_checkboxes').append(`
      <input type="checkbox" id="checkbox${idx}"></input>
      <label for="checkbox${idx}">${key}</label>&nbsp;&nbsp;
    `);

    if (idx % 5 === 0) {
      $('.cat_checkboxes').append('<br />');
    }
  });

  addEmptyIngredient();
  addEmptyIngredient();
  addEmptyIngredient();
  addEmptyIngredient();
  addEmptyIngredient();
}

const addEmptyIngredient = () => {
  const count = $('#ingredients').find('.ingredient').length;

  $('#ingredients').append(`
    <div class="ingredient">
      <input type="text" id="amount${count}" placeholder="amount">&nbsp;
      <input type="text" id="ingredient${count}" placeholder="ingredient">
    </div><br/>
  `);
}

const validateInputs = (newRecipe) => {
  if(!newRecipe.id) {
    alert("Missing id!");
    return false;
  }
  
  if(!newRecipe.name) {
    alert("Missing name!");
    return false;
  }

  RecipesModule.get().forEach((recipe) => {
    if(newRecipe.id === recipe.id){
      alert("ID already in use!");
      return false;
    }
  });

  return true;
}

const addToJSON = () => {
  const newRecipe = {};

  newRecipe.id = $('#ingredient_form input[id="id"]')[0].value;
  newRecipe.name = $('#ingredient_form input[id="name"]')[0].value;
  newRecipe.source = $('#ingredient_form input[id="source"]')[0].value;
  newRecipe.portions = $('#ingredient_form input[id="portions"]')[0].value;

  newRecipe.categories = [];
  $('.cat_checkboxes input[type="checkbox"]').each((idx, el) => {
    const labelText = $(el).next('label').text();
  
    if ($(el).is(':checked')) {
      newRecipe.categories.push(labelText);
    }
  });

  newRecipe.ingredients = [];
  $('#ingredient_form div[id="ingredients"] div[class="ingredient"]').each((idx, el) => {
    const amount = $(el)[0].children[0].value;
    const ingredient = $(el)[0].children[1].value;

    if(ingredient) {
      newRecipe.ingredients.push([amount, ingredient]);
    }
  });

  let directions = $('#ingredient_form textarea[id="directions"]')[0].value;
  directions = directions.replace(/\n/g, '<br/>');
  newRecipe.directions = directions;

  if(!validateInputs(newRecipe)) {
    return;
  }

  const jsonStr = customStringify([newRecipe]);
  const escapedString = escapeHtml(jsonStr);
  const htmlString = escapedString.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
  $('#jsontext').html(htmlString);

  const newRecipes = RecipesModule.get();
  newRecipes.push(newRecipe);
  newRecipes.sort((a, b) => a.name.localeCompare(b.name, 'sv'));

  RecipesModule.set(newRecipes);

  writeJsonToFile();
}

const writeJsonToFile = () => {
  const jsonStr = customStringify(RecipesModule.get());
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = RecipesModule.getCurrentFile(); + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const customStringify = (jsonObject) => {
  //TODO make this more readable
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

const getRecipes = async () => {
  const el = document.getElementById("jsonfiles");
  const selectedJsonFile = el.value;
  RecipesModule.setCurrentFile(selectedJsonFile);

  try {
    const response = await fetch('../src/'+selectedJsonFile+'.json');
    const result = await response.json();

    RecipesModule.set(result);
  } catch (error) {
    console.error('Fetch error recipes:', error);
  }

  $('.jsoninfo').html('recipes json length: ' + RecipesModule.get().length);
}