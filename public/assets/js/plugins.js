// usage: log('inside coolFunc', this, arguments);
window.log = function(){
	log.history = log.history || [];   // store logs to an array for reference
	log.history.push(arguments);
	if(this.console) {
		arguments.callee = arguments.callee.caller;
		console.log( Array.prototype.slice.call(arguments) );
	}
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

// place any jQuery/helper plugins in here, instead of separate, slower script files.

/*
 *	Tabby jQuery plugin version 0.12
 *
 *	Ted Devito - http://teddevito.com/demos/textarea.html
 *
 *	Copyright (c) 2009 Ted Devito
 *	 
 *	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following 
 *	conditions are met:
 *	
 *		1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *		2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer  
 *			in the documentation and/or other materials provided with the distribution.
 *		3. The name of the author may not be used to endorse or promote products derived from this software without specific prior written 
 *			permission. 
 *	 
 *	THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
 *	IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE 
 *	LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, 
 *	PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY 
 *	THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
 *	OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
(function($){$.fn.tabby=function(c){var d=$.extend({},$.fn.tabby.defaults,c);var f=$.fn.tabby.pressed;return this.each(function(){$this=$(this);var b=$.meta?$.extend({},d,$this.data()):d;$this.bind('keydown',function(e){var a=$.fn.tabby.catch_kc(e);if(16==a)f.shft=true;if(17==a){f.ctrl=true;setTimeout("$.fn.tabby.pressed.ctrl = false;",1000)}if(18==a){f.alt=true;setTimeout("$.fn.tabby.pressed.alt = false;",1000)}if(9==a&&!f.ctrl&&!f.alt){e.preventDefault;f.last=a;setTimeout("$.fn.tabby.pressed.last = null;",0);process_keypress($(e.target).get(0),f.shft,b);return false}}).bind('keyup',function(e){if(16==$.fn.tabby.catch_kc(e))f.shft=false}).bind('blur',function(e){if(9==f.last)$(e.target).one('focus',function(e){f.last=null}).get(0).focus()})})};$.fn.tabby.catch_kc=function(e){return e.keyCode?e.keyCode:e.charCode?e.charCode:e.which};$.fn.tabby.pressed={shft:false,ctrl:false,alt:false,last:null};function debug(a){if(window.console&&window.console.log)window.console.log('textarea count: '+a.size())};function process_keypress(o,a,b){var c=o.scrollTop;if(o.setSelectionRange)gecko_tab(o,a,b);else if(document.selection)ie_tab(o,a,b);o.scrollTop=c}$.fn.tabby.defaults={tabString:String.fromCharCode(9)};function gecko_tab(o,a,b){var c=o.selectionStart;var d=o.selectionEnd;if(c==d){if(a){if("\t"==o.value.substring(c-b.tabString.length,c)){o.value=o.value.substring(0,c-b.tabString.length)+o.value.substring(c);o.focus();o.setSelectionRange(c-b.tabString.length,c-b.tabString.length)}else if("\t"==o.value.substring(c,c+b.tabString.length)){o.value=o.value.substring(0,c)+o.value.substring(c+b.tabString.length);o.focus();o.setSelectionRange(c,c)}}else{o.value=o.value.substring(0,c)+b.tabString+o.value.substring(c);o.focus();o.setSelectionRange(c+b.tabString.length,c+b.tabString.length)}}else{var e=o.value.split("\n");var f=new Array();var g=0;var h=0;var j=false;for(var i in e){h=g+e[i].length;f.push({start:g,end:h,selected:(g<=c&&h>c)||(h>=d&&g<d)||(g>c&&h<d)});g=h+1}var k=0;for(var i in f){if(f[i].selected){var l=f[i].start+k;if(a&&b.tabString==o.value.substring(l,l+b.tabString.length)){o.value=o.value.substring(0,l)+o.value.substring(l+b.tabString.length);k-=b.tabString.length}else if(!a){o.value=o.value.substring(0,l)+b.tabString+o.value.substring(l);k+=b.tabString.length}}}o.focus();var m=c+((k>0)?b.tabString.length:(k<0)?-b.tabString.length:0);var n=d+k;o.setSelectionRange(m,n)}}function ie_tab(o,a,b){var c=document.selection.createRange();if(o==c.parentElement()){if(''==c.text){if(a){var d=c.getBookmark();c.moveStart('character',-b.tabString.length);if(b.tabString==c.text){c.text=''}else{c.moveToBookmark(d);c.moveEnd('character',b.tabString.length);if(b.tabString==c.text)c.text=''}c.collapse(true);c.select()}else{c.text=b.tabString;c.collapse(false);c.select()}}else{var e=c.text;var f=e.length;var g=e.split("\r\n");var h=document.body.createTextRange();h.moveToElementText(o);h.setEndPoint("EndToStart",c);var j=h.text;var k=j.split("\r\n");var l=j.length;var m=document.body.createTextRange();m.moveToElementText(o);m.setEndPoint("StartToEnd",c);var n=m.text;var p=document.body.createTextRange();p.moveToElementText(o);p.setEndPoint("StartToEnd",h);var q=p.text;var r=$(o).html();$("#r3").text(l+" + "+f+" + "+n.length+" = "+r.length);if((l+q.length)<r.length){k.push("");l+=2;if(a&&b.tabString==g[0].substring(0,b.tabString.length))g[0]=g[0].substring(b.tabString.length);else if(!a)g[0]=b.tabString+g[0]}else{if(a&&b.tabString==k[k.length-1].substring(0,b.tabString.length))k[k.length-1]=k[k.length-1].substring(b.tabString.length);else if(!a)k[k.length-1]=b.tabString+k[k.length-1]}for(var i=1;i<g.length;i++){if(a&&b.tabString==g[i].substring(0,b.tabString.length))g[i]=g[i].substring(b.tabString.length);else if(!a)g[i]=b.tabString+g[i]}if(1==k.length&&0==l){if(a&&b.tabString==g[0].substring(0,b.tabString.length))g[0]=g[0].substring(b.tabString.length);else if(!a)g[0]=b.tabString+g[0]}if((l+f+n.length)<r.length){g.push("");f+=2}h.text=k.join("\r\n");c.text=g.join("\r\n");var s=document.body.createTextRange();s.moveToElementText(o);if(0<l)s.setEndPoint("StartToEnd",h);else s.setEndPoint("StartToStart",h);s.setEndPoint("EndToEnd",c);s.select()}}}})(jQuery);

/*
Syntax highlighting with language autodetection.
http://softwaremaniacs.org/soft/highlight/
*/
var hljs=new function(){var p={};var a={};function n(c){return c.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function k(s,r){if(!s){return false}for(var c=0;c<s.length;c++){if(s[c]==r){return true}}return false}function e(s,r,c){var t="m"+(s.cI?"i":"")+(c?"g":"");return new RegExp(r,t)}function j(r){for(var c=0;c<r.childNodes.length;c++){node=r.childNodes[c];if(node.nodeName=="CODE"){return node}if(!(node.nodeType==3&&node.nodeValue.match(/\s+/))){return null}}}function h(u,t){var s="";for(var r=0;r<u.childNodes.length;r++){if(u.childNodes[r].nodeType==3){var c=u.childNodes[r].nodeValue;if(t){c=c.replace(/\n/g,"")}s+=c}else{if(u.childNodes[r].nodeName=="BR"){s+="\n"}else{s+=h(u.childNodes[r])}}}s=s.replace(/\r/g,"\n");return s}function b(t){var r=t.className.split(/\s+/);r=r.concat(t.parentNode.className.split(/\s+/));for(var c=0;c<r.length;c++){var s=r[c].replace(/^language-/,"");if(p[s]||s=="no-highlight"){return s}}}function d(c){var r=[];(function(t,u){for(var s=0;s<t.childNodes.length;s++){if(t.childNodes[s].nodeType==3){u+=t.childNodes[s].nodeValue.length}else{if(t.childNodes[s].nodeName=="BR"){u+=1}else{r.push({event:"start",offset:u,node:t.childNodes[s]});u=arguments.callee(t.childNodes[s],u);r.push({event:"stop",offset:u,node:t.childNodes[s]})}}}return u})(c,0);return r}function m(z,A,y){var s=0;var x="";var u=[];function v(){if(z.length&&A.length){if(z[0].offset!=A[0].offset){return(z[0].offset<A[0].offset)?z:A}else{return(z[0].event=="start"&&A[0].event=="stop")?A:z}}else{return z.length?z:A}}function t(E){var F="<"+E.nodeName.toLowerCase();for(var C=0;C<E.attributes.length;C++){var D=E.attributes[C];F+=" "+D.nodeName.toLowerCase();if(D.nodeValue!=undefined){F+='="'+n(D.nodeValue)+'"'}}return F+">"}function B(C){return"</"+C.nodeName.toLowerCase()+">"}while(z.length||A.length){var w=v().splice(0,1)[0];x+=n(y.substr(s,w.offset-s));s=w.offset;if(w.event=="start"){x+=t(w.node);u.push(w.node)}else{if(w.event=="stop"){var r=u.length;do{r--;var c=u[r];x+=B(c)}while(c!=w.node);u.splice(r,1);while(r<u.length){x+=t(u[r]);r++}}}}x+=y.substr(s);return x}function g(K,E){function A(r,N){for(var M=0;M<N.sm.length;M++){if(N.sm[M].bR.test(r)){return N.sm[M]}}return null}function x(M,r){if(D[M].e&&D[M].eR.test(r)){return 1}if(D[M].eW){var N=x(M-1,r);return N?N+1:0}return 0}function y(r,M){return M.iR&&M.iR.test(r)}function B(P,O){var N=[];for(var M=0;M<P.sm.length;M++){N.push(P.sm[M].b)}var r=D.length-1;do{if(D[r].e){N.push(D[r].e)}r--}while(D[r+1].eW);if(P.i){N.push(P.i)}return e(O,"("+N.join("|")+")",true)}function t(N,M){var O=D[D.length-1];if(!O.t){O.t=B(O,I)}O.t.lastIndex=M;var r=O.t.exec(N);if(r){return[N.substr(M,r.index-M),r[0],false]}else{return[N.substr(M),"",true]}}function c(P,r){var M=I.cI?r[0].toLowerCase():r[0];for(var O in P.keywordGroups){if(!P.keywordGroups.hasOwnProperty(O)){continue}var N=P.keywordGroups[O].hasOwnProperty(M);if(N){return[O,N]}}return false}function G(N,Q){if(!Q.k||!Q.l){return n(N)}if(!Q.lR){var P="("+Q.l.join("|")+")";Q.lR=e(I,P,true)}var O="";var R=0;Q.lR.lastIndex=0;var M=Q.lR.exec(N);while(M){O+=n(N.substr(R,M.index-R));var r=c(Q,M);if(r){u+=r[1];O+='<span class="'+r[0]+'">'+n(M[0])+"</span>"}else{O+=n(M[0])}R=Q.lR.lastIndex;M=Q.lR.exec(N)}O+=n(N.substr(R,N.length-R));return O}function L(r,N){if(N.subLanguage&&a[N.subLanguage]){var M=g(N.subLanguage,r);u+=M.keyword_count;C+=M.r;return M.value}else{return G(r,N)}}function J(N,r){var M=N.nM?"":'<span class="'+N.displayClassName+'">';if(N.rB){s+=M;N.buffer=""}else{if(N.eB){s+=n(r)+M;N.buffer=""}else{s+=M;N.buffer=r}}D[D.length]=N}function F(M,O,R){var P=D[D.length-1];if(R){s+=L(P.buffer+M,P);return false}var S=A(O,P);if(S){s+=L(P.buffer+M,P);J(S,O);C+=S.r;return S.rB}var r=x(D.length-1,O);if(r){var T=P.nM?"":"</span>";if(P.rE){s+=L(P.buffer+M,P)+T}else{if(P.eE){s+=L(P.buffer+M,P)+T+n(O)}else{s+=L(P.buffer+M+O,P)+T}}while(r>1){T=D[D.length-2].nM?"":"</span>";s+=T;r--;D.length--}var Q=D[D.length-1];D.length--;D[D.length-1].buffer="";if(Q.starts){for(var N=0;N<I.m.length;N++){if(I.m[N].cN==Q.starts){J(I.m[N],"");break}}}return P.rE}if(y(O,P)){throw"Illegal"}}var I=p[K];var D=[I.dM];var C=0;var u=0;var s="";try{var w=0;I.dM.buffer="";do{var z=t(E,w);var v=F(z[0],z[1],z[2]);w+=z[0].length;if(!v){w+=z[1].length}}while(!z[2]);if(D.length>1){throw"Illegal"}return{language:K,r:C,keyword_count:u,value:s}}catch(H){if(H=="Illegal"){return{language:null,r:0,keyword_count:0,value:n(E)}}else{throw H}}}function i(){function r(y,x){if(y.compiled){return}if(y.b){y.bR=e(x,"^"+y.b)}if(y.e){y.eR=e(x,"^"+y.e)}if(y.i){y.iR=e(x,"^(?:"+y.i+")")}if(y.r==undefined){y.r=1}if(!y.displayClassName){y.displayClassName=y.cN}if(!y.cN){y.nM=true}for(var w in y.k){if(!y.k.hasOwnProperty(w)){continue}if(y.k[w] instanceof Object){y.keywordGroups=y.k}else{y.keywordGroups={keyword:y.k}}break}y.sm=[];if(y.c){for(var v=0;v<y.c.length;v++){if(y.c[v] instanceof Object){y.sm.push(y.c[v])}else{for(var u=0;u<x.m.length;u++){if(x.m[u].cN==y.c[v]){y.sm.push(x.m[u])}}}}}y.compiled=true;for(var v=0;v<y.sm.length;v++){r(y.sm[v],x)}}for(var t in p){if(!p.hasOwnProperty(t)){continue}var c=[p[t].dM].concat(p[t].m);for(var s=0;s<c.length;s++){r(c[s],p[t])}}}function f(){if(f.called){return}f.called=true;i();a=p}function q(v,A,r){f();var C=h(v,r);var t=b(v);if(t=="no-highlight"){return}if(t){var y=g(t,C)}else{var y={language:"",keyword_count:0,r:0,value:n(C)};var z=y;for(var B in a){if(!a.hasOwnProperty(B)){continue}var w=g(B,C);if(w.keyword_count+w.r>z.keyword_count+z.r){z=w}if(w.keyword_count+w.r>y.keyword_count+y.r){z=y;y=w}}}var u=v.className;if(!u.match(y.language)){u=u?(u+" "+y.language):y.language}var c=d(v);if(c.length){var s=document.createElement("pre");s.innerHTML=y.value;y.value=m(c,d(s),C)}if(A){y.value=y.value.replace(/^((<[^>]+>|\t)+)/gm,function(D,G,F,E){return G.replace(/\t/g,A)})}if(r){y.value=y.value.replace(/\n/g,"<br>")}if(/MSIE [678]/.test(navigator.userAgent)&&v.tagName=="CODE"&&v.parentNode.tagName=="PRE"){var s=v.parentNode;var x=document.createElement("div");x.innerHTML="<pre><code>"+y.value+"</code></pre>";v=x.firstChild.firstChild;x.firstChild.cN=s.cN;s.parentNode.replaceChild(x.firstChild,s)}else{v.innerHTML=y.value}v.className=u;v.dataset={};v.dataset.result={language:y.language,kw:y.keyword_count,re:y.r};if(z&&z.language){v.dataset.second_best={language:z.language,kw:z.keyword_count,re:z.r}}}function l(){if(l.called){return}l.called=true;f();if(arguments.length){for(var c=0;c<arguments.length;c++){if(p[arguments[c]]){a[arguments[c]]=p[arguments[c]]}}}var s=document.getElementsByTagName("pre");for(var c=0;c<s.length;c++){var r=j(s[c]);if(r){q(r,hljs.tabReplace)}}}function o(){var c=arguments;var r=function(){l.apply(null,c)};if(window.addEventListener){window.addEventListener("DOMContentLoaded",r,false);window.addEventListener("load",r,false)}else{if(window.attachEvent){window.attachEvent("onload",r)}else{window.onload=r}}}this.LANGUAGES=p;this.initHighlightingOnLoad=o;this.highlightBlock=q;this.initHighlighting=l;this.IMR="\\b|\\B";this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:["escape"],r:0};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:["escape"],r:0};this.BE={cN:"escape",b:"\\\\.",e:this.IMR,nM:true,r:0};this.CLCM={cN:"comment",b:"//",e:"$",r:0};this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"};this.HCM={cN:"comment",b:"#",e:"$"};this.NUMBER_MODE={cN:"number",b:this.NR,e:this.IMR,r:0};this.CNM={cN:"number",b:this.CNR,e:this.IMR,r:0};this.inherit=function(c,t){var s={};for(var r in c){s[r]=c[r]}if(t){for(var r in t){s[r]=t[r]}}return s}}();var initHighlightingOnLoad=hljs.initHighlightingOnLoad;hljs.LANGUAGES.php={dM:{l:[hljs.IR],c:["comment","number","string","variable","preprocessor"],k:{and:1,include_once:1,list:1,"abstract":1,global:1,"private":1,echo:1,"interface":1,as:1,"static":1,endswitch:1,array:1,"null":1,"if":1,endwhile:1,or:1,"const":1,"for":1,endforeach:1,self:1,"var":1,"while":1,isset:1,"public":1,"protected":1,exit:1,foreach:1,"throw":1,elseif:1,"extends":1,include:1,__FILE__:1,empty:1,require_once:1,"function":1,"do":1,xor:1,"return":1,"implements":1,parent:1,clone:1,use:1,__CLASS__:1,__LINE__:1,"else":1,"break":1,print:1,"eval":1,"new":1,"catch":1,__METHOD__:1,"class":1,"case":1,exception:1,php_user_filter:1,"default":1,die:1,require:1,__FUNCTION__:1,enddeclare:1,"final":1,"try":1,"this":1,"switch":1,"continue":1,endfor:1,endif:1,declare:1,unset:1,"true":1,"false":1,namespace:1}},cI:true,m:[hljs.CLCM,hljs.HCM,{cN:"comment",b:"/\\*",e:"\\*/",c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+",e:hljs.IMR,r:10}]},hljs.CNM,{cN:"string",b:"'",e:"'",c:["escape"],r:0},{cN:"string",b:'"',e:'"',c:["escape"],r:0},hljs.BE,{cN:"variable",b:"\\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*",e:hljs.IMR},{cN:"preprocessor",b:"<\\?php",e:hljs.IMR,r:10},{cN:"preprocessor",b:"\\?>",e:hljs.IMR}]};

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie=function(a,b,c){if(typeof b!='undefined'){c=c||{};if(b===null){b='';c.expires=-1}var d='';if(c.expires&&(typeof c.expires=='number'||c.expires.toUTCString)){var e;if(typeof c.expires=='number'){e=new Date();e.setTime(e.getTime()+(c.expires*24*60*60*1000))}else{e=c.expires}d='; expires='+e.toUTCString()}var f=c.path?'; path='+(c.path):'';var g=c.domain?'; domain='+(c.domain):'';var h=c.secure?'; secure':'';document.cookie=[a,'=',encodeURIComponent(b),d,f,g,h].join('')}else{var j=null;if(document.cookie&&document.cookie!=''){var k=document.cookie.split(';');for(var i=0;i<k.length;i++){var l=jQuery.trim(k[i]);if(l.substring(0,a.length+1)==(a+'=')){j=decodeURIComponent(l.substring(a.length+1));break}}}return j}};

/** Digg */
(function() {
var s = document.createElement('SCRIPT'), s1 = document.getElementsByTagName('SCRIPT')[0];
s.type = 'text/javascript';
s.async = true;
s.src = 'http://widgets.digg.com/buttons.js';
s1.parentNode.insertBefore(s, s1);
})();