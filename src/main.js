function render(filter) {
  $( ".cat_menu").removeClass('cat_active');
  $( "#"+filter).addClass('cat_active');

  var newContent = '';
  recipes.forEach(function( recipe ) {
    if(filter && filter === 'Okategoriserat') {
      if(recipe.categories){
        return;
      }
    }

    if(filter && filter !== 'Alla' && filter !== 'Okategoriserat') {
      if(!recipe.categories || !recipe.categories.includes(filter)){
        return;
      }
    }

    var cats = recipe.categories;
    var catsOnRowEl = '';
    if(!cats) {
        cats = '';
    } else {
      recipe.categories.forEach(function( category ) {
        catsOnRowEl += '<div class="row_cat '+catMap[category]+'_cat"></div>';
      });
    }

    newContent += '<div class="row"><div class="row_cats_cont"><div class="row_cats">' + 
    catsOnRowEl + '</div></div>' + recipe.name + 
    '</div><br/>';
  });

  $( ".contentcontainer" ).html(newContent);
}

function getRecipes() {
    return [
        {
          "name": "Baconlåda",
          "source": "Från den tunna boken",
          "categories": [
            "Matvete",
            "Kött"
          ],
          "ingredients": "2 pkt bacon\n2 burkar champinjoner (skivade)\nSkivad ost\n2 dl grädde\nChilisås\n",
          "directions": "Bryn bacon och svampen.\nLägg i en form med osten över.\nVispa grädde hårt och tillsätt chilisås. Bred överst i formen.\n\n175-200° i ugnen.\n\nServera med ris eller matvete.\n"
        },
        {
          "name": "Bananpannkakor",
          "ingredients": "2 1/2 dl mjöl\n2 1/2 dl mjölk\n2 tsk bakpulver\n1 tsk vaniljsocker\nLite smält smör\n1 ägg\nLite salt\n2 mosade bananer\n",
          "directions": ""
        },
        {
          "name": "Broccolipaj med purjo och bacon",
          "source": "https://www.arla.se/recept/broccolipaj-med-purjolok/",
          "source_url": "https://www.arla.se/recept/broccolipaj-med-purjolok/",
          "categories": [
            "Paj"
          ],
          "ingredients": "Lägg till 1 pkt stekt bacon för extra smak!\n",
          "directions": ""
        },
        {
          "name": "Falafel",
          "source": "Linas matkasse recept",
          "categories": [
            "Vegetariskt"
          ],
          "ingredients": "1 pkt kikärtor\n1/2 silverlök\n1 vitlöksklyfta\n3 msk mjöl\n1/2 tsk salt\n1 1/2 tsk spiskummin\n1 tsk koriander\n",
          "directions": "Skopa smeten på en tesked och rulla till en boll.\nRulla i ströbröd, lägg sedan bollarna i en varm panna med olja.\n\nTips! Det är lättare att rulla om man har lite blöta händer. \n"
        },
        {
          "name": "Falukorvsgratäng med bacon",
          "source": "Från boken med fåglar på omslaget",
          "categories": [
            "Pasta",
            "Kött"
          ],
          "ingredients": "400g falukorv\n2 paket bacon\n1 gul lök\n1 röd paprika\n200g champinjoner\n1 msk rapsolja\n3 dl vispgrädde\n2 msk hackad färsk oregano\n150g västerbottenost\nsalt och peppar\n",
          "directions": "Stek korv och bacon.\nStek lök, paprika och svamp.\nBlanda allti en ugnsform.\nHäll över grädden och krydda.\nStrö över oregano och riven ost.\nUgnen på 200°, ca 15 min. Servera med spagetti.\n"
        },
        {
          "name": "Fläskpannkaka",
          "source": "Från den tunna boken",
          "categories": [
            "Kött"
          ],
          "ingredients": "2 1/2 dl vetemjöl\n1/2 tsk salt\n6 dl mjölk\n3 ägg\n3 msk margarin\n\n200-300g bacon\n1 gul lök\n",
          "directions": "225° i 20 minuter.\n"
        },
        {
          "name": "Kålpudding",
          "source": "Från den gröna lilla pärmen",
          "categories": [
            "Potatis",
            "Kött"
          ],
          "ingredients": "1 kg vitkål\nOlja\n2 msk sirap\n1 tsk salt\n2 krm svartpeppar\n\n1 gul lök\n500g kötttfärs\n1 ägg \n2 msk japansk soja\n1 dl vispgrädde\n1 msk konc. kalvfond\n1 msk sirap\n1/2 tsk salt\n2 krm svartpeppar\n",
          "directions": "Bryn kålet på hög värme i olja ca 5 minuter.\n\nLägg hälften av kålen i botten av en form.\nLägg i köttet och forma till en limpa.\nLägg på resten av kålen.\n\nUgnen på 200° i 40 minuter.\nServera med potatis och lingon.\n"
        },
        {
          "name": "Lasagne",
          "categories": [
            "Pasta",
            "Kött"
          ],
          "ingredients": "500g Köttfärs\n1 gul lök\n1 burk krossade tomater\n2 msk tomatpure\nKetchup\nBasilika\n1 st Köttbuljongtärning\nSalt och peppar\n\n50g smält margarin\n3 msk mjöl\n6 dl mjölk\n100g riven ost\n",
          "directions": "Häll 2/5 av såsen i botten av en ugnsform.\nLägg på lasagneplattor (3 st).\nLägg på hälften av köttfärssåsen.\nLägg på lasagneplattor.\nLägg på resten av köttfärssåsen.\nLägg på lasagneplattor.\nHäll på resten av såsen.\nAvsluta med ett lager riven ost.\nUgnen på 200°, 30 min.\n"
        },
        {
          "name": "Laxbiffar med nudelsallad",
          "source": "https://www.coop.se/recept/laxbiffar-med-nudelsallad",
          "source_url": "https://www.coop.se/recept/laxbiffar-med-nudelsallad",
          "categories": [
            "Nudlar",
            "Fisk"
          ],
          "ingredients": "",
          "directions": ""
        },
        {
          "name": "Matgeeks hamburgare",
          "source": "Youtube",
          "categories": [
            "Kött"
          ],
          "ingredients": "Högrevsburgare\nBacon\nSyltad gul lök\nVitlöksmajonäs\n",
          "directions": "Stek löken på svag värme i mycket smör.\n"
        },
        {
          "name": "Oreganokyckling",
          "source": "ICA buffe",
          "categories": [
            "Potatis",
            "Kyckling"
          ],
          "ingredients": "500g kycklingfile\n2 vitlöksklyftor\n1 msk smör\n1/2 tsk salt\n1 krm svartpeppar\n2 1/2 dl matlagningsgrädde\n1 hönsbuljongtärning\n2 tsk oregano (färsk eller torkad)\n1 1/2 msk balsamvinäger\n",
          "directions": "Stek kycklingbitar i smör, salta och peppra.\nBlanda grädde, buljong, oregano och vinäger i en gryta.\nLägg i kycklingen och vitlöken.\nLåt att koka under lock i 5 minuter.\n\nServera med klyftpotatis\n"
        },
        {
          "name": "Pastagratäng",
          "source": "https://www.jennysmatblogg.nu/2011/03/01/pastagratang-med-kramig-ostsas/",
          "source_url": "https://www.jennysmatblogg.nu/2011/03/01/pastagratang-med-kramig-ostsas/",
          "categories": [
            "Pasta",
            "Kött"
          ],
          "ingredients": "",
          "directions": ""
        },
        {
          "name": "Pizza",
          "source": "Från tjocka kokboken",
          "ingredients": "Degen:\n1/2 paket jäst\n2 dl fingervarmt vatten\n1 msk olja\n5-6 dl mjöl\n1/2 tsk salt\n\nFyllning:\n1 pkt krossade tomater\nBasilika\nOregano\nKetchup\nLökringar\nSalami\nRiven ost\nMozzarella\nPaprika\n",
          "directions": ""
        },
        {
          "name": "Tacopaj",
          "source": "https://www.hemtrevligt.se/icakuriren/recept/tacopaj/",
          "source_url": "https://www.hemtrevligt.se/icakuriren/recept/tacopaj/",
          "categories": [
            "Paj",
            "Kött"
          ],
          "ingredients": "",
          "directions": "Servera med tacosås\n"
        },
        {
          "name": "Varm pastasallad",
          "source": "Från den tunna boken",
          "categories": [
            "Pasta",
            "Kyckling",
            "Kött"
          ],
          "ingredients": "500g pasta\n2 stora kycklingfileer\n150g marinerade vitlöksklyftor\n1 röd paprika\n1 rödlök\n2 vitlöksklyftor\n1 paket bacon\n150g soltorkade tomater\n2 tsk senap\n1 äggula\n3 msk vinäger\n2 dl olivolja\n1 tsk salt\n2 tsk svartpeppar\n1 tsk chilipeppar\n20-30g permesanost\n",
          "directions": ""
        },
        {
          "name": "Vårrullar med ris",
          "source": "https://www.coop.se/recept/kal-och-farsfyllda-varrullar",
          "source_url": "https://www.coop.se/recept/kal-och-farsfyllda-varrullar",
          "categories": [
            "Ris",
            "Kött"
          ],
          "ingredients": "",
          "directions": "Koka 6 portioner ris.\nServera med sweet chili sås.\n\nTa lite mindre Sambal oelek än vad som står i receptet. \nDet blir rätt starkt annars!\n"
        },
        {
          "name": "Örtbakad lax",
          "source": "Från boken med fåglar på omslaget",
          "categories": [
            "Potatis",
            "Fisk"
          ],
          "ingredients": "4 st laxfileer\n2 dl creme fraiche\n200g philadelphiaost\n1 msk finhackad dill\n1 msk gräslök\nsalt och citronpeppar\n",
          "directions": "Ugnen på 200° 25-30 min. Servera med potatismos.\n"
        }
      ];
}
var recipes = getRecipes();

var catMap = {
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
};