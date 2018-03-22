var querDetialUrl = "../firm/findById.action";

/*-------------------------页面加載------------------------------*/
var loadsoftDetInfo = function(data) {
	util.emmAjax({
		url : querDetialUrl,
		type : 'post',
		data : {
			'firmNum' : data
		},
		cache : false,
		dataType : 'text',
		success : function(data) {
			var obj = util.str2Json(data); 
			if(obj.success=='true')
				{
					var object = util.str2Json(data).data;
					$("#firmNum").html(object.firmNum);
					$("#firmName").html(object.firmName);
					$("#contact").html(object.contact);
				    $("#telephone").html(object.telephone);
				    $("#mobile").html(object.mobilePhone);
				    $("#fax").html(object.fax);
					$("#email").html(object.email);
					$("#address").html(object.address);
					$("#firmDate").html(object.firmDate);
					$("#remark").html(object.remark);
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
	var firmNum = getUrlParam('firmNum');
	loadsoftDetInfo(firmNum);
	
});

$("#returnBtn").click(function(){
	window.location.href = "./firm.html";
});