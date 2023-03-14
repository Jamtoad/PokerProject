function getWikiAPI(currentHand, wikiInfo) {
    var requestWiki = "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" + currentHand + "&limit=1";
    
    fetch(requestWiki)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function(data) {
                displayWiki(data);
            })
        };
    })
};

function displayWiki(data) {
    var wikiPage = document.getElementById("hd");
    wikiPage.textContent = data.pages[0].excerpt;  
}