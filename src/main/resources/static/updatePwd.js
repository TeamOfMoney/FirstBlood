var loginObj = NT.namespace("updatePwdObj");	
var util = new NT.utilObj.util();
function updatePwd(loginUserName){

	var pagePath = "./";
	$("#oldPwd").blur(function(){
		checkPasswordOld();
	});
	
	$("#newPwd").blur(function(){
		checkPassword1();
	});
	
	$("#againPwd").blur(function(){
		checkPassword2();
	});
	
	$("#addOrEditSaveBtn").click(function(){
		var userName=loginUserName;
		var cpOld=checkPasswordOld();
		var cp1=checkPassword1();
		var cp2=checkPassword2();
		if(!(cpOld&&cp1&&cp2)){
			return false;
		}
		var oldPwd=$("#oldPwd").val();//获取老密码
		var newPwd=$("#newPwd").val();//获取新密码
		var againPwd=$("#againPwd").val();//在次输入密码 
		if(!(newPwd==againPwd)){
			util.sysAlert("新密码两次输入的不一致");
			return false;
		}
		
		util.emmAjax({
			 url:'./user/updateUserSelfPassword.action',
			 data:{"userName":userName,"oldPwd":$.md5(oldPwd),"pwd":$.md5(newPwd) },//"loginBean.securityCode":securityCode},
			 success:function(data){
				 var obj = eval('(' + data + ')');
				 if(obj.success=='true')
					 {
						 //util.sysAlert("修改密码成功!将跳转到登录界面！");
					 	 util.msg("修改密码成功!将跳转到登录界面！");
						 window.setTimeout(function(){
							 util.closeLoading();
							 util.emmAjax({
									url : './logOut.action',
									loading:false,
									success : function(data) {
										var obj = eval('(' + data + ')');
										if(obj.success=="true"){
											window.location.href = './';
										}
									}
								});
						 
						 },3000);
						// window.location.href="./logOut.action";
					 }
				 else{
					 util.sysAlert(obj.data);
				 }
				 
				 
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){
		    	//layer.msg('操作失败！');
		    	 util.sysAlert("操作失败！");
		    	//$("#Verify").attr("src","securityCodeImage!getSecurityCode.action?timestamp="+new Date().getTime());  
		    }
		});
		
	});
	
	/**
	 * 旧密码
	 */
	checkPasswordOld=function(){
		var result=true;
		var checkId="oldPwd";
		var msg="密码";
		var checkObj={};
		checkObj["msg"]=msg;
		checkObj["checkId"]=checkId;
		checkObj["pagePath"] = pagePath;
		result=check.onCheck(checkObj);
		return result;
	};
	
	/**
	 * 密码
	 */
	checkPassword1=function(){
		var result=true;
		var patrn=check.checkPassword;
		var sysMsg="密码只能在6~10个字符之间并且字母和数字组成！";
		var checkId="newPwd";
		var msg="密码";
		var checkObj={};
		checkObj["patrn"]=patrn;
		checkObj["msg"]=msg;
		checkObj["sysMsg"]=sysMsg;
		checkObj["checkId"]=checkId;
		checkObj["rules"] = [{"patrn":patrn,"sysMsg":sysMsg}];
		checkObj["pagePath"] = pagePath;
		result=check.onCheck(checkObj,pagePath);
		return result;
	};
	 /**
	 * 确认密码
	 */
	checkPassword2=function(){
		var result=true;
		var patrn=check.checkPassword;
		var checkId="againPwd";
		var sysMsg="密码只能在6~10个字符之间并且字母和数字组成！";
		var msg="确认密码";
		var checkObj={};
		checkObj["patrn"]=patrn;
		checkObj["msg"]=msg;
		checkObj["sysMsg"]=sysMsg;
		checkObj["checkId"]=checkId;
		checkObj["rules"] = [{"patrn":patrn,"sysMsg":sysMsg}];
		checkObj["pagePath"] = pagePath;
		result=check.onCheck(checkObj,pagePath);
		return result;
	};
	
	
};


	
