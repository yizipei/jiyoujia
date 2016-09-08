$.ajax({
	url : "http://www.ikindness.cn/api/test/getProduct"
}).done(function(data){
	var _data = data.data,
		intarr = new Array(),
		moneylarge = new Array(),
		moneyless = new Array(),
		selllarge = new Array(),
		sellless = new Array(),
		temp = new Array(),
		product,
		n = 0,
		pre = 1,
		next,
		global = _data;//作为控制全局的数据变量
	//取data中的价格
	for(var i=0;i<_data.length;i++){
		moneyless[i] = moneylarge[i] = _data[i];
	};
	//取data中的销量
	for(var i=0;i<_data.length;i++){
		selllarge[i] = sellless[i] = _data[i];
	};
	//初始化全局变量
	for(var i=0;i<_data.length;i++){
		intarr[i] = _data[i];
	};
	var createDom = function(pre,object){
		next = object.length<10?1:object.length/10;
		next = Math.ceil(next);
		var leng;
		if(object.length-pre*10>0){
			leng = 10;
		}else{
			leng = object.length-(pre-1)*10;
		}
		for(var i=(pre-1)*10;i<leng+(pre-1)*10;i++){
			product = [];
			product.push(
				"<div class=\"itemMouse\">"
				+"<div class=\"img\">"
				+ "<a><img src=\"img/QQ20160721092401.png\" class=\"report\"></a>"
				+ "<a href=\"http:"+ object[i].href + "\"><img src=\"http:" + object[i].image + "\" class=\"itemImg\"></a>"
				+ "<div class=\"slide\">"
				+ "<a><span class=\"similar\">找相似</span></a>" 
				+ "<a><span class=\"same\">找同款</span></a>" 
				+ "</div>"
				+ "</div>"
				+ "<div class=\"bottom\">"
				+ "<div class=\"price\">"
				+ "<span class=\"rmb\">￥</span><span class=\"money\">" + object[i].price + "</span>"
				+ "<img src=\"img/QQ20160721092122.png\">"
				+ "<span class=\"sold\">销售量:" + object[i].sold + "</span>"
				+ "</div>"
				+ "<div class=\"text\">"
				+ "<a class=\"intro\">" + object[i].name + "</a>"
				+ "</div>"
				+ "<div class=\"detail\">"
				+ "<a>"
				+ "<img src=\"img/QQ20160721092305.png\" class=\"detailImg\"><span class=\"shopper\">" + object[i].owner + "</span>"
				+ "</a>"
				+ "<span class=\"shopad\">" + object[i].location + "</span>"
				+ "</div>"
				+ "<div class=\"permission\">"
				+ "<ul>"
				+ "<li><a><img src=\"img/QQ20160721092240.png\" class=\"gold\"></a></li>"
				+ "<li><a><img src=\"img/QQ20160721092223.png\" class=\"serve\"></a></li>"
				+ "<li><a><img src=\"img/QQ20160721092147.png\" class=\"ensure\"></a></li>"
				+ "</ul>"
				+ "</div>"
				+ "</div>" 
				+ "</div>"
			);
			$(".main").append(product.join(" "));
		};
		$(".leftban .item .current").html(pre);
		$(".leftban .item .liitem").html(next);
	}
	createDom(pre,global);
	//升序排列（从小到大）
	var monlarge = function(object){
		for(var i=0;i<object.length;i++){
			for(var j=0;j<object.length-1;j++){
				x=object[j].price;
				y=object[j+1].price;
				x = parseInt(x);
				y = parseInt(y);
				if(x >= y){
					var temp = object[j];
					object[j] = object[j+1];
					object[j+1] = temp;
				};
			};
		};
	};
	var sellarge = function(object){
		for(var i=0;i<object.length;i++){
			for(var j=0;j<object.length-1;j++){
				x=object[j].sold;
				y=object[j+1].sold;
				x = parseInt(x);
				y = parseInt(y);
				if(x >= y){
					var temp = object[j];
					object[j] = object[j+1];
					object[j+1] = temp;
				};
			};
		};
	};
	monlarge(moneylarge);
	sellarge(selllarge);
	//降序排列（从大到小）
	var monless = function(object){
		for(var i=0;i<object.length;i++){
			for(var j=0;j<object.length-1;j++){
				x=object[j].price;
				y=object[j+1].price;
				x = parseInt(x);
				y = parseInt(y);
				if(x <= y){
					var temp = object[j];
					object[j] = object[j+1];
					object[j+1] = temp;
				};
			};
		};
	};
	var selless = function(object){
		for(var i=0;i<object.length;i++){
			for(var j=0;j<object.length-1;j++){
				x=object[j].sold;
				y=object[j+1].sold;
				x = parseInt(x);
				y = parseInt(y);
				if(x <= y){
					var temp = object[j];
					object[j] = object[j+1];
					object[j+1] = temp;
				};
			};
		};
	};
	monless(moneyless);
	selless(sellless);
	//价格升序
	$(".ajax-all .j-ajax.link.one").click(function(){
		pre = 1;
		if (temp.length) {
			monlarge(temp);
			global = temp;
		}else{
			global = moneylarge;
		};
		$(".main").html(" ");
		createDom(pre,global);
	});
	//价格降序
	$(".ajax-all .j-ajax.link.two").click(function(){
		pre = 1;
		if (temp.length) {
			monless(temp);
			global = temp;
		}else{
			global = moneyless;
		};
		$(".main").html(" ");
		createDom(pre,global);
	});
	//交易量升序
	$(".ajax-all .j-ajax.link.three").click(function(){
		pre = 1;
		if (temp.length) {
			sellarge(temp);
			global = temp;
		}else{
			global = selllarge;
		};
		$(".main").html(" ");
		createDom(pre,global);
	});
	//交易量降序
	$(".ajax-all .j-ajax.link.four").click(function(){
		pre = 1;
		if (temp.length) {
			selless(temp);
			global = temp;
		}else{
			global = sellless;
		};
		$(".main").html(" ");
		createDom(pre,global);
	});
	//后退一格
	$(".leftban .item .icon.pre").click(function(){
		pre = pre==1?pre:--pre;
		$(".main").html(" ");
		createDom(pre,global);
	});
	//前进一格
	$(".leftban .item .icon.next").click(function(){
		pre = pre==next?pre:++pre;
		$(".main").html(" ");
		createDom(pre,global);
	});
	//价格区间筛选
	var compare = function(object,param1,param2){
		n = 0;
		temp = new Array;
		for(var i=0;i<object.length;i++){
			var z = object[i].price;
			z = parseInt(z);
			if(z >= param1&&z <= param2){
				temp[n] = object[i];
				++n;
			};
		};
	}
	$(".input .inner .sure").click(function(){
		pre = 1;
		var $low = $(".input .inner .sortinput.low").val();
		var $high = $(".input .inner .sortinput.high").val();
		$low = parseInt($low);
		$high = parseInt($high);
		if($(".j-ajax.link.one").hasClass("addclass")){
			global = moneylarge;
		}else if($(".j-ajax.link.two").hasClass("addclass")){
			global = moneyless;
		}else if($(".j-ajax.link.three").hasClass("addclass")){
			global = selllarge;
		}else if($(".j-ajax.link.four").hasClass("addclass")){
			global = selllarge;
		}else{
			global = intarr;
		}
		if($low<$high){
			compare(global,$low,$high);
			global = temp;
			$(".main").html(" ");
			createDom(pre,temp);
		}else if($low>$high){
			var tempt = $low;
			$low = $high;
			$high = tempt;
			compare(global,$low,$high);
			global = temp;
			$(".main").html(" ");
			createDom(pre,temp);
		}else{
			console.log("傻逼吧，别瞎JB按");
		};
	});
});