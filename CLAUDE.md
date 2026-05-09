# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

```sh
npm install --global http-server
http-server --cors
```

- Main app: http://127.0.0.1:8080/?page=cat_all
- Admin panel: http://127.0.0.1:8080/admin

There is no build step — this is a static HTML/JS/CSS site served directly.

## Updating Recipe Data

The admin panel at `/admin` is used to add recipes. It loads one of the JSON files from `src/`, lets you fill out a form, then downloads the updated JSON file. To deploy the new data, copy the downloaded file back into `src/`:

```sh
cp ~/Downloads/recipes.json src/recipes.json
```

There are two recipe files: `src/recipes.json` (version 1, default) and `src/recipes2.json` (version 2). The admin panel has a dropdown to select which file to edit.

## Architecture

This is a vanilla JS single-page app using jQuery for DOM manipulation. There is no framework, bundler, or package manager.

**Data flow:**
- On load, `getRecipesAndInit()` in `src/main.js` fetches the recipes JSON and stores it in `RecipesModule`
- URL query params drive the view: `?page=cat_<filter>` for list view, `?page=rec_<id>` for detail view
- `render(filter)` in `src/listview.js` renders the recipe list; `showRecipe(id)` in `src/detailview.js` renders a single recipe
- The app toggles between `.listview` and `.singleview` divs — only one is visible at a time
- Selected recipes are stored in `localStorage` (keyed by recipe version) via `SelectedRecipesModule`

**Category system:**
- Categories are stored in Swedish in the JSON (e.g. `"Kött"`, `"Fisk"`) and in `catMap`/`catMapReverse` in `src/helperfunctions.js`
- CSS classes use English keys (e.g. `meat_cat`, `fish_cat`) for color-coded category indicators
- When adding a new category, update `catMap`, `catMapReverse` in `src/helperfunctions.js`, add the menu button in `index.html`, and add the corresponding CSS class in `style.css`

**Recipe JSON schema:**
```json
{
  "id": "unique-kebab-case-id",
  "name": "Recipe Name",
  "source": "URL or text attribution",
  "portions": "4",
  "categories": ["Kött", "Potatis"],
  "ingredients": [["amount", "ingredient name"], "plain string for no-amount items"],
  "directions": "Text with <br/> for line breaks; all other HTML is stripped on render (see sanitizeDirections in src/helperfunctions.js)"
}
```

**Script load order matters** (defined in `index.html`): `main.js` → `modules.js` → `listview.js` → `detailview.js` → `helperfunctions.js`. The admin panel uses its own `admin/adminmodules.js` (a variant of `modules.js` with `setCurrentFile`/`getCurrentFile` instead of versioning).
