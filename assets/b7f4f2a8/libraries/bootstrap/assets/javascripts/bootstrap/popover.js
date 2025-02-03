!function(t){"use strict";var o=function(t,o){this.init("popover",t,o)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");o.VERSION="3.3.2",o.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),(o.prototype=t.extend({},t.fn.tooltip.Constructor.prototype)).constructor=o,o.prototype.getDefaults=function(){return o.DEFAULTS},o.prototype.setContent=function(){var t=this.tip(),o=this.getTitle(),e=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](o),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof e?"html":"append":"text"](e),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},o.prototype.hasContent=function(){return this.getTitle()||this.getContent()},o.prototype.getContent=function(){var t=this.$element,o=this.options;return t.attr("data-content")||("function"==typeof o.content?o.content.call(t[0]):o.content)},o.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},o.prototype.tip=function(){return this.$tip||(this.$tip=t(this.options.template)),this.$tip};var e=t.fn.popover;t.fn.popover=function(e){return this.each((function(){var n=t(this),i=n.data("bs.popover"),r="object"==typeof e&&e;(i||"destroy"!=e)&&(i||n.data("bs.popover",i=new o(this,r)),"string"==typeof e&&i[e]())}))},t.fn.popover.Constructor=o,t.fn.popover.noConflict=function(){return t.fn.popover=e,this}}(jQuery);