/*!
 * Masonry layout mode
 * sub-classes Masonry
 * http://masonry.desandro.com
 */
!function(t){"use strict";function o(t,o){var e=t.create("masonry"),i=e.prototype._getElementOffset,p=e.prototype.layout,r=e.prototype._getMeasurement;!function(t,o){for(var e in o)t[e]=o[e]}(e.prototype,o.prototype),e.prototype._getElementOffset=i,e.prototype.layout=p,e.prototype._getMeasurement=r;var n=e.prototype.measureColumns;e.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,n.call(this)};var s=e.prototype._manageStamp;return e.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,s.apply(this,arguments)},e}"function"==typeof define&&define.amd?define(["../layout-mode","masonry/masonry"],o):"object"==typeof exports?module.exports=o(require("../layout-mode"),require("masonry-layout")):o(t.Isotope.LayoutMode,t.Masonry)}(window);