


function getApi(currentHand) {

    var requestWiki = "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" + currentHand + "&limit=1";
    console.log(requestWiki);
    fetch(requestWiki)
    .then(function (response) {
        if (response.ok) {
       response.json().then(function(data) {
        displayWiki(data);
        console.log(requestWiki);
       });
      } 
    })
    console.log(requestWiki);
};

var displayWiki = function (data) {
console.log(data.pages[0].excerpt)


    var wikiPage = document.getElementById("results");
    wikiPage.innerHTML=data.pages[0].excerpt

    
}
   getApi("highcard"); 

