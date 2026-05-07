---
description: Fetch recipe ingredients from the scratch.txt file and add it as a new recipe in food_suggestions. 
---
 
# Add Recipe From txt file
 
1. Read the content of src/scratch.txt
2. Extract each individual ingredient and amount from the file.
3. Get the description or step-by-step on how to cook the dish.
4. If you can find information about number of portions, make note of that.
5. Read the format of src/recipes.json to understand how the new recipe should be added, then add the new recipe there including the categories, ingredients and description. Make sure to follow the existing format of the json.
6. Verify the json format
 
If you cant find the scratch.txt file (or if its empty) throw an error and stop immediatelly.

Do not add new categories, only use existing ones.