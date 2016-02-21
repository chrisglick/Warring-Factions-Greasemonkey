// ==UserScript==
// @name        WF Explorer Next Planet Button
// @namespace   https://greasyfork.org/en/users/10321-nikitas, glickeroo
// @description Adds a next planet button for probes which launches fleet to next planet. For www.war-facts.com .
// @match       http://*.war-facts.com/fleet.php*
// @version     7.1
// @require     https://code.jquery.com/jquery-2.1.4.min.js
// @grant       none


// Changes in 7.1 by glickeroo - increased timeout.
// 		Added load all and unload all cargo (except colonists and food)
// 		if the fleet name is a 3d coordinate, sned the fleet to that point.

// ==/UserScript==


//Configuration. Change to false if you don't want to autolaunch
var AutoLaunch = true;


//Script





$(document).ready(function() {

    window.setTimeout(runWholeScript,500);  //Added some extra delay cause sometimes script didn't have time to load correctly


    function runWholeScript(){
    

        var classificationNode = document.getElementById('fleetClass');
        var isExplorer = document.evaluate("//text()[contains(.,'Explorer') or contains(.,'Sentry') or contains(.,'Probe Rush')]", classificationNode, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
		
	//	alert("test");
		
		cargoBtn = document.getElementsByClassName('darkbutton')[6];
		
		var unloadAll = document.createElement('input');

		unloadAll.setAttribute('type', 'button');
		unloadAll.setAttribute('value', 'Unload All Cargo');
		unloadAll.setAttribute('class', 'darkbutton');
		unloadAll.setAttribute('title', 'Unload all resources except food and colonists.');
		unloadAll.setAttribute('onclick', 'moveCargo(-2, "water");moveCargo(-2, "iron");moveCargo(-2, "copper");moveCargo(-2, "silver");moveCargo(-2, "gold");moveCargo(-2, "platinum");moveCargo(-2, "diamonds");moveCargo(-2, "titanium");moveCargo(-2, "uranium");moveCargo(-2, "oil");');
		cargoBtn.parentNode.insertBefore(unloadAll, cargoBtn.nextSibling);
		
		var loadAll = document.createElement('input');

		loadAll.setAttribute('type', 'button');
		loadAll.setAttribute('value', 'Load All Cargo');
		loadAll.setAttribute('class', 'darkbutton');
		loadAll.setAttribute('title', 'Load all resources except food and colonists.');
		loadAll.setAttribute('onclick', 'moveCargo(2, "water");moveCargo(2, "iron");moveCargo(2, "copper");moveCargo(2, "silver");moveCargo(2, "gold");moveCargo(2, "platinum");moveCargo(2, "diamonds");moveCargo(2, "titanium");moveCargo(2, "uranium");moveCargo(2, "oil");');
		cargoBtn.parentNode.insertBefore(loadAll, cargoBtn.nextSibling);
		



        if (isExplorer){

		
			// test if the fleet name is a 3d nav
			fleetName = document.getElementById('pageHeadLine');
			splitName = fleetName.innerHTML.split(",");
			
			if (splitName.length == 3) {
				
				
				if (!isNaN(splitName[0]) && !isNaN(splitName[1]) && !isNaN(splitName[2])) {
					// if it is, try and verify those coords
					coords = document.getElementById('xyz');
					coords.value = fleetName.innerHTML;
					getMission('verify', 'c');
					
					// then launch
					launchFleet();
				}
			}
			
			
			
            var info = document.getElementById('navData').getElementsByTagName('div')[4];
            var infoSpan = info.getElementsByTagName('span')[0];

            // not  containing world in the span.
            var isAtSystemEntrance  =  ! (document.evaluate("//text()[contains(.,'World:')]", infoSpan, null, XPathResult.BOOLEAN_TYPE, null).booleanValue);


            //alert("Is explorer = " + isExplorer);
            //alert("Is at system Entrance = " + isAtSystemEntrance);
            var currentPlanet = info.getElementsByTagName('a')[0].innerHTML;

            


            //alert(currentPlanet);
            var optionGroup = document.getElementById('target1');
            optionGroup = optionGroup.getElementsByTagName('optgroup')[0];
            optionGroup = optionGroup.getElementsByTagName('option');

            var i = 0 , found = false,  optionsLength = optionGroup.length;
            var nextPlanetOption, finishedSystem = false;




            //if PlanetLess system
            if (optionsLength === 0 ) {
//            alert("Planetless System");
                found = true;
                finishedSystem = true;
            } else if (isAtSystemEntrance){ //if I am at system entrance
//            alert("At System Entrance");
                found = true;
                nextPlanetOption = optionGroup[0].value;
            }

 
            
            
            // If I am at a planet, Find next planet through the local target option list

            while ( (i < optionsLength) && (found == false) ) {

                if (optionGroup[i].innerHTML == currentPlanet ){
                    found = true;

                    if ( i == optionsLength -1 ){
                        finishedSystem = true;

                    } else {
                        nextPlanetOption = optionGroup[i+1].value;
                    }
                }

                i++;

            }

//   alert("finished system = " + finishedSystem);
//   alert("next planet = " + nextPlanetOption);



            
            
        function selectNextPlanet(){
            jQuery('#target1').val(nextPlanetOption).trigger ('change');

            if (AutoLaunch){
              //  alert("Auto Launch is on");
                window.setTimeout(launchFleet,100);
            } else {
            
            //    alert("Auto Launch is off");
            }
            

            
        }

            
            
//       alert("Reached finished System");

            if (finishedSystem) {
//            alert("Inside finished System");
                document.getElementById('missionData').innerHTML += '<input  class = "greenbutton darkbutton" type="button" id="nextPlanetButton" value = "Done" onclick="openStarMap()" />';
                document.getElementById('nextPlanetButton').addEventListener('click', openStarMap, false);
            } else {
                //           alert("Inside NOT finished System");
                document.getElementById('missionData').innerHTML += '<input  class = "greenbutton darkbutton" type="button" id="nextPlanetButton" value = "Next Planet"  />';
                document.getElementById('nextPlanetButton').addEventListener('click', selectNextPlanet, false);

            }

        }



        function openStarMap(){
            var starMapLink;
            if (isAtSystemEntrance){
                starMapLink  = document.getElementById('navData').getElementsByTagName('div')[10].getElementsByTagName('a')[0].href;
            } else {
                starMapLink  = document.getElementById('navData').getElementsByTagName('div')[11].getElementsByTagName('a')[0].href;
            }

            starMapLink = starMapLink.substring(19, starMapLink.length - 3 );   //Keep only the link, throw away the functions

            // mapWin is war-facts.com function to open javascript map
            mapWin(starMapLink);

        }



        function launchFleet(){
            var launchButton = document.getElementById('mButton').getElementsByTagName('input')[0];

            if (launchButton) { //So Button has been created
           //     alert("launcghing fleet");
                getMission('launch');   //Launch Fleet
                autoSelectNextExplorer();

            } else {
                window.setTimeout(launchFleet,100);
            }




        }

        
/*
        function checkIfLaunched(){
            var abortButton = document.getElementById('mButton').children[0];

            if (    (abortButton)  && (abortButton.value == "Abort Mission") ) {
                autoSelectNextExplorer();
            }else {
                alert("Trying Again");
                window.setTimeout(checkIfLaunched,250);
            }

        }

*/
 
   } 
});