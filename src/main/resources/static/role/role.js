var util = new NT.utilObj.util();

var queryGridUrl = "../role/findByCondition.action";

var addDataUrl = "../role/addRole.action";

var editDataUrl = "../role/updateRole.action";

var removeDataUrl = "../role/delRole.action";

var querDetialUrl = "../role/beforeUpdateRole.action";

var updateOldJson;

var nowOperate;

var store_old={};
var store_new={};
function compareStore(){
	var returnValue=1;
	$.each(store_new,function(key,ele){
			if(key=='authoritys'){
				store_new['authoritys']=sortArr(store_new['authoritys']);
				store_old['authoritys']=sortArr(store_old['authoritys']);
				if(store_new['authoritys'].length==store_old['authoritys'].length){
					for(var i=0;i<store_new['authoritys'].length;i++){
						if(store_old['authoritys'][i]!=store_new['authoritys'][i]){
							returnValue=0;
						}
					}
				}else{
					returnValue=0;
				}
			}else{
				var valueOld=store_old[key];
				if(ele!=valueOld){
					returnValue=0;
				}
			}
		}
	);
	return returnValue;
}

function sortArr(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
				var temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	return arr;
}

/**
 * 加载数据
 */
var loadData = function(){
	var headParam = [];
	headParam.push("roleName");
	headParam.push("roleDesc");
	var url = queryGridUrl;
	var defaultBtns = {"viewBtn":"hide","editBtn":"show","removeBtn":"show"};
	var operateBtns = [];
	
	var querParam = getQueryGridParam();
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "roleId";
	gridObj["page"] = true;
	gridObj["checked"]=false;
	
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
 * 显示模态框
 */
var  showModel = function(){
	resetAddOrEditForm();
	$("#addOrEditModal").modal("show");
};

/**
 * 关闭模态框
 */
var hideModel = function(){
	$("#addOrEditModal").modal("hide");
};

/**
 * 清空form
 */
var resetAddOrEditForm = function(){
	$("#addOrEditForm")[0].reset();
	$('span[id="errormsg"]').remove();
};

/**
 * 新增或修改成功之后的事件
 * @return
 */
var addOrEditCompleteFun = function(){
//	if(nowOperate=="edit" )editlock();
	
	hideModel();
	loadData();
};


/**
 * 新增
 * @return
 */
var addData = function(param){
	operateUtil.addData(addDataUrl,param,addOrEditCompleteFun);
};

/**
 * 详细
 */
var viewData = function(param,viewSuccessFun){
	operateUtil.viewData(querDetialUrl,param,viewSuccessFun);
};

/**
 * 编辑
 */
var editData = function(param){
	operateUtil.editData(editDataUrl,param,addOrEditCompleteFun);
};

/**
 * 删除
 */
var removeData = function(param){
	operateUtil.removeData(removeDataUrl,param,addOrEditCompleteFun);
};



/**
 * 删除
 */
var removeBtn = function(btn){
	var pk = getPk(btn);
	/*var params={};
	params["approveBean.approveType"] = 'removeRole';
	params["approveBean.idValue"] = pk;
	params["approveBean.beanNew"] = 
		    '{"roleId":'+pk+',"roleName":"'+$(btn).parent().parent().parent().children('td').eq(0).text()+'",' +
		    	'"roleDesc":"'+$(btn).parent().parent().parent().children('td').eq(1).text()+'"}';
	*/
	var roleName = $(btn).parent().parent().parent().children('td').eq(0).text();
	var roleDesc = $(btn).parent().parent().parent().children('td').eq(1).text();
	var param='{'
	param=param+('\"roleName\":\"'+roleName+ '\",');
	param=param+('\"roleDesc\":\"'+roleDesc+ '\",');
	param=param+('\"roleId\":\"'+pk+ '\"');
	param += '}';
	param=str2Json(param);

	util.emmAjax({
		url : '../role/checkCanRemoveRole.action',
		data:{'roleIds[0]':pk},
		type : 'post',
		success : function(data) {
			var obj = util.str2Json(data); 
			if(obj.success=='true')
				{
					removeData(param);
				}else 
				{
					util.sysAlert(obj.data);
				}
		}
	});
//	var param = {"roleInfoApproveBean.roleBeanNew.roleIds":pk};
//	removeData(params);
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	window.checkForm.openFun().init({path:webPath,form:'addOrEditForm'}); 
	
	$("#addBtn").click(function(){
		roleid_loadTree = "";
		rmc_idName = "rmc_idName_add";
		nowOperate = "add";
		$("#action").html('新增角色');
		showModel();
		$.fn.zTree.init($("#authorityTree"), setting, null);
		treeName = "authorityTree";
		loadTree();
	});
	
	
	$("#addOrEditSaveBtn").click(function(){
		var returnValue=window.checkForm.openFun().onSubmit();
		if(nowOperate=="add"&&returnValue){
			var param = getAddParam();
			if(param!=null){
				addData(param);
			}
		}else if(nowOperate=="edit"&&returnValue ){
			var param = getEditParam();
			var returnValue=compareStore();
			if(returnValue==0){
				if(param!=null){
					editData(param);
				}
			}else{
				util.sysAlert("您尚未更改任何内容，保存失败！");
			}
			
		}
	});
	
	$("#queryGridBtn").click(function(){
		loadData();
	});
	
	loadData();
	
});

