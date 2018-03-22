var querDetialUrl = "../firmUser/findById.action";

/*-------------------------页面加載------------------------------*/
var loadsoftDetInfo = function(data) {
	util.emmAjax({
		url : querDetialUrl,
		type : 'post',
		data : {
			'firmUsrId' : data
		},
		cache : false,
		dataType : 'text',
		success : function(data) {
			var obj = util.str2Json(data); 
			if(obj.success=='true')
				{
					var object = util.str2Json(data).data;
					$("#firmUsrId").html(object.firmUsrId);
					$("#firmName").html(object.firmName);
					$("#firmUsername").html(object.firmUsername);
				    $("#mobile").html(object.mobilePhone);
					$("#email").html(object.email);
					$("#registerTime").html(object.registerTime);
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
	var firmNum = getUrlParam('firmUsrId');
	loadsoftDetInfo(firmNum);
	
});

$("#returnBtn").click(function(){
	window.location.href = "./firmUser.html";
});