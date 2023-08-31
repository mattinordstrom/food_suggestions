const catMap = {
  'Kött': 'meat',
  'Fisk': 'fish',
  'Kyckling': 'chicken',
  'Vegetariskt': 'veg',
  'Potatis': 'potato',
  'Pasta': 'pasta',
  'Ris': 'rice',
  'Nudlar': 'noodles',
  'Matvete': 'wheat',
  'Paj': 'pie',
  'Pizza': 'pizza',
  'Burgare': 'burger',
  'Ivar': 'ivar',
};

const catMapReverse = {
  'meat': 'Kött',
  'fish': 'Fisk',
  'chicken': 'Kyckling',
  'veg': 'Vegetariskt',
  'potato': 'Potatis',
  'pasta': 'Pasta',
  'rice': 'Ris',
  'noodles': 'Nudlar',
  'wheat': 'Matvete',
  'pie': 'Paj',
  'pizza': 'Pizza',
  'burger': 'Burgare',
  'ivar': 'Ivar',
};

function getHrLongHtml() {
  return '<span style="color:#ccc">-----------------------------------------------------------------</span>';
}

function getHrShortHtml() {
  return '<span style="color:#ccc">----------</span>';
}
