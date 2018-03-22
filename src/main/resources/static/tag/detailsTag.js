var querDetialUrl = "../tag/findById.action";

/*-------------------------页面加載------------------------------*/
var loadsoftDetInfo = function(data) {
	util.emmAjax({
		url : querDetialUrl,
		type : 'post',
		data : {
			'tagNum' : data
		},
		cache : false,
		dataType : 'text',
		success : function(data) {
			var obj = util.str2Json(data); 
			if(obj.success=='true')
				{
					
					var object = util.str2Json(data).data;
					
					var tagStateDesc;
					if(object.tagState=='0'){
						tagStateDesc='初始化';
					}else if(object.tagState=='1'){
						tagStateDesc='激活';
					}
					
					$("#tagNum").html(object.tagNum);
					$("#tagSn").html(object.tagSn);
					//$("#tagSp").html(object.tagSp);
				    $("#tagState").html(tagStateDesc);
				    $("#tagInitTime").html(object.tagInitTime);
				    $("#tagAllocateTime").html(object.tagAllocateTime);
					$("#tagKey").html(object.tagKey);
					$("#tagCiphertext").html(object.tagCiphertext);
					$("#tagMac").html(object.tagMac);
					$("#firmName").html(object.firmName);
					$("#productName").html(object.productName);
					$("#productSerial").html(object.productSerial);
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
	var tagNum = getUrlParam('tagNum');
	loadsoftDetInfo(tagNum);
	
});

$("#returnBtn").click(function(){
	window.location.href = "./tag.html";
});