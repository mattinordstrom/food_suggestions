---
description: Fetch recipe ingredients from a URL and add it as a new recipe in food_suggestions. Pass the recipe URL as the argument.
argument-hint: <recipe-url>
---
 
# Fetch Recipe from URL
 
Go to the provided URL: `$ARGUMENTS`
 
1. Use `curl` or `fetch` to retrieve the page content from the URL.
2. Parse the HTML and locate the recipe ingredients section. Ingredients are often found in elements with classes/attributes like `ingredients`, `recipe-ingredients`, `ingredienser`, or within `<ul>`/`<ol>` lists near headings like "Ingredienser", "Ingredients", etc.
3. Extract each individual ingredient as a text string. The ingredients are most likely written in **Swedish** but could be in any language — preserve them exactly as they appear on the page.
4. Locate the description or step-by-step on how to cook the dish.
5. If you can find information about number of portions, make note of that.
6. Read the format of src/recipes.json to understand how the new recipe should be added, then add the new recipe there including the categories, ingredients and description. Make sure to follow the existing format of the json.
7. Verify the json format
 
If the page cannot be reached or no ingredients are found, explain what went wrong and suggest alternatives (e.g. checking the URL or inspecting the page manually).

Do not add new categories, only use existing ones.