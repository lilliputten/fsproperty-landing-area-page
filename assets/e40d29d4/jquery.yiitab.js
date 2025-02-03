/**
 * jQuery Yii plugin file.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.yiiframework.com/
 * @copyright 2008-2010 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */
!function(i){i.extend(i.fn,{yiitab:function(){function n(n){var t=n.indexOf("#");t>=0&&(n=n.substring(t));var a=i(n),e=a.parent();e.find(">ul a").removeClass("active"),e.find('>ul a[href="'+n+'"]').addClass("active"),e.children("div").hide(),a.show()}this.find(">ul a").click((function(t){var a=i(this).attr("href"),e=a.indexOf("#");if(n(a),0==e||e>0&&(""==window.location.pathname||window.location.pathname==a.substring(0,e)))return!1}));var t=decodeURI(window.location),a=t.indexOf("#");if(a>=0){var e=t.substring(a);if(this.find('>ul a[href="'+e+'"]').length>0)return void n(e)}}})}(jQuery);