
Do(function(){
  var cookieCfg={key:"ap",cookie:"1"},$doubanTip=$("#doubanapp-tip"),data={};function hideDoubanTip(){if(!$doubanTip.length){return}$doubanTip.hide();data[cookieCfg.key]=cookieCfg.cookie;set_cookie(data)}$doubanTip.delegate("a","click",hideDoubanTip);if(!get_cookie(cookieCfg.key)){$doubanTip.show()}var popup;var nav=$("#db-global-nav");var more=nav.find(".bn-more");function handleShowMoreActive(c){var a=$(c.currentTarget);var b=a.parent();hideDoubanTip();if(popup){popup.parent().removeClass("more-active");if($.contains(b[0],popup[0])){popup=null;return}}b.addClass("more-active");popup=b.find(".more-items");popup.trigger("moreitem:show")}nav.delegate(".bn-more, .top-nav-reminder .lnk-remind","click",function(a){a.preventDefault();handleShowMoreActive(a);return}).delegate(".lnk-doubanapp","mouseenter",function(b){var a=$(this);if(!a.parent().hasClass("more-active")){handleShowMoreActive(b)}}).delegate(".top-nav-doubanapp","mouseleave",function(){var b=$(this);var a=b.find(".lnk-doubanapp");if(popup){b.removeClass("more-active");if($.contains(b[0],popup[0])){popup=null}}});$(document).click(function(a){if($(a.target).closest(".more-items").length||$(a.target).closest(".more-active").length){return}if(popup){popup.parent().removeClass("more-active");popup=null}});
});

        (window.DoubanAdSlots = window.DoubanAdSlots || []).push('dale_movie_top_nav_subject');
    
    Do(function() {
      $.getScripts=function(){var b=Array.prototype.slice.call(arguments);if(!b.length){return}(function a(c){if(!c){return}if(typeof c=="function"){c();return}$.ajax({url:c,dataType:"script",cache:true,complete:function(){a(b.shift())}})})(b.shift())};
      $.getScripts(
        'https://img3.doubanio.com/f/shire/45dbd19d76e2601d4b8ac605bf7f1fefc4f34d10/js/lib/jquery.tmpl.min.js',
        'https://img3.doubanio.com/f/movie/a197eee0a397e035a64abc25febc9b88c554f5c4/js/movie/search_sugg.js',
        function() {
         $("#db-nav-movie").find("input[name=search_text]").iSuggest({
             api: '/j/subject_suggest',
             tmplId: 'suggResult',
             item_act: function(item){
                 window.location = item.data("link");
             }
         });
      });
    });
  
Do(function(){
    var nav = $('#db-nav-movie');
    var inp=$("#inp-query"),label=inp.closest(".nav-search").find("label");if("placeholder" in inp[0]){label.hide();inp.attr("placeholder",label.text())}else{if(inp.val()!==""){label.hide()}inp.parent().click(function(){inp.focus();label.hide()}).end().focusin(function(){label.hide()}).focusout(function(){if($.trim(this.value)===""){label.show()}else{label.hide()}}).keydown(function(){label.hide()})}inp.parents("form").submit(function(){if(!$.trim(inp.val()).length){return false}});nav.find(".lnk-more, .lnk-account").click(function(b){b.preventDefault();var d,a=$(this),c=a.hasClass("lnk-more")?$("#db-productions"):$("#db-usr-setting");if(!c.data("init")){d=a.offset();c.css({"margin-left":(d.left-$(window).width()/2-c.width()+a.width()+parseInt(a.css("padding-right"),10))+"px",left:"50%",top:d.top+a.height()+"px"});c.data("init",1);c.hide();$("body").click(function(g){var f=$(g.target);if(f.hasClass("lnk-more")||f.hasClass("lnk-account")||f.closest("#db-usr-setting").length||f.closest("#db-productions").length){return}c.hide()})}if(c.css("display")==="none"){$(".dropdown").hide();c.show()}else{$(".dropdown").hide()}});
});

        (function(b,a){b.fn.fixSide=function(d,k){var h=/ipod|iphone|ipad|android|blackberry|mobile|webos|windows phone/i.test(navigator.userAgent),l="",f="",g="",c="",i="",j="",e="";if(b.browser.ie&&b.browser.version|0<7||h){return}l=b(a).height();f=b("#content .aside");g=f[0];c=g.clientHeight;i=b("#content")[0];j=b("#content .article");e=g.clientHeight>l?true:false;a.addEventListener("load",function(){c=g.clientHeight;i=b("#content")[0];e=g.clientHeight>=l?true:false});b(a).bind("scroll",function(){var n=j.offset().left+(i.clientWidth-g.clientWidth),m=i.getBoundingClientRect().top;if(e){if(m<0&&Math.abs(m)+l-d>c){f.css({position:"fixed",left:n+"px",bottom:d+"px"})}else{if(Math.abs(m)+l-d<c){f.css({position:"static"})}}}else{if(m<0){f.css({position:"fixed",left:n+"px",top:k+"px"})}else{f.css({position:"static"})}}});b(a).bind("resize",function(n){var m=j.offset().left+(i.clientWidth-g.clientWidth);f.css({left:m+"px"})})}})(jQuery,window);;
        $().fixSide(300, 52);
    
