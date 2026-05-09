const catMap = {
  'Burgare': 'burger',
  'Pizza': 'pizza',
  'Paj': 'pie',
  'Matvete': 'wheat',
  'Nudlar': 'noodles',
  'Ris': 'rice',
  'Pasta': 'pasta',
  'Potatis': 'potato',
  'Vegetariskt': 'veg',
  'Kyckling': 'chicken',
  'Kött': 'meat',
  'Fisk': 'fish',
};

const catMapReverse = {
  'burger': 'Burgare',
  'pizza': 'Pizza',
  'pie': 'Paj',
  'wheat': 'Matvete',
  'noodles': 'Nudlar',
  'rice': 'Ris',
  'pasta': 'Pasta',
  'potato': 'Potatis',
  'veg': 'Vegetariskt',
  'chicken': 'Kyckling',
  'meat': 'Kött',
  'fish': 'Fisk',
};

const escapeHtml = (unsafe) => String(unsafe ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

// For embedding a JS string literal inside a double-quoted HTML attribute
// (e.g. onclick="fn(${escapeJsAttr(x)})"). JSON.stringify handles JS escaping;
// escapeHtml then prevents attribute breakout.
const escapeJsAttr = (unsafe) => escapeHtml(JSON.stringify(String(unsafe ?? '')));

// Allowlist sanitizer for the `directions` field: keeps <br> only, escapes
// everything else. Stops scripts/handlers/styles from recipe data reaching the DOM.
const sanitizeDirections = (directions) => {
  if (!directions) return '';
  const doc = new DOMParser().parseFromString(String(directions), 'text/html');
  let html = '';
  for (const node of doc.body.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      html += escapeHtml(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
      html += '<br/>';
    }
  }
  return html;
};

const getHrLongHtml = () => '<span style="color:#e3e3d9">-----------------------------------------------------------------</span>';

const getHrShortHtml = () => '<span style="color:#e3e3d9">----------</span>';

const updateContentBasedOnState = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pageId = urlParams.get('page');
  
  if (pageId && pageId.startsWith('rec')) {
    //console.log(`Load recipe with ID: ${pageId}`);

    showRecipe(pageId.substring(4), true);
  } else if (pageId && pageId.startsWith('cat')) {
    //console.log(`Load list page with ID: ${pageId}`);

    render(pageId.substring(4), true);
  }
}
