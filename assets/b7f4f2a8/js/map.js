$(document).ready((function(){"use strict";0!=$("#map-canvas").length&&google.maps.event.addDomListener(window,"load",(function(){var e={center:new google.maps.LatLng(-33.8688,151.2195),zoom:13},o=new google.maps.Map(document.getElementById("map-canvas"),e),n=document.getElementById("pac-input"),t=document.getElementById("type-selector");o.controls[google.maps.ControlPosition.TOP_LEFT].push(n),o.controls[google.maps.ControlPosition.TOP_LEFT].push(t);var s=new google.maps.places.Autocomplete(n);s.bindTo("bounds",o);var a=new google.maps.InfoWindow,i=new google.maps.Marker({draggable:!0,map:o,anchorPoint:new google.maps.Point(0,-29)});google.maps.event.addListener(i,"mouseup",(function(e){$("#input-latitude").val(this.position.lat()),$("#input-longitude").val(this.position.lng())})),google.maps.event.addListener(s,"place_changed",(function(){a.close(),i.setVisible(!1);var e=s.getPlace();if(e.geometry){e.geometry.viewport?o.fitBounds(e.geometry.viewport):(o.setCenter(e.geometry.location),o.setZoom(17)),i.setIcon({url:e.icon,size:new google.maps.Size(71,71),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(35,35)}),i.setPosition(e.geometry.location),i.setVisible(!0),$("#input-latitude").val(e.geometry.location.lat()),$("#input-longitude").val(e.geometry.location.lng());var n="";e.address_components&&(n=[e.address_components[0]&&e.address_components[0].short_name||"",e.address_components[1]&&e.address_components[1].short_name||"",e.address_components[2]&&e.address_components[2].short_name||""].join(" ")),a.setContent("<div><strong>"+e.name+"</strong><br>"+n),a.open(o,i)}}))}))}));