function editlock(){
	util.emmAjax({
			url : '../role/updateRoleEditFlag.action',
			type : 'post',
			data : {
				'roleId' : roleid_loadTree,
				'editFlag' : '1'
			},
			cache : false,
			dataType : 'text',
			success : function(data) {
			}
		});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 详情
 */
var viewBtn = function(){

};

function showEditPage(pk){
	util.emmAjax({
		url : '../role/beforeUpdateRole.action',
		type : 'post',
		data : {
			'roleId' : pk
		},
		cache : false,
		dataType : 'text',
		success : function(data) {
			var menuObj = util.str2Json(data);
			if(menuObj.success=='true')
				{
					showEditPageDetail(pk);
					//var menuObj = util.str2Json(data);
					updateOldJson=menuObj.data;
					$("#roleName").val(menuObj.data.roleName);
					$("#roleDesc").val(menuObj.data.roleDesc);
				}else 
				{
					util.sysAlert(menuObj.data);
				}
			
			
			//是否更改校验储存
			store_old['roleName']=menuObj.data.roleName;
			store_old['roleDesc']=menuObj.data.roleDesc;
			store_old['authoritys']=menuObj.data.authIds;
		}
	});
}

function showEditPageDetail (pk){
	roleid_loadTree = pk;
	$.fn.zTree.init($("#authorityTree"), setting, null);
	treeName = "authorityTree";
	rmc_idName = "rmc_idName_edit";
	loadTree();
	//loadRemote();
	$("[id=\'rmc_idName_edit\']").prop("checked", false);
}


/**
 * 编辑
 */
var editBtn = function(btn){
	nowOperate = "edit";
	$("#action").html('编辑角色');
	showModel();
	var pk = getPk(btn);
	showEditPage(pk);
};

/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var Rn = $("#query_roleName").val();
	var Rd = $("#query_roleDesc").val();
	var param = {
			'page':0,
			'size':10,
		'roleName' : Rn,
		'roleDesc' : Rd
	};
	return param;
};

/**
 * 获得增加的参数
 * @return
 */
var getAddParam = function(){
	var params={};
	var treeObj = $.fn.zTree.getZTreeObj("authorityTree");
	var nodes = treeObj.getCheckedNodes(true);
	if(nodes.length>0)
	{
		var roleName = $("#roleName").val();
		var roleDesc = $("#roleDesc").val();
		var param='{'
		param=param+('\"roleName\":\"'+roleName+ '\",');
		param=param+('\"roleDesc\":\"'+roleDesc+ '\",');
		var index=0;
		for ( var i = 0; i < nodes.length; i++) {
			if (nodes[i].isParent == false) 
			{
				param=param+('\"authIds['+index+']\":\"'+nodes[i].id+ '\",');
				index++;
			}
		}
		param = param.substring(0, param.length - 1);
		param += '}';
		param=str2Json(param);
					
		return param;
	}
	else{
		util.sysAlert("请勾选角色权限！");
	}
};

/**
 * 获得编辑的参数
 * @return
 **/
