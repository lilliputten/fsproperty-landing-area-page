/**
 * jQuery Yii plugin file.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.yiiframework.com/
 * @copyright 2008-2010 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */
!function(t){t.yii={version:"1.0",submitForm:function(e,n,i){var r=t(e).parents("form")[0];r||((r=document.createElement("form")).style.display="none",e.parentNode.appendChild(r),r.method="POST"),"string"==typeof n&&""!=n&&(r.action=n),null!=e.target&&(r.target=e.target);var a=[];t.each(i,(function(t,e){var n=document.createElement("input");n.setAttribute("type","hidden"),n.setAttribute("name",t),n.setAttribute("value",e),r.appendChild(n),a.push(n)})),t(r).data("submitObject",t(e)),t(r).trigger("submit"),t.each(a,(function(){r.removeChild(this)}))}}}(jQuery);