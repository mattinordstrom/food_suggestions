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
