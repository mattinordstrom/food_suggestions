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
  'Ivar': 'ivar',
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
  'ivar': 'Ivar',
};

function getHrLongHtml() {
  return '<span style="color:#ccc">-----------------------------------------------------------------</span>';
}

function getHrShortHtml() {
  return '<span style="color:#ccc">----------</span>';
}
