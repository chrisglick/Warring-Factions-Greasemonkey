// ==UserScript==
// @name        Warfacts Larger Planet Halos
// @namespace   wf-larger-planet
// @description MAke planet halos larger because i have bad vision
// @include     http://www.war-facts.com/extras/view_system.php?*
// @version     1
// @grant       none
// ==/UserScript==


var allImg = document.getElementsByTagName("img")

var imagesToModify = [];

for (i = 0; i < allImg.length; i++)
{ 
  if (allImg[i].src.indexOf("gfx/planets") > 0)
  {
    imagesToModify.push(allImg[i]);
  }
}

for (i = 0; i < imagesToModify.length; i++)
{
  var thisImage = document.createElement("img");
  thisImage.setAttribute('src', imagesToModify[i].src);
  thisImage.setAttribute('border', 0);
  thisImage.setAttribute('height', imagesToModify[i].height + 2);
  thisImage.setAttribute('width', imagesToModify[i].width + 2);
  imagesToModify[i].parentNode.insertBefore(thisImage, imagesToModify[i]);
  
  thisImage.setAttribute('height', imagesToModify[i].height + 3);
  thisImage.setAttribute('width', imagesToModify[i].width + 3);
  imagesToModify[i].parentNode.insertBefore(thisImage, imagesToModify[i]);
}
