var querDetialUrl = "../user/findById.action";

/*-------------------------页面加載------------------------------*/
var loadsoftDetInfo = function(data) {
	util.emmAjax({
		url : querDetialUrl,
		type : 'post',
		data : {
			'userName' : data
		},
		cache : false,
		dataType : 'text',
		success : function(data) {
			var obj = util.str2Json(data); 
			if(obj.success=='true')
				{
					var object = util.str2Json(data).data;
					$("#orgCode").html(object.orgCode);
					$("#orgName").html(object.orgName);
					$("#userName").html(object.userName);
					$("#realName").html(object.realName);
					//$("#telephone").html(object.telephone);
					$("#mobilePhone").html(object.mobilePhone);
					$("#email").html(object.email);
					$("#sex").html(object.sex);
					$("#registerTime").html(object.registerTime);
					//$("#lastLoginTime").html(object.lastLoginTime);
					//$("#userCreator").html(object.editor);
					//$("#approver").html(object.approver);
					//$("#approvalTime").html(object.approvalTime);
					var ownerRoles = object.ownerRoles;
					if(ownerRoles!=null){
						var roleNames = "";
						for(var i=0;i<ownerRoles.length;i++){
							roleNames +=ownerRoles[i][1]+"，";
						}
						roleNames = roleNames.substring(0, roleNames.length-1);
						$("#roleNames").html(roleNames);
					}
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
	var userName = getUrlParam('userName');
	loadsoftDetInfo(userName);
	
});

$("#returnBtn").click(function(){
	window.location.href = "./user.html";
});