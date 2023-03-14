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

// This is an object with arrays, the first key is the name and second is the wiki
// search descriptor
let HAND_FORMATTERS = {
	high_card: ["High Card", "poker_high_card"],
	pair: ["Pair", "pair_texas_hold_em"],
	two_pair: ["Two Pair", "poker_two_pair"],
	three_of_a_kind: ["Three of a Kind", "poker_three_of_a_kind"],
	straight: ["Straight", "poker_straight"],
	flush: ["Flush", "poker_fush"],
	full_house: ["Full House", "poker_full_house"],
	four_of_a_kind: ["Four of a Kind", "poker_four_of_a_kind"],
	straight_flush: ["Straight Flush", "poker_straight_flush"],
	royal_flush: ["Royal Flush", "poker_royal_flush"]
}

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

	selectedCards[$(currentlySelectedCard).attr("id")] = type + suite

	currentlySelectedSuite = null
	currentlySelectedType = null
}

function fetchAPI() {
	$.get("https://api.pokerapi.dev/v1/winner/texas_holdem?cc="
		+ selectedCards[0] + "," + selectedCards[1] + "," + selectedCards[2]
		+ "," + selectedCards[3] + "," + selectedCards[4] + "&pc[]="
		+ selectedCards[5] + "," + selectedCards[6], onFetchAPI)
}

// Events
function onFetchAPI(data, success) {
	if (success == "success") {
		getWikiAPI(HAND_FORMATTERS[data.winners[0].result][0],
			HAND_FORMATTERS[data.winners[0].result][1])
	}
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

function onCheckResult(button) {
	fetchAPI()
}

$(".check-result").on("click", onCheckResult)
$(".poker-card").on("click", onCardActivated)
$(".suite-selection").on("click", function(button) {
	onCardSelectionActivated(button, "suite")
})

$(".type-selection").on("click", function(button) {
	onCardSelectionActivated(button, "type")
})