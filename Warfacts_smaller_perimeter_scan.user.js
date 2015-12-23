// ==UserScript==
// @name        Warfacts Smaller Perimeter Scan
// @namespace   
// @description MAkes the perimeter scan vertically compressed
// @include     *.war-facts.com/extras/scan.php*
// @version     1.0
// @grant       none
// ==/UserScript==




/* Configuration Settings */



/* Script */


//alert('Monkey sez... "Hello World!"');

//hide the sort table
document.getElementsByTagName("table")[0].innerHTML = "";

//Each starlog entry is a div, grab them all
var tds = document.getElementById("perimTable").getElementsByTagName("tbody")[0].getElementsByTagName("td");
var i;
var currentValue;


//For each starlog entry
 for (i = 0; i < tds.length; i+=1) {	//i=3 because first are headers 


	// 0 = fleet name
	// 1 = user
	if (i % 6 == 1) {
		splitLines = tds[i].innerHTML.split('<br>');
		tds[i].innerHTML = splitLines[2].replace('<font color="#CC0000">Scaldarians</font>', '<font color="#CC0000">&bull;</font> ') + splitLines[0] + " [" + splitLines[1] + "]";
	}
	


	// 2 = # ships
	// 3 = tonnage
	// 4 = distance
	if (i % 6 == 4) {
		splitLines = tds[i].innerHTML.split('<br>');
		tds[i].innerHTML = splitLines[0];
	}
	// 5 = position
	if (i % 6 == 5) {
		pos = tds[i].innerHTML;
		pos = pos.replace("Colony:<br>", "&Delta; ");
		pos = pos.replace("Orbit:<br>", "&#x2295; ");
		pos = pos.replace("Open Space:<br>", "&there4; ");
		
		tds[i].innerHTML = pos;
	}
}
