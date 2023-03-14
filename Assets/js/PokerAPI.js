/*
Needs to use the PokerApi.dev to fetch winning hand based on cards in play
Needs to return the hand type and then use that to tell the wiki to read data
*/

//// Constants
let CARDS = [
	"QS", "KS", "JS", "AS", "10S", "9S", "8S", "7S", "6S", "5S", "4S", "3S", "2S",
	"QH", "KH", "JH", "AH", "10H", "9H", "8H", "7H", "6H", "5H", "4H", "3H", "2H",
	"QD", "KD", "JD", "AD", "10D", "9D", "8D", "7D", "6D", "5D", "4D", "3D", "2D",
	"QC", "KC", "JC", "AC", "10C", "9C", "8C", "7C", "6C", "5C", "4C", "3C", "2C",
]

//// Elements
let CARD_SELECTION = $(".card-selection")

//// Variables
var currentlySelectedCard
var currentlySelectedSuite
var currentlySelectedType

var selectedCards = []

//// Functions
// Getters
function getCardFromSelection() {
	let formattedSuite = $(currentlySelectedSuite).text().substr(1, 1)
	let formattedType = $(currentlySelectedType).text().substr(1, 1)

	// Adjusts for the number 10 being the only type longer than 2 characters
	if (formattedType == "1") {
		formattedType = "10"
	}

	return [formattedSuite, formattedType]
}

// Actions
function cardSelected() {
	$(CARD_SELECTION).toggleClass("hide")
	$(currentlySelectedSuite).removeClass("active")
	$(currentlySelectedType).removeClass("active")

	let [suite, type] = getCardFromSelection()
	$(currentlySelectedCard).attr("src", "./assets/CardImages/" + type + suite + ".png")

	currentlySelectedSuite = null
	currentlySelectedType = null
}

// Events
function onAPIFetch(data, status) {

}

function onCardSelectionActivated(button, selection) {
	if (currentlySelectedSuite && selection == "suite") {
		$(currentlySelectedSuite).removeClass("active")

	} else if (currentlySelectedType && selection == "type") {
		$(currentlySelectedType).removeClass("active")
	}
	
	$(button.currentTarget).addClass("active")

	if (selection == "suite") {
		currentlySelectedSuite = $(button.currentTarget)
	} else {
		currentlySelectedType = $(button.currentTarget)
	}

	if (currentlySelectedSuite && currentlySelectedType) {
		cardSelected()
	}
}

function onCardActivated(button) {
	$(CARD_SELECTION).toggleClass("hide")

	currentlySelectedCard = $(button.currentTarget)
}

$(".poker-card").on("click", onCardActivated)
$(".suite-selection").on("click", function(button) {
	onCardSelectionActivated(button, "suite")
})

$(".type-selection").on("click", function(button) {
	onCardSelectionActivated(button, "type")
})