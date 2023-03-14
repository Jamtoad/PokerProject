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



    var wikiPage = document.getElementById("hd");
    wikiPage.textContent=data.pages[0].excerpt;

    
}
  
