(function(e){"use strict";var t=e.History=e.History||{},r=e.jQuery;if(void 0!==t.Adapter)throw new Error("History.js Adapter has already been loaded...");t.Adapter={bind:function(e,t,a){r(e).bind(t,a)},trigger:function(e,t,a){r(e).trigger(t,a)},extractEventData:function(e,t,r){return t&&t.originalEvent&&t.originalEvent[e]||r&&r[e]||undefined},onDomLoad:function(e){r(e)}},void 0!==t.init&&t.init()})(window),function(e,t){"use strict";var r=e.console||t,a=e.document,o=e.navigator,n=e.sessionStorage||!1,i=e.setTimeout,s=e.clearTimeout,l=e.setInterval,u=e.clearInterval,c=e.JSON,d=e.alert,p=e.History=e.History||{},g=e.history;if(c.stringify=c.stringify||c.encode,c.parse=c.parse||c.decode,void 0!==p.init)throw new Error("History.js Core has already been loaded...");p.init=function(){return void 0!==p.Adapter&&(void 0!==p.initCore&&p.initCore(),void 0!==p.initHtml4&&p.initHtml4(),!0)},p.initCore=function(){if(void 0!==p.initCore.initialized)return!1;if(p.initCore.initialized=!0,p.options=p.options||{},p.options.hashChangeInterval=p.options.hashChangeInterval||100,p.options.safariPollInterval=p.options.safariPollInterval||500,p.options.doubleCheckInterval=p.options.doubleCheckInterval||500,p.options.storeInterval=p.options.storeInterval||1e3,p.options.busyDelay=p.options.busyDelay||250,p.options.debug=p.options.debug||!1,p.options.initialTitle=p.options.initialTitle||a.title,p.intervalList=[],p.clearAllIntervals=function(){var e,t=p.intervalList;if(null!=t){for(e=0;e<t.length;e++)u(t[e]);p.intervalList=null}},p.debug=function(){p.options.debug&&p.log.apply(p,arguments)},p.log=function(){var e,t,o,n,i,s=void 0!==r&&void 0!==r.log&&void 0!==r.log.apply,l=a.getElementById("log");for(s?(e=(n=Array.prototype.slice.call(arguments)).shift(),void 0!==r.debug?r.debug.apply(r,[e,n]):r.log.apply(r,[e,n])):e="\n"+arguments[0]+"\n",t=1,o=arguments.length;t<o;++t){if("object"==typeof(i=arguments[t])&&void 0!==c)try{i=c.stringify(i)}catch(e){}e+="\n"+i+"\n"}return l?(l.value+=e+"\n-----\n",l.scrollTop=l.scrollHeight-l.clientHeight):s||d(e),!0},p.getInternetExplorerMajorVersion=function(){var e=p.getInternetExplorerMajorVersion.cached=void 0!==p.getInternetExplorerMajorVersion.cached?p.getInternetExplorerMajorVersion.cached:function(){for(var e=3,t=a.createElement("div"),r=t.getElementsByTagName("i");(t.innerHTML="\x3c!--[if gt IE "+ ++e+"]><i></i><![endif]--\x3e")&&r[0];);return e>4&&e}();return e},p.isInternetExplorer=function(){return p.isInternetExplorer.cached=void 0!==p.isInternetExplorer.cached?p.isInternetExplorer.cached:Boolean(p.getInternetExplorerMajorVersion())},p.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(o.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(o.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in a)||p.isInternetExplorer()&&p.getInternetExplorerMajorVersion()<8)},p.enabled=!p.emulated.pushState,p.bugs={setHash:Boolean(!p.emulated.pushState&&"Apple Computer, Inc."===o.vendor&&/AppleWebKit\/5([0-2]|3[0-3])/.test(o.userAgent)),safariPoll:Boolean(!p.emulated.pushState&&"Apple Computer, Inc."===o.vendor&&/AppleWebKit\/5([0-2]|3[0-3])/.test(o.userAgent)),ieDoubleCheck:Boolean(p.isInternetExplorer()&&p.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(p.isInternetExplorer()&&p.getInternetExplorerMajorVersion()<7)},p.isEmptyObject=function(e){for(var t in e)return!1;return!0},p.cloneObject=function(e){var t,r;return e?(t=c.stringify(e),r=c.parse(t)):r={},r},p.getRootUrl=function(){var e=a.location.protocol+"//"+(a.location.hostname||a.location.host);return a.location.port&&(e+=":"+a.location.port),e+="/"},p.getBaseHref=function(){var e=a.getElementsByTagName("base"),t="";return 1===e.length&&(t=e[0].href.replace(/[^\/]+$/,"")),(t=t.replace(/\/+$/,""))&&(t+="/"),t},p.getBaseUrl=function(){return p.getBaseHref()||p.getBasePageUrl()||p.getRootUrl()},p.getPageUrl=function(){var e;return e=((p.getState(!1,!1)||{}).url||a.location.href).replace(/\/+$/,"").replace(/[^\/]+$/,(function(e,t,r){return/\./.test(e)?e:e+"/"})),e},p.getBasePageUrl=function(){return a.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,(function(e,t,r){return/[^\/]$/.test(e)?"":e})).replace(/\/+$/,"")+"/"},p.getFullUrl=function(e,t){var r=e,a=e.substring(0,1);return t=void 0===t||t,/[a-z]+\:\/\//.test(e)||(r="/"===a?p.getRootUrl()+e.replace(/^\/+/,""):"#"===a?p.getPageUrl().replace(/#.*/,"")+e:"?"===a?p.getPageUrl().replace(/[\?#].*/,"")+e:t?p.getBaseUrl()+e.replace(/^(\.\/)+/,""):p.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),r.replace(/\#$/,"")},p.getShortUrl=function(e){var t=e,r=p.getBaseUrl(),a=p.getRootUrl();return p.emulated.pushState&&(t=t.replace(r,"")),t=t.replace(a,"/"),p.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,"")},p.store={},p.idToState=p.idToState||{},p.stateToId=p.stateToId||{},p.urlToId=p.urlToId||{},p.storedStates=p.storedStates||[],p.savedStates=p.savedStates||[],p.normalizeStore=function(){p.store.idToState=p.store.idToState||{},p.store.urlToId=p.store.urlToId||{},p.store.stateToId=p.store.stateToId||{}},p.getState=function(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);var r=p.getLastSavedState();return!r&&t&&(r=p.createStateObject()),e&&((r=p.cloneObject(r)).url=r.cleanUrl||r.url),r},p.getIdByState=function(e){var t,r=p.extractId(e.url);if(!r)if(t=p.getStateString(e),void 0!==p.stateToId[t])r=p.stateToId[t];else if(void 0!==p.store.stateToId[t])r=p.store.stateToId[t];else{for(;r=(new Date).getTime()+String(Math.random()).replace(/\D/g,""),void 0!==p.idToState[r]||void 0!==p.store.idToState[r];);p.stateToId[t]=r,p.idToState[r]=e}return r},p.normalizeState=function(e){var t,r;return e&&"object"==typeof e||(e={}),void 0!==e.normalized?e:(e.data&&"object"==typeof e.data||(e.data={}),(t={}).normalized=!0,t.title=e.title||"",t.url=p.getFullUrl(p.unescapeString(e.url||a.location.href)),t.hash=p.getShortUrl(t.url),t.data=p.cloneObject(e.data),t.id=p.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,r=!p.isEmptyObject(t.data),(t.title||r)&&(t.hash=p.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id),t.hashedUrl=p.getFullUrl(t.hash),(p.emulated.pushState||p.bugs.safariPoll)&&p.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t)},p.createStateObject=function(e,t,r){var a={data:e,title:t,url:r};return a=p.normalizeState(a)},p.getStateById=function(e){return e=String(e),p.idToState[e]||p.store.idToState[e]||t},p.getStateString=function(e){var t;return t={data:p.normalizeState(e).data,title:e.title,url:e.url},c.stringify(t)},p.getStateId=function(e){return p.normalizeState(e).id},p.getHashByState=function(e){return p.normalizeState(e).hash},p.extractId=function(e){var t;return(t=/(.*)\&_suid=([0-9]+)$/.exec(e))&&t[1]||e,(t?String(t[2]||""):"")||!1},p.isTraditionalAnchor=function(e){return!/[\/\?\.]/.test(e)},p.extractState=function(e,t){var r,a,o=null;return t=t||!1,(r=p.extractId(e))&&(o=p.getStateById(r)),o||(a=p.getFullUrl(e),(r=p.getIdByUrl(a)||!1)&&(o=p.getStateById(r)),!o&&t&&!p.isTraditionalAnchor(e)&&(o=p.createStateObject(null,null,a))),o},p.getIdByUrl=function(e){return p.urlToId[e]||p.store.urlToId[e]||t},p.getLastSavedState=function(){return p.savedStates[p.savedStates.length-1]||t},p.getLastStoredState=function(){return p.storedStates[p.storedStates.length-1]||t},p.hasUrlDuplicate=function(e){var t;return(t=p.extractState(e.url))&&t.id!==e.id},p.storeState=function(e){return p.urlToId[e.url]=e.id,p.storedStates.push(p.cloneObject(e)),e},p.isLastSavedState=function(e){var t=!1;return p.savedStates.length&&(t=e.id===p.getLastSavedState().id),t},p.saveState=function(e){return!p.isLastSavedState(e)&&(p.savedStates.push(p.cloneObject(e)),!0)},p.getStateByIndex=function(e){return void 0===e?p.savedStates[p.savedStates.length-1]:e<0?p.savedStates[p.savedStates.length+e]:p.savedStates[e]},p.getHash=function(){return p.unescapeHash(a.location.hash)},p.unescapeString=function(t){for(var r,a=t;(r=e.unescape(a))!==a;)a=r;return a},p.unescapeHash=function(e){var t=p.normalizeHash(e);return t=p.unescapeString(t)},p.normalizeHash=function(e){return e.replace(/[^#]*#/,"").replace(/#.*/,"")},p.setHash=function(e,t){var r,o,n;return!1!==t&&p.busy()?(p.pushQueue({scope:p,callback:p.setHash,args:arguments,queue:t}),!1):(r=p.escapeHash(e),p.busy(!0),(o=p.extractState(e,!0))&&!p.emulated.pushState?p.pushState(o.data,o.title,o.url,!1):a.location.hash!==r&&(p.bugs.setHash?(n=p.getPageUrl(),p.pushState(null,null,n+"#"+r,!1)):a.location.hash=r),p)},p.escapeHash=function(t){var r=p.normalizeHash(t);return r=e.escape(r),p.bugs.hashEscape||(r=r.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),r},p.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=p.unescapeHash(t)},p.setTitle=function(e){var t,r=e.title;r||(t=p.getStateByIndex(0))&&t.url===e.url&&(r=t.title||p.options.initialTitle);try{a.getElementsByTagName("title")[0].innerHTML=r.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(e){}return a.title=r,p},p.queues=[],p.busy=function(e){if(void 0!==e?p.busy.flag=e:void 0===p.busy.flag&&(p.busy.flag=!1),!p.busy.flag){s(p.busy.timeout);var t=function(){var e,r,a;if(!p.busy.flag)for(e=p.queues.length-1;e>=0;--e)0!==(r=p.queues[e]).length&&(a=r.shift(),p.fireQueueItem(a),p.busy.timeout=i(t,p.options.busyDelay))};p.busy.timeout=i(t,p.options.busyDelay)}return p.busy.flag},p.busy.flag=!1,p.fireQueueItem=function(e){return e.callback.apply(e.scope||p,e.args||[])},p.pushQueue=function(e){return p.queues[e.queue||0]=p.queues[e.queue||0]||[],p.queues[e.queue||0].push(e),p},p.queue=function(e,t){return"function"==typeof e&&(e={callback:e}),void 0!==t&&(e.queue=t),p.busy()?p.pushQueue(e):p.fireQueueItem(e),p},p.clearQueue=function(){return p.busy.flag=!1,p.queues=[],p},p.stateChanged=!1,p.doubleChecker=!1,p.doubleCheckComplete=function(){return p.stateChanged=!0,p.doubleCheckClear(),p},p.doubleCheckClear=function(){return p.doubleChecker&&(s(p.doubleChecker),p.doubleChecker=!1),p},p.doubleCheck=function(e){return p.stateChanged=!1,p.doubleCheckClear(),p.bugs.ieDoubleCheck&&(p.doubleChecker=i((function(){return p.doubleCheckClear(),p.stateChanged||e(),!0}),p.options.doubleCheckInterval)),p},p.safariStatePoll=function(){var t=p.extractState(a.location.href);if(!p.isLastSavedState(t))return t||p.createStateObject(),p.Adapter.trigger(e,"popstate"),p},p.back=function(e){return!1!==e&&p.busy()?(p.pushQueue({scope:p,callback:p.back,args:arguments,queue:e}),!1):(p.busy(!0),p.doubleCheck((function(){p.back(!1)})),g.go(-1),!0)},p.forward=function(e){return!1!==e&&p.busy()?(p.pushQueue({scope:p,callback:p.forward,args:arguments,queue:e}),!1):(p.busy(!0),p.doubleCheck((function(){p.forward(!1)})),g.go(1),!0)},p.go=function(e,t){var r;if(e>0)for(r=1;r<=e;++r)p.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(r=-1;r>=e;--r)p.back(t)}return p},p.emulated.pushState){var h=function(){};p.pushState=p.pushState||h,p.replaceState=p.replaceState||h}else p.onPopState=function(t,r){var o,n,i=!1,s=!1;return p.doubleCheckComplete(),(o=p.getHash())?((n=p.extractState(o||a.location.href,!0))?p.replaceState(n.data,n.title,n.url,!1):(p.Adapter.trigger(e,"anchorchange"),p.busy(!1)),p.expectedStateId=!1,!1):((s=(i=p.Adapter.extractEventData("state",t,r)||!1)?p.getStateById(i):p.expectedStateId?p.getStateById(p.expectedStateId):p.extractState(a.location.href))||(s=p.createStateObject(null,null,a.location.href)),p.expectedStateId=!1,p.isLastSavedState(s)?(p.busy(!1),!1):(p.storeState(s),p.saveState(s),p.setTitle(s),p.Adapter.trigger(e,"statechange"),p.busy(!1),!0))},p.Adapter.bind(e,"popstate",p.onPopState),p.pushState=function(t,r,a,o){if(p.getHashByUrl(a)&&p.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(!1!==o&&p.busy())return p.pushQueue({scope:p,callback:p.pushState,args:arguments,queue:o}),!1;p.busy(!0);var n=p.createStateObject(t,r,a);return p.isLastSavedState(n)?p.busy(!1):(p.storeState(n),p.expectedStateId=n.id,g.pushState(n.id,n.title,n.url),p.Adapter.trigger(e,"popstate")),!0},p.replaceState=function(t,r,a,o){if(p.getHashByUrl(a)&&p.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(!1!==o&&p.busy())return p.pushQueue({scope:p,callback:p.replaceState,args:arguments,queue:o}),!1;p.busy(!0);var n=p.createStateObject(t,r,a);return p.isLastSavedState(n)?p.busy(!1):(p.storeState(n),p.expectedStateId=n.id,g.replaceState(n.id,n.title,n.url),p.Adapter.trigger(e,"popstate")),!0};if(n){try{p.store=c.parse(n.getItem("History.store"))||{}}catch(e){p.store={}}p.normalizeStore()}else p.store={},p.normalizeStore();p.Adapter.bind(e,"beforeunload",p.clearAllIntervals),p.Adapter.bind(e,"unload",p.clearAllIntervals),p.saveState(p.storeState(p.extractState(a.location.href,!0))),n&&(p.onUnload=function(){var e,t;try{e=c.parse(n.getItem("History.store"))||{}}catch(t){e={}}for(t in e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{},p.idToState)p.idToState.hasOwnProperty(t)&&(e.idToState[t]=p.idToState[t]);for(t in p.urlToId)p.urlToId.hasOwnProperty(t)&&(e.urlToId[t]=p.urlToId[t]);for(t in p.stateToId)p.stateToId.hasOwnProperty(t)&&(e.stateToId[t]=p.stateToId[t]);p.store=e,p.normalizeStore(),n.setItem("History.store",c.stringify(e))},p.intervalList.push(l(p.onUnload,p.options.storeInterval)),p.Adapter.bind(e,"beforeunload",p.onUnload),p.Adapter.bind(e,"unload",p.onUnload)),p.emulated.pushState||(p.bugs.safariPoll&&p.intervalList.push(l(p.safariStatePoll,p.options.safariPollInterval)),"Apple Computer, Inc."!==o.vendor&&"Mozilla"!==(o.appCodeName||"")||(p.Adapter.bind(e,"hashchange",(function(){p.Adapter.trigger(e,"popstate")})),p.getHash()&&p.Adapter.onDomLoad((function(){p.Adapter.trigger(e,"hashchange")}))))},p.init()}(window);