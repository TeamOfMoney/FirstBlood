var util = new NT.utilObj.util();

var loginUserName;
var orgCode;
var orgPath;
var orgName;
var orgId;
/*
 * 用户列表显示
 */
var queryGridUrl = "../user/findByCondition.action";

var addDataUrl = "../user/addUser.action";
var editDataUrl = "../user/updateUser.action";
var removeDataUrl = "../user/delUser.action";
var distributeUrl="../loanApp/distribute.action";
/*
 *查询用户资料 
 */
var querDetialUrl = "../user/findById.action";

var nowOperate;

/**
 * 加载数据
 */
var loadData = function(){
	var headParam = [];
	headParam.push("orgName");
	headParam.push("userName");
	headParam.push("realName");
	/*headParam.push("roleNames");*/
	headParam.push("sex");
	headParam.push("mobilePhone");
	headParam.push("email");
	headParam.push("userType");
	headParam.push("registerTime");
	
	var url = queryGridUrl;
	
	var defaultBtns = {"viewBtn":"hidden","editBtn":"hidden","removeBtn":"hidden"};
	var operateBtns = [];
	var pushBtn = {'btnName':'pushBtn','text':'<button class="btn btn-sm btn-success" onclick="distribute(this)" title="密码重置">' +
			' <i class="glyphicon glyphicon-repeat"></i>' +
			'</button>'};
	operateBtns.push(pushBtn);
	
	var querParam = getQueryGridParam();
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "userName";
	gridObj["page"] = true;
	gridObj["checked"]=false;
	var userTypeFormat = function(val){
		if(val=="1"){
			return "客户经理";
		}
		else if(val=="2"){
			return "申请分配";
		}
		else if(val=="3"){
			return "审核";
		}
		else if(val=="4"){
			return "二审人员";
		}
		else {
			return val;
		}
	};
	
	var headFormat = {"userType":userTypeFormat};
	gridObj["headFormat"] = headFormat;
	var nTGridBean = new NTGridBean();
	nTGridBean.init(gridObj);
	nTGridBean.loadGrid();
};


/**
 * 获得pk
 */
var getPk = function(btn){
	var pk = $(btn).parent().parent().parent().attr("pk");
	return pk;
};
/**
 * 编辑
 */
var editBtn = function(btn){
	var pk = getPk(btn);
	if(pk==loginUserName){
		util.sysAlert("您不能修改自己的信息！");
	}
	else{
		nowOperate = "edit";
		$("#action").html('编辑系统用户');
		showModel();
		$("#addUserName").attr("disabled",true);
		$("#passw1").hide();
		$("#passw2").hide();
		editDataFill(pk);
	}
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	window.checkForm.openFun().init({path:webPath,form:'addOrEditForm'}); 
	
	//loadRole_query();
	loadLoginUserInfo();

	$("#addOrEditSaveBtn").click(function(){
		var returnValue=window.checkForm.openFun().onSubmit();
		if(nowOperate=="add"&&returnValue ){
			var param = getAddParam();
			if(param!=undefined){
				addData(param);
			}
		}else if(nowOperate=="edit"&&returnValue ){
			var param = getEditParam();
			if(param!=undefined){
				var returnValue=compareStore();
				if(returnValue==0){
					if(param!=null){
						editData(param);
					}
				}else{
					util.sysAlert("您尚未更改任何内容，保存失败！");
				}
			}
		}

	});
	
	$("#queryGridBtn").click(function(){
		loadData();
	});
	$("#upload").click(function(){
		$("#upload_form").submit();
	});
	loadData();	
	$("#resetQueryFormInfo").click(function(){
		var form = $("#queryGridForm");
		form[0].reset();
		$("#queryOrgPath").val("");
	});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 *获取登录用户名
 */
function loadLoginUserInfo() {
	var util = new NT.utilObj.util();
	util.emmAjax({
		url : '../login/getLoginUserInfo.action',
		success : function(data) {
			var obj = eval('(' + data + ')');
			loginUserName = obj.data.userName;
			orgCode = obj.data.orgCode;
			orgPath = obj.data.orgPath;
			orgName = obj.data.orgName;
			orgId = obj.data.orgId;
		}
	});
};


/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var Qu = $("#query_userName").val();
	var Qr = $("#query_realName").val();
	var orgPath = $("#queryOrgPath").val();
	var roleId = $("#query_roleId").val();
	var param = {
			//'page':0,
			//'size':10,
		'userName' : Qu,
		'realName' : Qr,
		'orgPath' : orgPath
		//'roleIds[0]' : roleId
	};
	return param;
};