$(function(){
    var $actor_list = $('#info .actor a');
    var $actor_attr = $('#info .actor .attrs');

    if ($actor_list.length > 5) {
        $actor_attr.empty();

        $actor_list.each(function(idx){
            if (idx+1 === $actor_list.length) {
                $('<span></span>').prepend($(this)).appendTo($actor_attr);
            } else {
                $('<span> / </span>').prepend($(this)).appendTo($actor_attr);
            }
        });

        $('<a href="javascript:;" class="more-actor" title="更多主演">更多...</a>').on('click', function(){
            $actor_attr.find('span').show();
            $(this).hide();
        }).appendTo($actor_attr);

        $actor_attr.find('span').eq(4).nextAll('span').hide();
    }
})

$(function(){
    $(".episode_list").delegate(".ep_more","click",function(){
        $(".episode_list").find(".hide").css("display","inline-block");
        $(this).hide();
        return false;
    })
})

Do(
  'https://img3.doubanio.com/f/shire/400f95bce457dea9101189cd7f3da8e25100f1a3/js/lib/es5-polyfills.js',
  'https://img3.doubanio.com/f/shire/64374063f61bb2b1e19cde1504d4d4825cef8c35/js/lib/react.min.js',
  function() {
    var EpisodeDiscussion=React.createClass({displayName:"EpisodeDiscussion",getInitialState:function(){return{content:'<p class="mv-dicussion-loading">加载中...'}},getDefaultProps:function(){return{containerCSS:"discussion-list",loadedError:"加载失败..."}},setContent:function(a){this.setState({content:a})},fetch:function(a){this.setState({count:0});a&&this.setProps({id:a});$.ajax({method:"get",dataType:"json",url:this.props.dataSource,data:{ep_id:this.props.id},success:function(b){if(b.r){this.setContent('<div class="discussion-error-loaded">'+this.props.loadedError+"</div>");return}this.setState({count:b.count,content:b.html})}.bind(this),error:function(){this.setContent('<div class="discussion-error-loaded">'+this.props.loadedError+"</div>")}.bind(this)})},onUpdated:function(a){this.state.onUpdated=a},componentDidMount:function(){if(!this.props.id){return}this.fetch()},componentDidUpdate:function(a,b){if(this.state.content!==b.content){this.state.onUpdated&&this.state.onUpdated.call(this)}},render:function(){var a="";if(this.state.episodeNum&&this.state.count){a=React.DOM.a({href:this.state.moreURL,ref:"moreLink"},"> 第"+this.state.episodeNum+"集讨论共"+this.state.count+"条")}return(React.DOM.div(null,React.DOM.div({className:this.props.containerCSS,id:this.props.id,dangerouslySetInnerHTML:{__html:this.state.content}}),a))}});var list=$(".mv-discussion-list");var recentContent=list.html();var hotContent=$(".mv-hot-discussion-list").html();var episode=React.renderComponent(EpisodeDiscussion({dataSource:"/j/discussion/episode_discussions"}),list[0]);episode.setContent(recentContent);var nav=$(".mv-discussion-nav");nav.bind("mousewheel DOMMouseScroll",function(d){var c=d.originalEvent;var a=this.scrollTop;var b=nav[0].scrollHeight-nav.height();if(b==0){return}a+=((c.wheelDelta||-c.detail)<0?1:-1)*1;if(a<=0){nav.scrollTop(0);return false}else{if(a>=b){nav.scrollTop(b);return false}}});nav.delegate("a","click",function(c){c.preventDefault();var d=$(this);var a=d.data("epid");if(a&&a=="more"){d.remove();nav.find(".more-item").removeClass("more-item");return}nav.find(".on").removeClass("on");if(!a||a=="hot"){if(!a){nav.find("a:eq(0)").addClass("on")}else{nav.find("a:eq(1)").addClass("on")}episode.setState({episodeNum:null});var b=!a?recentContent:hotContent;episode.setContent(b);return}episode.setState({moreURL:d.attr("href"),episodeNum:d.data("num")});episode.onUpdated(function(){nav.find("[data-num="+this.state.episodeNum+"]").addClass("on")});episode.fetch(a)});
  }
);

                var if_logined='false';
