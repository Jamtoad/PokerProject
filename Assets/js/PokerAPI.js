/*
Needs to use the PokerApi.dev to fetch winning hand based on cards in play
Needs to return the hand type and then use that to tell the wiki to read data
*/

function siftData(data, status) {
	console.log(data, status)
}

//console.log($.get("https://api.pokerapi.dev/v1/winner/texas_holdem?cc=AC,KD,QH,JS,7C&pc[]=10S,8C&pc[]=3S,2C&pc[]=QS,JH",
//	test))

$.get("https://en.wikipedia.org/w/rest.php/v1/search/page?q=StraightHandInPoker&limit=1", siftData)