/**
 * 获得编辑的参数
 * @return
 */
var getEditParam = function(){
	var orgId = $("#txtAddOrgNum").val();
	var addOrgName = $("#addOrgName").val();
	var addUserName = $("#addUserName").val();
	var addRealName = $("#addRealName").val();
    //var addPhone = $("#addPhone").val();
    var addMobile = $("#addMobile").val();
	var addEmail = $("#addEmail").val();
	var addSex = $("#addSex").val();
	var addUserType = $("#addUserType").val();
	var array = new Array();// 定义数组
	var arrayRoleName=new Array()
	$("#multiselect_to").find("option").each(function(){
		array.push($(this).val());
		arrayRoleName.push($(this).html());
	});
	if(array.length<=0){
		util.sysAlert("请至少选择一种角色！");
		return ;
	}
	else if(addSex=='0'){
		util.sysTips("性别不能为空！","addSex");
		return ;
	}
	else if(addUserType=='0'){
		util.sysTips("用户类型不能为空！","addUserType");
		return ;
	}
	else{
		var userType=0;
		var isReplacedFlag=0;
		
		var roleStr="";
		for(var i=0;i<array.length;i++){
			roleStr+='{"roleId":'+array[i]+',"roleName":"'+arrayRoleName[i]+'"},'
		}
		roleStr = roleStr.substring(0, roleStr.length - 1);
		var params={};
		params["approveBean.approveType"] = 'updateUser';
		params["approveBean.idValue"] = addUserName;
		params["approveBean.beanNew"] ='{'+
		'"realName":"'+addRealName+'"'+
		',"userName":"'+addUserName+'"'+
		//',"telephone":"'+addPhone+'"'+
		',"mobilePhone":"'+addMobile+'"'+
		',"email":"'+addEmail+'"'+
		//',"fax":"'+addFax+'"'+
		//',"devManagerFlag":'+userType+
		//',"isReplacedFlag":'+isReplacedFlag+
		//',"orgInfo":{"orgId":"'+OrgId+'","orgName":"'+addOrgName+'"}'+
		',"roleInfos":['+roleStr+']'+
		'}';
		
		var ownerRoles=update_old_data.ownerRoles;
		var rolesStr_old="";
		/*for(var i=0;i<ownerRoles.length;i++){
			rolesStr_old+='{"roleId":'+ownerRoles[i][0]+',"roleName":"'+ownerRoles[i][1]+'"},'
		}
		rolesStr_old = rolesStr_old.substring(0, rolesStr_old.length - 1);
		*/
		params["approveBean.beanOld"] ='{'+
		'"realName":"'+update_old_data.realName+'"'+
		',"userName":"'+update_old_data.userName+'"'+
		//',"telephone":"'+update_old_data.telephone+'"'+
		',"mobilePhone":"'+update_old_data.mobilePhone+'"'+
		',"email":"'+update_old_data.email+'"'+
		//',"fax":"'+update_old_data.fax+'"'+
		//',"devManagerFlag":'+update_old_data.devManagerFlag+
		//',"isReplacedFlag":'+update_old_data.isReplacedFlag+
		//',"orgInfo":{"orgId":"'+update_old_data.orgId+'","orgName":"'+update_old_data.orgName+'"}'+
		',"roleInfos":['+rolesStr_old+']'+
		'}';
		
		
		var param='{'
			param=param+('\"realName\":\"'+addRealName+ '\",');
			param=param+('\"userName\":\"'+addUserName+ '\",');
			//param=param+('\"pwd\":\"'+$.md5(addPassword2)+ '\",');
			param=param+('\"mobilePhone\":\"'+addMobile+ '\",');
			param=param+('\"email\":\"'+addEmail+ '\",');
			param=param+('\"sex\":\"'+addSex+ '\",');
			param=param+('\"userType\":\"'+addUserType+ '\",');
			param=param+('\"orgId\":\"'+orgId+ '\",');
			param=param+('\"orgName\":\"'+addOrgName+ '\",');
			
			var index=0;
			/*for(var i=0;i<ownerRoles.length;i++){
				param=param+('\"roleIds['+index+']\":\"'+ownerRoles[i][0]+ '\",');
				//param=param+('\"roleInfos['+index+'].roleName\":\"'+ownerRoles[i][1]+ '\",');
				index++;
			}*/
			
			for(var i=0;i<array.length;i++){
				param=param+('\"roleIds['+index+']\":\"'+array[i]+ '\",');
				index++;
			}
			param = param.substring(0, param.length - 1);
			param += '}';
			param=str2Json(param);
				
		store_new['orgNum']=orgId;
		store_new['realName']=addRealName;
		//store_new['phone']=addPhone;
		store_new['mobile']=addMobile;
		store_new['email']=addEmail;
		store_new['sex']=addSex;
		store_new['userType']=addUserType;
		store_new['roles']=array;
		return param;
	}
};

