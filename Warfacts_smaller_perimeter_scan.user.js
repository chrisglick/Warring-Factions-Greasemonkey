// ==UserScript==
// @name        Warfacts Smaller Perimeter Scan
// @namespace   
// @description MAkes the perimeter scan vertically compressed
// @include     *.war-facts.com/extras/scan.php*
// @version     1.1
// @grant       none
// ==/UserScript==

// 1.1 - changed symbols for stuff to make it purdier.


/* Configuration Settings */



/* Script */


//alert('Monkey sez... "Hello World!"');

//hide the sort table
var firstTable = document.getElementsByTagName("table")[0];
firstTable.parentNode.removeChild(firstTable);

var h1 = document.getElementsByTagName("h1")[0];
h1.parentNode.removeChild(h1);


var i;


var tds = document.getElementById("perimTable").getElementsByTagName("tbody")[0].getElementsByTagName("td");
 for (i = 0; i < tds.length; i+=1) {


	// 0 = fleet name
	// 1 = user
	if (i % 6 == 1) {
		splitLines = tds[i].innerHTML.split('<br>');
		splitEmpire = splitLines[1].split(' ');
		shortEmpire = "";
		for (word of splitEmpire) {
			shortEmpire += word.substring(0,1);
		}
		
		var faction = splitLines[2].replace('<font color="#3333CC">Archons</font>', '<font color="#3388DD">►</font> ');
		faction = faction.replace('<font color="#CC0000">Scaldarians</font>', '<font color="#CC0000">►</span></font> ');
		faction = faction.replace('<font color="#aaaaaa">The Lost</font>', '<font color="#aaaaaa">►</font> ');
		
		tds[i].innerHTML = faction + splitLines[0] + " <span title='" + splitLines[1] + "'>[" + shortEmpire + "]</span>";
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
		pos = pos.replace("Colony:<br>", "Ѫ ");
		pos = pos.replace("Orbit:<br>", "&#x2295; ");
		pos = pos.replace("Open Space:<br>", "&Xi; ");
		pos = pos.replace("System:<br>", "☼&nbsp;");
		pos = pos.replace("Alpha", "&Acirc;");
		pos = pos.replace("Proto-arm", "Pa");
		pos = pos.replace("-A", "-");
		
		tds[i].innerHTML = pos;
	}
}