$(".ajax-all .j-ajax.link").mouseenter(function(){
	$(this).css("color","rgb(255,68,0)").css("border","1px solid rgb(233,233,233)");
}).mouseleave(function(){
	$(this).hasClass("addclass")?$(this).css("color","").siblings().css("border","1px solid transparent"):$(this).css("color","").css("border","1px solid transparent");
}).click(function(){
	$(this).css("color","").addClass("addclass").siblings().removeClass("addclass");
})
$(".address a").mouseenter(function(){
	$(this).css("color","rgb(255,68,0)").css("text-decoration","underline");
}).mouseleave(function(){
	$(this).css("color","").css("text-decoration","");
}).click(function(){
	var $nowplace = $(this).html();
	$(".left .place .text .nowplace").html($nowplace);
	$(".left .place .address .seacher").attr("value",$nowplace);
	$(".left .place .address .cancel").css("display","block");
});
$(".left .place .address .cancel").click(function(){
	$(".left .place .text .nowplace").html("所在地");
	$(".left .place .address .cancel").css("display","none");
	$(".left .place .address .seacher").attr("value","");
})