var getEditParam = function(){
	var authorityCollection=[];
	var params={};
	var treeObj = $.fn.zTree.getZTreeObj("authorityTree");
	var nodes = treeObj.getCheckedNodes(true);
	//var authorityStr="";
	for ( var i = 0; i < nodes.length; i++) {
		if (nodes[i].isParent == false) {
			//authorityStr+="{"
			//authorityStr+='"authId":'
			//authorityStr += nodes[i].id + '},';
			authorityCollection.push(parseInt(nodes[i].id));
		}
	}
	//authorityStr = authorityStr.substring(0, authorityStr.length - 1);
	
/*	params["approveBean.beanOld"] = '';
	params["approveBean.approveType"] = 'updateRole';
	params["approveBean.idValue"] = roleid_loadTree;
	params["approveBean.beanNew"] = 
		    '{"roleId":'+roleid_loadTree+',"roleName":"'+ $("#roleName").val() +
			'","roleDesc":"'+$("#roleDesc").val()+'"'+
			',"editFlag":"0"' +
			',"authInfos":['+authorityStr+']}';
			
	var authorityArray_old=updateOldJson.authorityIds;
	var authorityStr_old="";
	for(var j=0;j<authorityArray_old.length;j++){
		authorityStr_old+="{"
		authorityStr_old+='"authorityId":'
		authorityStr_old += authorityArray_old[j] + '},';
	}
	authorityStr_old = authorityStr_old.substring(0, authorityStr_old.length - 1);
	params["approveBean.beanOld"] = 
		    '{"roleId":'+roleid_loadTree+',"roleName":"'+ updateOldJson.roleName +
			'","roleDesc":"'+updateOldJson.roleDesc+'"'+
			',"lastEditTime":"'+updateOldJson.lastEditTime+'"'+
			',"editFlag":"0"' +
			',"authInfos":['+authorityStr_old+']}';*/
	
	var roleName = $("#roleName").val();
	var roleDesc = $("#roleDesc").val();
	var param='{'
	param=param+('\"roleName\":\"'+roleName+ '\",');
	param=param+('\"roleDesc\":\"'+roleDesc+ '\",');
	param=param+('\"roleId\":\"'+roleid_loadTree+ '\",');
	var index=0;
	for ( var i = 0; i < nodes.length; i++) {
		if (nodes[i].isParent == false) 
		{
			param=param+('\"authIds['+index+']\":\"'+nodes[i].id+ '\",');
			index++;
		}
	}
	param = param.substring(0, param.length - 1);
	param += '}';
	param=str2Json(param);
	
	
	store_new['roleName']=$("#roleName").val();
	store_new['roleDesc']=$("#roleDesc").val();
	store_new['authoritys']=authorityCollection;
	
	return param;
};

/**
 * 权限树属性设置
 */
var setting = {
	view : {
		dblClickExpand : false,
		showLine : true,
		selectedMulti : false
	},
	check : {
		enable : true,
		chkboxType : {
			"Y" : "s",
			"N" : "s"
		}
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	callback : {

	}
};
/**
 * 权限树得到数据
 */
var roleid_loadTree = "";
function loadTree() {
	util.emmAjax({
		url : '../role/loadAuthorityCheckTree.action',
		type : 'post',
		data : {
			'roleId' : roleid_loadTree
		},
		cache : false,
		dataType : 'text',
		success : function(data) {
			var obj = util.str2Json(data); 
			var menuObj = obj.data;
			if(obj.success=='true')
			{
				initRootTree(menuObj);
			}else 
			{
				util.sysAlert(obj.data);
			}
		},
		error : function() {
		}
	});
};

/**
 * 初始化最上层权限树
 */
function initRootTree(treeJsonData) {
	//for ( var i = 0; i < treeJsonData.length; i++) {
		var subchildrenStr = JSON.stringify(treeJsonData.children);
		var treeObj = $.fn.zTree.getZTreeObj(treeName);
		var rootNode = {
			name : treeJsonData.text,
			id : treeJsonData.id,
			nodeType : treeJsonData.nodeType,
			checked : treeJsonData.checked,
			isParent : true
			,iconOpen : "../ico/open.png"
			,iconClose : "../ico/close.png"
		};
		rootNode = treeObj.addNodes(null, rootNode);
		var subchildren = util.str2Json(subchildrenStr);
		generateTree(rootNode, subchildren);
	//}
}

/**
 * 生成整棵树
 */
function generateTree(node, subchildren) {
	var treeObj = $.fn.zTree.getZTreeObj(treeName);
	var parentnode = node;
	var sub = subchildren;
	for ( var i = 0; i < sub.length; i++) {
		if (sub[i].children.length != 0) {
			var firstNode = {
				name : sub[i].text,
				id : sub[i].id,
				nodeType : sub[i].nodeType,
				checked : sub[i].checked,
				isParent : true
				,iconOpen : "../ico/open.png"
				,iconClose : "../ico/close.png"
			};
			firstNode = treeObj.addNodes(parentnode[0], firstNode);
			var childrenStr = JSON.stringify(sub[i].children);
			var subsubchildren = util.str2Json(childrenStr);
			generateTree(firstNode, subsubchildren);
		} else {
			var firstNode = {
				name : sub[i].text,
				id : sub[i].id,
				url : sub[i].urlText,
				nodeType : sub[i].nodeType,
				checked : sub[i].checked
				,icon : "../ico/leaf1.png"
			};
			firstNode = treeObj.addNodes(parentnode[0], firstNode);
		}
	}
}

function checkNode(e) {
	var zTree = $.fn.zTree.getZTreeObj("authorityTree"),
	type = e.data.type,
	nodes = zTree.getSelectedNodes();
	if (type == "checkAllFalse") {
		zTree.checkAllNodes(false);
	} 
}

function refreshNode(){
	$.fn.zTree.init($("#authorityTree"), setting, null);
	$("#addBtn").bind("click", {type:"checkAllFalse"}, checkNode);
}

/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};
