(function($){$.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(t,e){this.defaults.type=t,this.defaults.name=e},get:function(elem,opts){var settings=$.extend({},this.defaults,opts);settings.single.length||(settings.single="metadata");var data=$.data(elem,settings.single);if(data)return data;data="{}";var getData=function(data){if("string"!=typeof data)return data;data.indexOf("{")<0&&(data=eval("("+data+")"))},getObject=function(data){return"string"!=typeof data||(data=eval("("+data+")")),data};if("html5"==settings.type){var object={};$(elem.attributes).each((function(){var t=this.nodeName;if(!t.match(/^data-/))return!0;t=t.replace(/^data-/,""),object[t]=getObject(this.nodeValue)}))}else{if("class"==settings.type){var m=settings.cre.exec(elem.className);m&&(data=m[1])}else if("elem"==settings.type){if(!elem.getElementsByTagName)return;var e=elem.getElementsByTagName(settings.name);e.length&&(data=$.trim(e[0].innerHTML))}else if(null!=elem.getAttribute){var attr=elem.getAttribute(settings.name);attr&&(data=attr)}object=getObject(data.indexOf("{")<0?"{"+data+"}":data)}return $.data(elem,settings.single,object),object}}}),$.fn.metadata=function(t){return $.metadata.get(this[0],t)}})(jQuery);