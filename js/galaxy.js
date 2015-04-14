! function($) {
	$.fn.galaxy = function(opt){
		this.init();
		this.option = $.extend(this.defOptions,opt);
	};
	$.fn.galaxy.prototype = {
		init: function() {
			this.linkInit();
			this.ptrInit();
			this.tapInit();
			this.formInit();
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
			$('body').on('click','[data-href]', function(e) {
				self.initLink(e);
			})
		},
		linkOff: function() {
			$('[data-href]').off('click');
		},
		defOptions:{
			ptr:false,

		},
	}
	window.Galaxy = $.fn.galaxy||{};
	window.datas = {
		"pageWidth": document.documentElement.clientWidth,
		"pageHeight": document.documentElement.clientHeight
	}
}(window.Zepto)
$(document).ready(function() {
	FastClick.attach(document.body);
});
console.log("hello");;
! function($) {
	$.fn.galaxy.prototype.formInit = function() {
		var select = $(".ui-form-select")
		if (select.length == 0) {
			return false;
		};
		wrapSelect(select);
		initSelect(select)
		var tSelect = $(".ui-select-wrap");
		var value = select.val();
	}

	function wrapSelect(select) {
		select.wrap("<div class=ui-select-wrap></div>");
		var text = "<div class='ui-select-value'></div><div class='ui-select-arr'></div>"
		$(select).before(text);
	}

	function initSelect(select) {
		$(".ui-select-wrap").each(function(index) {
			$(this).find(".ui-select-value").text(selecText($(this)));
		});
		select.on("change",function(){
			var el = $(this);
			el.parent().find(".ui-select-value").text(selecText(el));
		})
	}
	function selecText($el){
		return $el.find("option").not(function(){ return !this.selected }).text();
	}
}(window.Zepto);
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
		var tep = '<li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li><li data-href="123.html">1</li>'
		var el = $(".ui-list-scroll");
		$(window).on("scroll",function(){
			var sData = $.fn.galaxy.getScroll();
			if (sData.scrollB < 100) {
				el.trigger("scrollBottom");
			}else if(sData.scrollT < 100){
				el.trigger("scrolltop");
			};
		})
	}
	function reinitLink(){
		$.fn.galaxy.linkOff();
		$.fn.galaxy.linkInit();
	}
	$.fn.galaxy.prototype.getScroll = function (){
		var dh = $(".ui-list-link").height()-window.datas.pageHeight
		var scroll = $("body").scrollTop();
		var s = dh-scroll;
		return {
			scrollB : s,
			scrollT : scroll
		}
		// console.log(dh,scroll,s,sh)
	}
	$(document).ready(function() {
		init();
	})
}(window.Zepto);
! function($) {
	var animate = {
		aIn:'ani-pop-sta',
		aInOut:'ani-pop-rem',
		aInClick:'ani-pop-sta',
		aInFull:'ani-pop-full',
	}
	// opt = {
	// 	type:'', // el,loading,fullScreen,alert
	//  value:'', //string
	// 	animate:'', //animate配置
	//  click:Boolean, // animate == aIn,defalut true
	// 	el:$(select), //插入的元素 type == el,loading,allScreen,alert
	//  flexDirection: column,
	// 	button:Boolean, //当type == alert 且为 true 
	// 	buttonValue:{a:foo()},//当type == alert 且为 true 
	// }
	$.fn.galaxy.prototype.pop = function(opt) {
		if (typeof opt == "string" || typeof opt == "number") {
			render(opt,'','aInOut');
		}else if(typeof opt == "object"){
			init(opt)
		};
	}
	$.fn.galaxy.prototype.removePop = function(){
		$('.ui-pop').remove();
	}
	function init(opt){
		addHandle();
		var value = opt.value,
			type = opt.type,
			animate = opt.animate,
			el = opt.el,
			flexDirection = opt.flexDirection
		if (type) {
			render(value,type,animate,el,flexDirection)
		}else if(el){
			render(value,'el',animate,el,flexDirection)
		};
	}
	function addHandle(){
		$('body').on('touchmove','.ui-pop',function(e){
			e.preventDefault();
		})
	}
	function render(value,type,ani,el,state){
		switch(type)
		{
		case 'el':
		  renderDef(value,ani,el,state)
		  break;
		case 'loading':

		  break;
		case 'fullScreen':
		  renderDef(value,ani,el,state,true)
		  break;
		case 'alert':

		  break;
		default:
		  renderDef(value,ani);
		}
	}
	function renderDef(value,ani,el,state,fullscreen){
		var tAni = animate[ani];
		var warp = initWrap(tAni,state,fullscreen);
		if (!el) {
			tmp = $('<div class="ui-pop-str">'+value+'</div>');
		}else{
			if (value) {
				var val = $('<div class="ui-pop-str">'+value+'</div>');
				var tmp = $(el).concat(val);
			}else{
				var tmp = $(el);
			};
		};
		var popEl = warp.append(tmp);
		popEl.appendTo('body');
		if (ani == 'aInOut') {
			setTimeout(function(){
				$('.ui-pop').remove();
			},1200)
		};
	}
	function initWrap(tAni,state,fullscreen){
		var direction = state == 'row' ? '' : 'flex-direction-col';
		var isFullScreen = fullscreen ? 'ui-pop-screen' : 'ui-pop-def';
		var tmp = $('<div class="ui-pop ui-center '+tAni+' '+ direction +' '+ isFullScreen +'"></div>');
		return tmp
	}
}(window.Zepto);
! function($) {
	$.fn.galaxy.prototype.ptrInit = function() {
		var ptr = $(".ui-ptr");
		if (ptr.length == 0) {
			return false
		};
		for (var n = 0; n < ptr.length; n++) {
			var cList = $(ptr[n]);
			var list = cList.children(".ui-item-ptr");
			var row = cList.data().row;
			var wrap = Math.ceil(list.length / row);
			var stuff = "<div class='ui-item-ptr'></div>";
			wrapList(wrap, list, row, stuff, cList);
		};

	}

	function wrapList(wrap, list, row, stuff, cList) {
			for (var i = wrap; i > 0; i--) {
				var tep = list.splice(0, row);
				if (i == 1) {
					for (var m = 0; m < row - tep.length; m++) {
						$(stuff).appendTo(cList);
					};
					tep = cList.children(".ui-item-ptr");
					$(tep).wrapAll("<div class=ui-flex-ptr>");
				} else {
					$(tep).wrapAll("<div class=ui-flex-ptr>")
				};
			};
		}
		// $(document).ready(function() {
		// 	$.fn.galaxy.ptrInit()
		// })
}(window.Zepto);
! function($) {
	var header,contain;
	$.fn.galaxy.prototype.tapInit = function () {
		header = $(".ui-tap .ui-tap-header .ui-item-header");
		contain = $(".ui-tap .ui-tap-contain .ui-item-contain");
		if (header.length == 0) {
			return false
		};
		header.on("click",function(){
			var index = $(this).index();
			removeAll();
			$(this).addClass("active");
			$(contain[index]).show();
		});
		init();
	}
	function removeAll () {
		header.removeClass("active");
		contain.hide();
	}
	function init () {
		if(!header.hasClass("active")){
			$(header[0]).trigger("click")
		}
	}
}(window.Zepto)