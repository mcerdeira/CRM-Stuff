var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){var j=void 0,m=!0,n=null,o=!1,aa=encodeURIComponent,p=window,ba=Object,ca=parseInt,r=String,s=document,t="push",v="test",da="exec",ea="width",w="replace",fa="getElementById",x="indexOf",ha="readyState",z="createElement",A="setAttribute",ia="getElementsByTagName",C="length",ja="size",E="location",F="style",ka="call",G="getAttribute",H="href",la="action",I="apply",ma="parentNode",na="height",J="join",K="toLowerCase";var L=p,M=s,oa=L[E],pa=function(){},qa=/\[native code\]/,N=function(a,b,c){return a[b]=a[b]||c},ra=function(a){for(var b=0;b<this[C];b++)if(this[b]===a)return b;return-1},sa=/&/g,ta=/</g,ua=/>/g,va=/"/g,wa=/'/g,xa=function(a){return r(a)[w](sa,"&amp;")[w](ta,"&lt;")[w](ua,"&gt;")[w](va,"&quot;")[w](wa,"&#39;")},O=function(){var a;if((a=ba.create)&&qa[v](a))a=a(n);else{a={};for(var b in a)a[b]=j}return a},R=function(a,b){return ba.prototype.hasOwnProperty[ka](a,b)},S=function(a,b){var a=a||{},c;for(c in a)R(a,
c)&&(b[c]=a[c])},T=N(L,"gapi",{});var ya=function(a,b,c){var e=RegExp("([#].*&|[#])"+b+"=([^&#]*)","g"),b=RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&(e[da](a)||b[da](a)))try{c=decodeURIComponent(a[2])}catch(d){}return c},za=/^([^?#]*)(\?([^#]*))?(\#(.*))?$/,Aa=function(a){var b=[];if(a)for(var c in a)R(a,c)&&a[c]!=n&&b[t](aa(c)+"="+aa(a[c]));return b},Ba=function(a,b,c){var a=a.match(za),e=O();e.o=a[1];e.d=a[3]?[a[3]]:[];e.c=a[5]?[a[5]]:[];e.d[t][I](e.d,Aa(b));e.c[t][I](e.c,Aa(c));return e.o+(0<e.d[C]?"?"+e.d[J]("&"):"")+
(0<e.c[C]?"#"+e.c[J]("&"):"")};var Ca=function(a,b,c){if(L[b+"EventListener"])L[b+"EventListener"]("message",a,o);else if(L[c+"tachEvent"])L[c+"tachEvent"]("onmessage",a)};var U;U=N(L,"___jsl",O());N(U,"I",0);N(U,"hel",10);var Da=function(a){return!U.dpo?ya(a,"jsh",U.h):U.h},Ea=function(a){return N(N(U,"H",O()),a,O())};var Ga=N(U,"perf",O()),Ha=N(Ga,"g",O());N(Ga,"i",O());var Ia=N(Ga,"r",[]);O();O();var V=function(a,b,c){Ha[a]=!b&&Ha[a]||c||(new Date).getTime();"function"===typeof Ia?Ia(a,j,j):Ia[t]([a,j,j])};var Ja=O(),Ka=[],W;W={b:"callback",n:"sync",k:"config",e:"_c",g:"h",j:"platform",i:"jsl",TIMEOUT:"timeout",l:"ontimeout"};Ka[t]([W.i,function(a){for(var b in a)if(R(a,b)){var c=a[b];"object"==typeof c?U[b]=N(U,b,[]).concat(c):N(U,b,c)}if(a=a.u)b=N(U,"us",[]),b[t](a),(c=/^https:(.*)$/[da](a))&&b[t]("http:"+c[1]),N(U,"u",a)}]);var La=decodeURI("%73cript");Ja.m=function(a){var b=U.ms||"https://apis.google.com",a=a[0];if(!a||0<=a[x](".."))throw"Bad hint";return b+"/"+a[w](/^\//,"")};
var Ma=function(a){return a[J](",")[w](/\./g,"_")[w](/-/g,"_")},Na=function(a,b){for(var c=[],e=0;e<a[C];++e){var d=a[e];d&&0>ra[ka](b,d)&&c[t](d)}return c},Oa=/[@"'<>#\?&%]/,Pa=/^https?:\/\/[^\/\?#]+\.google\.com(:\d+)?\/[^\?#]+$/,Qa=/\/cb=/g,Ra=function(a){var b=M[z](La);b[A]("src",a);b.async="true";a=M[ia](La)[0];a[ma].insertBefore(b,a)},Ta=function(a,b){var c=b||{};"function"==typeof b&&(c={},c[W.b]=b);var e=c,d=e&&e[W.e];if(d)for(var f=0;f<Ka[C];f++){var g=Ka[f][0],h=Ka[f][1];h&&R(d,g)&&h(d[g],
a,e)}if(!(e=c[W.g]))if(e=Da(oa[H]),!e)throw"Bad hint";var i=e,q=c[W.b],k=c[W.k],d=c[W.TIMEOUT],u=c[W.l],l=n,B=o;if(d&&!u||!d&&u)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var e=N(Ea(i),"r",[]).sort(),y=N(Ea(i),"L",[]).sort(),ga=function(a){if(B)return 0;L.clearTimeout(l);y[t][I](y,D);var b=((T||{}).config||{}).update;b?b(k):k&&N(U,"cu",[])[t](k);a&&Sa(function(){var b;b=i===Da(oa[H])?N(T,"_",O()):O();b=N(Ea(i),"_",b);a(b)});q&&q();return 1};0<d&&(l=L.setTimeout(function(){B=
m;u()},d));if(a){d=a.split(":").sort();f=[];g=j;for(h=0;h<d[C];h++){var Y=d[h];Y!=g&&f[t](Y);g=Y}d=f}else d=[];var D=Na(d,y);if(!D[C])return ga();var D=Na(d,e),P=N(U,"CP",[]),Q=P[C];P[Q]=function(a){if(!a)return 0;var b=function(){P[Q]=n;return ga(a)};if(Q>0&&P[Q-1])P[Q]=b;else for(b();b=P[++Q];)if(!b())break};if(!D[C])return P[Q](pa);var Fa="loaded_"+U.I++;T[Fa]=function(a){P[Q](a);T[Fa]=n};d=i.split(";");d=(f=Ja[d.shift()])&&f(d);if(!d)throw"Bad hint:"+i;f=d=d[w]("__features__",Ma(D))[w](/\/$/,
"")+(e[C]?"/ed=1/exm="+Ma(e):"")+("/cb=gapi."+Fa);g=f.match(Qa);if(!g||!(1===g[C]&&Pa[v](f)&&!Oa[v](f)))throw"Bad URL "+d;e[t][I](e,D);c[W.n]||L.___gapisync?(c=d,"loading"!=M[ha]?Ra(c):M.write("<"+La+' src="'+encodeURI(c)+'"></'+La+">")):Ra(d)};var Sa=function(a){if(U.hee&&0<U.hel)try{return a()}catch(b){U.hel--,Ta("debug_error",function(){p.___jsl.hefn(b)})}else return a()};T.load=function(a,b){return Sa(function(){return Ta(a,b)})};var Ua=function(){return p.___jsl=p.___jsl||{}},Va=function(a){var b=Ua();b[a]=b[a]||[];return b[a]},X=function(a){var b=Ua();b.cfg=!a&&b.cfg||{};return b.cfg},Wa=function(a){return"object"===typeof a&&/\[native code\]/[v](a[t])},Z=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]&&b[c]&&"object"===typeof a[c]&&"object"===typeof b[c]&&!Wa(a[c])&&!Wa(b[c])?Z(a[c],b[c]):b[c]&&"object"===typeof b[c]?(a[c]=Wa(b[c])?[]:{},Z(a[c],b[c])):a[c]=b[c])},$=function(a){if(!a)return X();for(var a=a.split("/"),
b=X(),c=0,e=a[C];b&&"object"===typeof b&&c<e;++c)b=b[a[c]];return c===a[C]&&b!==j?b:j};var Xa=["left","right"],Ya="inline bubble none only pp vertical-bubble".split(" "),Za=function(a){var b=s[z]("div"),c=s[z]("a");c.href=a;b.appendChild(c);b.innerHTML=b.innerHTML;return b.firstChild[H]},$a=function(){return p[E].origin||p[E].protocol+"//"+p[E].host},ab=function(a,b,c,e){if(a)a=Za(a);else a:{a=e||"canonical";b=s[ia]("link");c=0;for(e=b[C];c<e;c++){var d=b[c],f=d[G]("rel");if(f&&f[K]()==a&&(d=d[G]("href")))if(d=Za(d)){a=d;break a}}a=p[E][H]}return a},bb=function(a,b){if("string"==typeof a){var c;
for(c=0;c<b[C];c++)if(b[c]==a[K]())return a[K]()}},cb=function(a){return bb(a,Xa)},db=function(a){return bb(a,Ya)},eb={tall:{"true":{width:50,height:60},"false":{width:50,height:24}},small:{"false":{width:24,height:15},"true":{width:70,height:15}},medium:{"false":{width:32,height:20},"true":{width:90,height:20}},standard:{"false":{width:38,height:24},"true":{width:106,height:24}}},fb=function(a){return"string"==typeof a?""!=a&&"0"!=a&&"false"!=a[K]():!!a},gb=function(a){var b=ca(a,10);if(b==a)return r(b)},
hb=function(a){if(fb(a))return"true"},ib=function(a){return"string"==typeof a&&eb[a[K]()]?a[K]():"standard"},jb={href:[ab,"url"],width:[gb],size:[ib],resize:[hb],autosize:[hb],count:[function(a,b){return"tall"==ib(b[ja])?"true":b.count==n||fb(b.count)?"true":"false"}],db:[function(a,b,c){a==n&&c&&(a=c.db,a==n&&(a=c.gwidget&&c.gwidget.db));return fb(a)?1:j}],ecp:[function(a,b,c){a==n&&c&&(a=c.ecp,a==n&&(a=c.gwidget&&c.gwidget.ecp));if(fb(a))return"true"}],textcolor:[function(a){if("string"==typeof a&&
a.match(/^[0-9A-F]{6}$/i))return a}],drm:[hb],recommendations:[],fu:[],ad:[hb],cr:[gb],ag:[gb],"fr-ai":[],"fr-sigh":[]};var kb={badge:{width:300,height:131},smallbadge:{width:300,height:69}},lb=function(a){return"string"==typeof a&&kb[a[K]()]?a[K]():"badge"};var mb={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},nb=0;var ob=/:([a-zA-Z_]+):/g,pb={style:"position:absolute;top:-10000px;width:300px;margin:0px;borderStyle:none"},qb="onPlusOne _ready _close,_open _resizeMe _renderstart oncircled".split(" "),rb={},sb=n,tb=N(U,"WI",O()),ub=function(){var a=$("googleapis.config/sessionIndex");a==n&&(a=p.__X_GOOG_AUTHUSER);if(a==n){var b=p.google;b&&(a=b.authuser)}a==n&&(a=j,a==n&&(a=p[E][H]),a=a?ya(a,"authuser")||n:n);return a==n?n:r(a)},vb=function(a,b){if(!sb){var c=$("iframes/:socialhost:"),e=ub()||"0",d=ub();sb={socialhost:c,
session_index:e,session_prefix:d!==j&&d!==n&&""!==d?"u/"+d+"/":""}}return sb[b]||""},wb=function(a,b){var c={};S(b,c);if("additnow"!==a&&(c.hl=$("lang")||"en-US",c.origin=$a(),"plus"===a)){var e;e=ab(c[H],0,0,b[la]?n:"publisher");c.url=e;delete c[H];c.size=lb(b[ja]);e=b[ea];c.width=!e?b[la]?j:kb[lb(b[ja])][ea]:ca(e,10);e=b[na];c.height=!e?b[la]?j:kb[lb(b[ja])][na]:ca(e,10)}return c},zb=function(a,b,c,e){if(!b[ma])return n;if(!e){for(var e=O(),d=0!=b.nodeName[K]()[x]("g:"),f=0,g=b.attributes[C];f<
g;f++){var h=b.attributes[f],i=h.name,h=h.value;0<=ra[ka](xb,i)||(d&&0!=i[x]("data-")||"null"===h)||(d&&(i=i.substr(5)),e[i[K]()]=h)}d=b[F];(f=yb(d&&d[na]))&&(e.height=r(f));(d=yb(d&&d[ea]))&&(e.width=r(d))}d=a;"plus"==a&&e[la]&&(d=a+"_"+e[la]);(d=$("iframes/"+d+"/url"))||(d=":socialhost:/_/widget/render/"+a);d=d[w](ob,vb);f=((rb[a]||[])[0]||wb)(a,e);f.hl=$("lang")||"en-US";U.ILI&&(f.iloader="1");delete f["data-onload"];delete f.rd;g=$("inline/css");"undefined"!==typeof g&&g>=c&&(f.ic="1");c=f;"additnow"===
a&&(c.parenturl=oa[H],R(c,"applicationid")&&(c.appid=c.applicationid,delete c.applicationid),c.style=c[F]||b[G]("style"));var q,f=c,g=/^#|^fr-/,i={};for(q in f)R(f,q)&&g[v](q)&&(i[q[w](g,"")]=f[q],delete f[q]);q=i;"additnow"===a&&(q.action="render");f=q;g=c;i=[].concat(qb);h=$("iframes/"+a+"/methods");"object"===typeof h&&qa[v](h[t])&&(i=i.concat(h));for(var k in e)if(R(e,k)&&/^on/[v](k)&&("plus"!=a||"onconnect"!=k))i[t](k),delete g[k];f._methods=i[J](",");d=Ba(d,c,q);e.rd?k=b:(k=s[z]("div"),b[A]("data-gapistub",
m),k[F].cssText="position:absolute;width:100px;left:-10000px;",b[ma].insertBefore(k,b));k.id||(b=k,N(tb,a,0),q="___"+a+"_"+tb[a]++,b.id=q);b=O();b[">type"]=a;S(e,b);k[A]("data-gwattr",Aa(b)[J](":"));var u;q=d;a=k;b={attributes:pb};k=a.ownerDocument;f=0;do c=b.id||["I",nb++,"_",(new Date).getTime()][J]("");while(k[fa](c)&&5>++f);if(!(5>f))throw Error("Error creating iframe id");g=k[E][H];f=O();(i=ya(g,"_bsh",U.bsh))&&(f._bsh=i);(g=Da(g))&&(f.jsh=g);var l,g=O();g.id=c;g.parent=k[E].protocol+"//"+k[E].host;
b.hintInFragment?S(f,g):l=f;q=Ba(q,l,g);l=O();S(mb,l);l.name=l.id=c;S(b.attributes,l);l.src=q;try{u=k[z]('<iframe frameborder="'+xa(l.frameborder)+'" scrolling="'+xa(l.scrolling)+'" name="'+xa(l.name)+'"/>')}catch(B){u=k[z]("iframe")}for(var y in l)b=l[y],"style"==y&&"object"===typeof b?S(b,u[F]):u[A](y,l[y]);a.innerHTML="";a.appendChild(u);l.allowtransparency&&(u.allowTransparency=m);y={};y.userParams=e;y.url=d;y.iframeNode=u;y.id=u[G]("id");return y},xb=["style","data-gapiscan"],yb=function(a){var b=
j;"number"===typeof a?b=a:"string"===typeof a&&(b=ca(a,10));return b},Ab=function(){};rb.plusone=[function(a,b){var c={};S(jb,c);c.source=[n,"source"];c.expandTo=[n,"expandTo"];c.align=[cb];c.annotation=[db];c.origin=[$a];var e={},d=$(),f;for(f in c)c.hasOwnProperty(f)&&(e[c[f][1]||f]=(c[f]&&c[f][0]||function(a){return a})(b[f[K]()],b,d));return e}];var Bb,Cb=/(?:^|\s)g-((\S)*)(?:$|\s)/,Db=O(),Eb=N(U,"FW",[]),Gb=function(a,b){Fb(j,o,a,b)},Fb=function(a,b,c,e){V("ps0",m);var c=("string"===typeof c?s[fa](c):c)||M,d,f=M.documentMode;if(c.querySelectorAll&&(!f||8<f)){if(e)d=[e];else if(qa[v](ba.keys))d=ba.keys(Db);else{f=[];for(d in Db)R(Db,d)&&f[t](d);d=f}for(var f=[],g=0;g<d[C];g++){var h=d[g];f[t](".g-"+h,"g\\:"+h)}d=c.querySelectorAll(f[J](","))}else d=c[ia]("*");c=O();for(f=0;f<d[C];f++){g=d[f];var i=g,h=e,q=i.nodeName[K](),k=j;i[G]("data-gapiscan")?
h=n:(0==q[x]("g:")?k=q.substr(2):(i=(i=r(i.className||i[G]("class")))&&Cb[da](i))&&(k=i[1]),h=k&&Db[k]&&(!h||k===h)?k:n);h&&(g[A]("data-gapiscan",m),N(c,h,[])[t](g))}if(b)for(var u in c){b=c[u];for(e=0;e<b[C];e++)b[e][A]("data-onload",m)}for(var l in c)Eb[t](l);V("ps1",m);u=Eb[J](":");T.load(u,a);a=Bb||{};l=[W.e,W.i,W.g];for(b=0;b<l[C]&&a;b++)a=a[l[b]];l=Da(oa[H]);if(!a||0!=a[x]("n;")&&0!=l[x]("n;")&&a!==l)for(var B in c)Hb(B);else{a=[];for(B in c){l=c[B];b=0;for(e=l[C];b<e;b++)if(d=zb(B,l[b],e))(f=
d.id)&&a[t](f),Hb(B,d)}Ib(u,a)}},Jb=function(a){var b=N(T,a,{});b.go||(b.go=function(b){return Gb(b,a)},b.render=function(b,e,d){var f=e||{};f.type=a;e=f.type;delete f.type;if(!e||!Db[e])throw Error("Unsupported widget "+e||"");if((b=("string"===typeof b?s[fa](b):b)||j)&&1===b.nodeType)f.rd=1,b=zb(e,b,2,f),Hb(e,b,d),(d=b.id)&&Ib(e,[d])})};
Ka[t]([W.j,function(a,b,c){Bb=c;b&&Eb[t](b);for(b=0;b<a[C];b++)Db[a[b]]=1;for(b=0;b<a[C];b++)Jb(a[b]);if(b=p.__GOOGLEAPIS)b.googleapis&&!b["googleapis.config"]&&(b["googleapis.config"]=b.googleapis),N(U,"ci",[])[t](b),p.__GOOGLEAPIS=j;X(m);var e=p.___gcfg,b=Va("cu");if(e&&e!==p.___gu){var d={};Z(d,e);b[t](d);p.___gu=e}var e=Va("cu"),f=s.scripts||s[ia]("script")||[],d=[],g=[],h=Ua().u;h&&g[t](h);Ua().us&&g[t][I](g,Ua().us);for(h=0;h<f[C];++h)for(var i=f[h],q=0;q<g[C];++q)i.src&&0==i.src[x](g[q])&&
d[t](i);0==d[C]&&f[f[C]-1].src&&d[t](f[f[C]-1]);for(f=0;f<d[C];++f)if(!d[f][G]("gapi_processed")){d[f][A]("gapi_processed",m);(g=d[f])?(h=g.nodeType,g=3==h||4==h?g.nodeValue:g.textContent||g.innerText||g.innerHTML||""):g=j;if(g){for(;0==g.charCodeAt(g[C]-1);)g=g.substring(0,g[C]-1);h=j;try{h=(new Function("return ("+g+"\n)"))()}catch(k){}if("object"===typeof h)g=h;else{try{h=(new Function("return ({"+g+"\n})"))()}catch(u){}g="object"===typeof h?h:{}}}else g=j;g&&e[t](g)}f=Va("cd");e=0;for(d=f[C];e<
d;++e)Z(X(),f[e]);f=Va("ci");e=0;for(d=f[C];e<d;++e)Z(X(),f[e]);e=0;for(d=b[C];e<d;++e)Z(X(),b[e]);if("explicit"!=$("parsetags")){b=N(U,"sws",[]);b[t][I](b,a);var l;if(c){var B=c[W.b];B&&(l=function(){L.setTimeout(B,0)},delete c[W.b])}if("complete"!==M[ha])try{Fb(j,m)}catch(y){}var ga=function(){Fb(l,m)};if("complete"===M[ha])ga();else{var Y=o,D=function(){if(!Y)return Y=m,ga[I](this,arguments)};L.addEventListener?(L.addEventListener("load",D,o),L.addEventListener("DOMContentLoaded",D,o)):L.attachEvent&&
(L.attachEvent("onreadystatechange",function(){"complete"===M[ha]&&D[I](this,arguments)}),L.attachEvent("onload",D))}}}]);var Hb=function(a,b,c){T.load(a,function(){var e=N(U,"watt",O())[a],d=b&&b.iframeNode;!d||!e?((0,T[a].go)(d&&d[ma]),c&&c()):e(b)})};N(T,W.j,{}).go=Gb;var Kb=/^\{h\:'/,Lb=/^!_/,Ib=function(a,b){function c(){Ca(e,"remove","de")}function e(e){var g=e.data,h=e.origin;if(Mb(g,b)){var i=d;d=o;i&&V("rqe");Ta(a,function(){i&&V("rqd");c();for(var a=N(U,"RPMQ",[]),b=0;b<a[C];b++)a[b]({data:g,origin:h})})}}if(!(0===b[C]||!p.JSON||!p.JSON.parse)){var d=m;Ca(e,"add","at");Ta(a,c)}},Mb=function(a,b){a=r(a);if(Kb[v](a))return m;a=a[w](Lb,"");if(!/^\{/[v](a))return o;try{var c=p.JSON.parse(a)}catch(e){return o}if(!c)return o;var d=c.f;return c.s&&d&&-1!=ra[ka](b,
d)?("_renderstart"===c.s&&(c=c.a&&c.a[1],d=M[fa](d),c&&d&&Ab(d[ma],d,c)),m):o};Ab=function(a,b,c){if(c[ea]&&c[na]){a[F].cssText="";var e=c[ea],c=c[na],d=a[F];d.textIndent="0";d.margin="0";d.padding="0";d.background="transparent";d.borderStyle="none";d.cssFloat="none";d.styleFloat="none";d.lineHeight="normal";d.fontSize="1px";d.verticalAlign="baseline";a[F].display="inline-block";a=b[F];a.position="static";a.left=0;a.top=0;a.visibility="visible";e&&(a.width=e+"px");c&&(a.height=c+"px");b["data-csi-wdt"]=(new Date).getTime()}};V("bs0",m,p.gapi._bs);V("bs1",m);delete p.gapi._bs;})();
gapi.load("plusone",{callback:window["gapi_onload"],_c:{"platform":["plusone","plus","additnow","card"],"jsl":{"u":"https://apis.google.com/js/plusone.js","dpo":false,"hee":false,"ci":{"services":{},"inline":{"css":0},"lexps":[34,69,71,65,36,76,40,73,15,45,17,51,61,60,30],"oauth-flow":{},"report":{},"iframes":{"additnow":{"url":"https://apis.google.com/additnow/additnow.html?bsv=pr"},"plus":{"methods":["onauth"],"url":":socialhost:/u/:session_index:/_/pages/badge?bsv=pr"},":socialhost:":"https://plusone.google.com","plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/plus/circle?bsv=pr"},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?bsv=pr"},":signuphost:":"https://plus.google.com","plusone":{"preloadUrl":["https://ssl.gstatic.com/s2/oz/images/stars/po/Publisher/sprite4-a67f741843ffc4220554c34bd01bb0bb.png"],"params":{"count":"","url":"","size":""},"url":":socialhost:/:session_prefix:_/+1/fastbutton?bsv=pr"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&bsv=pr"}},"isPlusUser":false,"debug":{"host":"https://plusone.google.com","reportExceptionRate":0,"rethrowException":false},"csi":{"rate":0},"googleapis.config":{"mobilesignupurl":"https://m.google.com/app/plus/oob?"}},"h":"m;/_/apps-static/_/js/gapi/__features__/rt=j/ver=afdu7sxC3Hs.es./sv=1/am=!IgG4Alpx-R-AmixyXQ/d=1/rs=AItRSTPyCShQb4FTnQYOl-d3tWt3TZJgXA","fp":"51cbefcc5e67c7c42f4ac340bad14f18898d23d2"},"fp":"51cbefcc5e67c7c42f4ac340bad14f18898d23d2"}});