var subject_id='2393060';
Do.ready("handlebarsjs",function(){var d=$("#comment-tmpl").html();var c=Handlebars.compile(d);var a=Handlebars.compile('&gt; <a href="comments?sort=time">更多短评{{num}}条</a>');if_logined=(if_logined==="true");var b=$("#comments-section");b.delegate(".tab-hd a","click",function(g){g.preventDefault();var f=$(this);b.find(".tab-hd a").removeClass("on").end().find(".tab").hide().end().find("#"+f.data("id")+"-comments").show();f.addClass("on");$.get("/blank?track-"+f.attr("id"));return false}).delegate("#new-comments-tab","click",function(f){$.get("/j/subject/"+subject_id+"/comments",function(g){if(g.retcode===1){var e=g.result;var h=c({comments:g.result.normal,if_logined:if_logined});$("#new-comments #normal").html(h);if(g.result.spammed.length>0){$("#new-comments .fold-bd").append(c({comments:g.result.spammed,if_logined:if_logined}));$("#new-comments .fold-hd").removeClass("hide")}if(g.result.total_num>4){$("#new-comments #total-num").html(a({num:g.result.total_num}))}load_event_monitor($("#new-comments"))}})})});
                $(function(){$("body").delegate(".btn-unfold","click",function(c){c.preventDefault();var b=$(c.target),a=b.parent(".fold-hd");a.slideUp().next().slideDown()})});
            
    $(document).ready(function(){$(".btn-unfold").bind("click",function(c){c.preventDefault();var b=$(c.target),a=b.parent(".fold-hd");a.slideUp().next().slideDown()})});
    Douban.init_unfolder=function(a){$(a).click(function(){var e=a.id.split("-")[1];var b=a.rel.split("-")[1];var c="/j/review/"+e+"/full";function d(){$("#review_"+e+"_short").hide();$("#review_"+e+"_full").show();$("#af-"+e).hide();$("#au-"+e).show()}if($("#review_"+e+"_full_content:empty").length){$.getJSON(c,{show_works:b},function(f){var g=document.createElement("div");g.innerHTML=f.html;$("#review_"+e+"_full_content").append(g);$("#ucount"+e+"u").text(f.votes.usecount);$("#ucount"+e+"l").text(f.votes.totalcount-f.votes.usecount);$("#"+e+"_short_useful").text(f.votes.usecount+"/"+f.votes.totalcount);d()})}else{d()}return false})};Douban.init_folder=function(a){$(a).click(function(){var b=$(a).attr("id").split("-")[1];$("#review_"+b+"_full").hide();$("#review_"+b+"_short").show();$(a).hide();$("#af-"+b).show()})};var warn_secret=function(rid){url="/j/review/"+rid+"/warn_secret";$.post_withck(url,{},function(sjson){var ret=eval("("+sjson+")");if(ret.result){$("#secret_"+rid).html("");$("#warn_ticket_"+rid).html('<span class="m">剧透提醒已经提交，谢谢。</span>')}})};var voteuse_act=function(a,e,d,c){var b="/j/"+d+"/"+e+(a?"/useful":"/useless");$.postJSON_withck(b,{},function(h){if(h.result){if(c){var g=$("#ucount"+e+"u"),f=$("#ucount"+e+"l");if((g.text()==h.usecount)&&(f.text()==h.totalcount-h.usecount)&&(h.result!="notself")){alert("你已经投过票了")}g.html(h.usecount);f.html(h.totalcount-h.usecount);$("#"+e+"_short_useful").text(h.usecount+"/"+h.totalcount)}else{$("#voteuse_"+e).html('<span class="m gtleft">你的投票已经提交，谢谢。</span>');$("#userate_"+e).html('<p id="userate_%s" class="pl">'+h.usecount+"/"+h.totalcount+"的人觉得此评论有用:</p>")}}return false})};

    $(document).ready(function(){$(".btn-unfold").bind("click",function(c){c.preventDefault();var b=$(c.target),a=b.parent(".fold-hd");a.slideUp().next().slideDown()})});

        if (!Do.ready) {
            (function(){var e=document,k=window,c=window.__external_files_loaded=window.__external_files_loaded||{},s=window.__external_files_loading=window.__external_files_loading||{},j=function(u){return u.constructor===Array},h={autoLoad:true,coreLib:["//img3.doubanio.com/js/jquery.min.js"],mods:{}},f=e.getElementsByTagName("script"),d=f[f.length-1],b,g,r=[],m=false,n=[],t=function(w,z,B,v,y){var u=f[0];if(!w){return}if(c[w]){s[w]=false;if(v){v(w,y)}return}if(s[w]){setTimeout(function(){t(w,z,B,v,y)},1);return}s[w]=true;var A,x=z||w.toLowerCase().split(/\./).pop().replace(/[\?#].*/,"");if(x==="js"){A=e.createElement("script");A.setAttribute("type","text/javascript");A.setAttribute("src",w);A.setAttribute("async",true)}else{if(x==="css"){A=e.createElement("link");A.setAttribute("type","text/css");A.setAttribute("rel","stylesheet");A.setAttribute("href",w);c[w]=true}}if(!A){return}if(B){A.charset=B}if(x==="css"){u.parentNode.insertBefore(A,u);if(v){v(w,y)}return}A.onload=A.onreadystatechange=function(){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){c[this.getAttribute("src")]=true;if(v){v(this.getAttribute("src"),y)}A.onload=A.onreadystatechange=null}};u.parentNode.insertBefore(A,u)},q=function(B){if(!B||!j(B)){return}var x=0,A,v=[],z=h.mods,u=[],w={},y=function(F){var E=0,C,D;if(w[F]){return u}w[F]=true;if(z[F].requires){D=z[F].requires;for(;typeof(C=D[E++])!=="undefined";){if(z[C]){y(C);u.push(C)}else{u.push(C)}}return u}return u};for(;typeof(A=B[x++])!=="undefined";){if(z[A]&&z[A].requires&&z[A].requires[0]){u=[];w={};v=v.concat(y(A))}v.push(A)}return v},a=function(){m=true;if(r.length>0){g.apply(this,r);r=[]}},p=function(){if(e.addEventListener){e.removeEventListener("DOMContentLoaded",p,false)}else{if(e.attachEvent){e.detachEvent("onreadystatechange",p)}}a()},o=function(){if(m){return}try{e.documentElement.doScroll("left")}catch(u){return k.setTimeout(o,1)}a()},i=function(){if(e.readyState==="complete"){return k.setTimeout(a,1)}var u=false;if(e.addEventListener){e.addEventListener("DOMContentLoaded",p,false);k.addEventListener("load",a,false)}else{if(e.attachEvent){e.attachEvent("onreadystatechange",p);k.attachEvent("onload",a);try{u=(k.frameElement===null)}catch(v){}if(document.documentElement.doScroll&&u){o()}}}},l=function(u){if(!u||!j(u)){return}this.queue=u;this.current=null};l.prototype={_interval:10,start:function(){var u=this;this.current=this.next();if(!this.current){this.end=true;return}this.run()},run:function(){var w=this,u,v=this.current;if(typeof v==="function"){v();this.start();return}else{if(typeof v==="string"){if(h.mods[v]){u=h.mods[v];t(u.path,u.type,u.charset,function(x){w.start()},w)}else{if(/\.js|\.css/i.test(v)){t(v,"","",function(x,y){y.start()},w)}else{this.start()}}}}},next:function(){return this.queue.shift()}};b=d.getAttribute("data-cfg-autoload");if(typeof b==="string"){h.autoLoad=(b.toLowerCase()==="true")?true:false}b=d.getAttribute("data-cfg-corelib");if(typeof b==="string"){h.coreLib=b.split(",")}g=function(){var v=[].slice.call(arguments),u;if(n.length>0){v=n.concat(v)}if(h.autoLoad){v=h.coreLib.concat(v)}u=new l(q(v));u.start()};g.add=function(v,u){if(!v||!u||!u.path){return}h.mods[v]=u};g.delay=function(){var v=[].slice.call(arguments),u=v.shift();k.setTimeout(function(){g.apply(this,v)},u)};g.global=function(){var u=[].slice.call(arguments);n=n.concat(u)};g.ready=function(){var u=[].slice.call(arguments);if(m){return g.apply(this,u)}r=r.concat(u)};g.css=function(v){var u=e.getElementById("do-inline-css");if(!u){u=e.createElement("style");u.type="text/css";u.id="do-inline-css";e.getElementsByTagName("head")[0].appendChild(u)}if(u.styleSheet){u.styleSheet.cssText=u.styleSheet.cssText+v}else{u.appendChild(e.createTextNode(v))}};if(h.autoLoad){g(h.coreLib)}g.define=g.add;g._config=h;g._mods=h.mods;this.Do=g;i()})();
        }
        Do.ready(
            'https://img3.doubanio.com/f/movie/b2a06a0332fc1526f4caaf8c76c2717d24da408d/js/movie/lib/jsrender.min.js',
            function(){
                $(document).on('click', '.cross span', function(e) {
                    var $this = $(this);
                    var $dialog = $this.parents('#tv-play-source');
                    $dialog.remove();
                });
                $('body').bind('click', function(e) {
                    var $this = $(e.target),
                        $source = $('.play-source');
                    if (!$this.is('.playBtn') && !$this.parents('.play-source').length) {
                        $source.remove();
                    }
                });
                var sources = {};
                sources[1] = [
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Fq00165ign1m.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "1"},
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Fp0016f84v9x.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "2"},
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Fb00165s9xrw.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "3"},
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Ft00168v2v4f.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "4"},
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Fw0016yx04tn.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "5"},
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Fh00166l9h3v.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "6"},
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Fs0016sz847z.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "7"},
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Fo00161oeqic.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "8"},
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Fx0016lczc4c.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "9"},
                            {play_link: "http://www.douban.com/link2/?url=http%3A%2F%2Fv.qq.com%2Fx%2Fpage%2Fc0016uig6h7.html%3Fptag%3Ddouban.tv&amp;subtype=1&amp;type=online-video", ep: "10"},
                ];
                $('.playBtn').click(function(e){
                    $('.play-source').remove();

                    var height, width, tmpl, cn, source;
                    var $dialog = $('#tv-play-source');
                    var $this = $(this);
                    source = $this.data('source');
                    if(!source)return;
                    cn = $this.data('cn');

                    tmpl = $.templates('#episode-tmpl');
                    $dialog = $(tmpl.render({playlist: sources[source], cn: cn}));

                    $dialog.hide();
                    $('body').append($dialog);
                    width = $dialog.outerWidth();

                    $dialog.css({
                        marginLeft: -width / 2,
                        top: $this.offset().top + $this.outerHeight()
                    }).show();
                });
            });
    
        ;/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

        if(Douban&&Douban.init_vote_comment){Douban.init_vote_comment=function(b){var a=$(b).prev().prev(),c=$(b).prev().val();$(b).click(function(){$.postJSON_withck("/j/comment/vote",{id:c},function(d){if(d.r===0&&d.count){a.text(d.count)}else{if(d.r===1){alert(d.msg)}}})})}}$(".a_vote_comment").hover(function(){$(".pop").hide();$(this).next(".pop").show()},function(){$(".pop").hide()});
        $(function(){
            $("#season").live('change', function(){
            var subjectId = $(this).val();
            if (subjectId.length){
                    window.location = "/subject/" + subjectId + "/";
                }
            });

            $(window).hashchange();
            if(window.location.href.indexOf('suggest')>0 && window.location.href.indexOf("?")>0){
                if(window.history.pushState){
                    window.history.pushState(null, document.title,  window.location.href.substring(0,window.location.href.indexOf("?")));
                }
            }

            $('.indent .a_show_full').click(function(){
                $.get('/blank?expand');
            });
        });
    