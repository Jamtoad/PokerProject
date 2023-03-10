/*
Needs to use the PokerApi.dev to fetch winning hand based on cards in play
Needs to return the hand type and then use that to tell the wiki to read data
*/

// Constants
let CARDS = [
	"QS", "KS", "JS", "AS", "10S", "9S", "8S", "7S", "6S", "5S", "4S", "3S", "2S",
	"QH", "KH", "JH", "AH", "10H", "9H", "8H", "7H", "6H", "5H", "4H", "3H", "2H",
	"QD", "KD", "JD", "AD", "10D", "9D", "8D", "7D", "6D", "5D", "4D", "3D", "2D",
	"QC", "KC", "JC", "AC", "10C", "9C", "8C", "7C", "6C", "5C", "4C", "3C", "2C",
]

function onAPIFetch(data, status) {

}

function onCardActivated(button) {
	
}

$(".poker-card").on("click", onCardActivated)