/**
 * 编辑回调回填
 * @param data
 * @return
 */
var update_old_data;
var dataFill = function(data){
	var roles=[];
	var object = util.str2Json(data).data;
	update_old_data=object;
	$("#txtAddOrgNum").val(object.orgId);
	$("#addOrgName").val(object.orgName);
	$("#addUserName").val(object.userName);
	$("#addRealName").val(object.realName);
	//$("#addPhone").val(object.telephone);
	$("#addMobile").val(object.mobilePhone);
	
	$("#addEmail").val(object.email);
	$("#addSex").val(object.sex);
	$("#addUserType").val(object.userType);
	
	var innerhtml = "";
	for ( var i = 0; i < object.notOwnerRoles.length; i++) {
		innerhtml += "<option value='"
				+ object.notOwnerRoles[i][0] + "'>"
				+ object.notOwnerRoles[i][1]
				+ "</option>";
	}
	$("#multiselect").html(innerhtml);
	
	var owerRoleshtml = "";
	for ( var i = 0; i < object.ownerRoles.length; i++) {
		roles.push(object.ownerRoles[i][0]);
		owerRoleshtml += "<option value='"
				+ object.ownerRoles[i][0] + "'>"
				+ object.ownerRoles[i][1]
				+ "</option>";
	}
	$("#multiselect_to").html(owerRoleshtml);
	
	store_old['orgNum']=object.orgId;
	store_old['realName']=object.realName;
	//store_old['phone']=object.telephone;
	store_old['mobile']=object.mobilePhone;
	store_old['email']=object.email;
	store_old['sex']=object.sex;
	store_old['userType']=object.userType;
	store_old['roles']=roles;
};

var getUrlParam=function(name) {
	 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	 var urlParam = window.location.search.substr(1);
	 var r = decodeURI(urlParam).match(reg);  //匹配目标参数
	 if (r != null) return unescape(r[2]); return null; //返回参数值

};

//分配
var distribute = function(btn) {
	var pk = getPk(btn);
	var userName = pk;
	var loanId = getUrlParam('loanId');
	var param='{'
		param=param+('\"processUser\":\"'+userName+ '\",');
		param=param+('\"loanId\":\"'+loanId+ '\",');
		param = param.substring(0, param.length - 1);
		param += '}';
		param=str2Json(param);
	if(param!=undefined){
		if(param!=null){
			var util = new NT.utilObj.util();
			util.emmAjax({
				url : distributeUrl,
				success : function(data) {
					var obj =str2Json(data);
					if(obj.success=='true')
					{
						util.msg("审核人员分配成功");
						window.location.href = "./loanAppDistribute.html";
					}
					else{
						util.sysAlert(obj.data);
					}
				}
			});
		}
	}
	
};



/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};
