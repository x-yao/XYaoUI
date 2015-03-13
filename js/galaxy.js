! function($) {
	$.fn.galaxy = {
			init: function() {

			},
			//初始化连接方法
			initLink: function(e) {
				var el = e.currentTarget;
				var datas = $(el).data();
				if (datas.href) {
					location.href = datas.href;
				};
			},
			linkInit: function() {
				var self = this;
				$('[data-href]').on('click', function(e) {
					self.initLink(e);
				})
			},
			linkOff:function(){
				$('[data-href]').off('click');				
			}
		}
		window.datas = {
			"pageWidth": document.documentElement.clientWidth,
			"pageHeight": document.documentElement.clientHeight,
			"isSafari": (/Safari/).test(navigator.userAgent)
		}
	$(document).ready(function() {
		FastClick.attach(document.body);
		$.fn.galaxy.linkInit()
	})
}(window.Zepto);
console.log("hello");;
!function($) {
	function init(){
		initLinkAct();
		initScroll()
	}
	function initLinkAct(){
		$(".ui-list-link").on("touchstart","li",function(e){
			var el = e.currentTarget;
			var list = $(this);
			var act = setTimeout(function(){
				$(el).addClass("ui-list-active");
			},50);
			list.on("touchmove.active",function(){
				clearTimeout(act);
				$(el).removeClass("ui-list-active");
			})
			list.on("touchend.active",function(){
				clearTimeout(act);
				$(el).removeClass("ui-list-active");
				list.off("touchmove.active touchend.active")
			})
		})
	}
	function initScroll(){
		var loading = false;
		var sh = window.datas.pageHeight;
		var tep = '<li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li>'
		// $(".ui-list-link").on("touchmove.scroll",function(){
		// 	var dh = $(".ui-list-link").height()-sh
		// 	var scroll = $("body").scrollTop();
		// 	var s = dh-scroll;
		// 	// var list = $(this);
		// 	// if (s<50&&(!loading)) {
		// 	// 	loading = true;
		// 	// 	setTimeout(function(){
		// 	// 		list.append(tep);
		// 	// 		loading = false;
		// 	// 		reinitLink();
		// 	// 	},500)
		// 	// }else if(s > (dh-50)&&(!loading)){
		// 	// 	loading = true;
		// 	// 	setTimeout(function(){
		// 	// 		list.prepend(tep);
		// 	// 		loading = false;
		// 	// 		reinitLink();
		// 	// 	},500)
		// 	// };
		// 	console.log(s,dh,scroll);
		// })

		$(window).on("scroll",function(){
			var sh2 = document.documentElement.clientHeight
			var dh = $(".ui-list-link").height()-sh
			var scroll = $("body").scrollTop();
			var s = dh-scroll;
			console.log(dh,scroll,s,sh,sh2)
		})
	}
	function reinitLink(){
		$.fn.galaxy.linkOff();
		$.fn.galaxy.linkInit();
	}
	$(document).ready(function() {
		init();
	})
}(window.Zepto)