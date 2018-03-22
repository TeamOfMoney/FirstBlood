var querDetialUrl = "../product/findById.action";

/*-------------------------页面加載------------------------------*/
var loadsoftDetInfo = function(data) {
	util.emmAjax({
		url : querDetialUrl,
		type : 'post',
		data : {
			'productNum' : data
		},
		cache : false,
		dataType : 'text',
		success : function(data) {
			var obj = util.str2Json(data); 
			if(obj.success=='true')
				{
					var object = util.str2Json(data).data;
					$("#productNum").html(object.productNum);
					$("#productName").html(object.productName);
					$("#qsNum").html(object.qsNum);
				    $("#gbNum").html(object.gbNum);
				    $("#firmName").html(object.firmName);
				    $("#productType").html(object.productType);
					$("#productTech").html(object.productTech);
					$("#shelfLife").html(object.shelfLife);
					$("#quantity").html(object.quantity);
					$("#ingredient").html(object.ingredient);
					$("#productionDate").html(object.productionDate);
					
					$("#qualityCode").html(object.qualityCode);
					$("#checkoutResult").html(object.checkoutResult);
					$("#checkoutId").html(object.checkoutId);
					$("#proEnPname").html(object.proEnPname);
					$("#proPinTro").html(object.proPinTro);
					$("#proNote").html(object.proNote);
					$("#commodityCodes").html(object.commodityCodes);
					$("#menufactureAddress").html(object.menufactureAddress);
					$("#dutyPerson").html(object.dutyPerson);
					$("#manufacturePhone").html(object.manufacturePhone);
					$("#institutionCode").html(object.institutionCode);
					
					
				}
			else
				{
					util.sysAlert(obj.data);
				}
			
		}
	});
};
/*
 * 获取url参数
 */
var getUrlParam=function(name) {
	 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	 var urlParam = window.location.search.substr(1);
	 var r = decodeURI(urlParam).match(reg);  //匹配目标参数
	 if (r != null) return unescape(r[2]); return null; //返回参数值

};

$(function(){
	var productNum = getUrlParam('productNum');
	loadsoftDetInfo(productNum);
	
});

$("#returnBtn").click(function(){
	window.location.href = "./product.html";
});