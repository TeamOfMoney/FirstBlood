var util = new NT.utilObj.util();
var mainNavContent = {};
var loginUserName;
var loginUserRealName;
$(function() {
	loadTree();
	loadLoginUserInfo();
	$("#logout").click(
			function(){
				logoutSys();
			}
	);
	function logoutSys(){
		if(confirm("是否确认登出系统？")){
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
		}
	}
	$("#getUserName").click(function(){
		resetAddOrEditForm();
		$("#action").html('密码修改');
		$("#addOrEditModal").modal("show");
		updatePwd(loginUserName);
	});
});
clearAddOrEidtPsw=function(){
	check.clear("oldPwd");
	check.clear("newPwd");
	check.clear("againPwd");
};
/**
 * 清空form
 */
var resetAddOrEditForm = function(){
	$("#addOrEditForm")[0].reset();
	clearAddOrEidtPsw();
};
/**
 *加载菜单树
 */
function loadTree() {
	var util = new NT.utilObj.util();
	util.emmAjax({
		url : './menu/menuTreeByUser.action',
		success : function(data) {
			var obj = eval('(' + data + ')');
			initRootMenu(obj.data.children);
		}
	});
};

/**
 *获取登录用户名
 */
function loadLoginUserInfo() {
	var util = new NT.utilObj.util();
	util.emmAjax({
		url : './login/getLoginUserInfo.action',
		success : function(data) {
			var obj = eval('(' + data + ')');
			loginUserName = obj.data.userName;
			loginUserRealName = obj.data.realName;
			$("#getUserName").html("用户名："+loginUserRealName);
			
		}
	});
};


/**
 *初始化一级菜单
 */
function initRootMenu(treeJsonData) {
	for ( var i = 0; i < treeJsonData.length; i++) {
		var rootUlHtml = '	<li id="menuId_'+treeJsonData[i].id+'" contentname="'+treeJsonData[i].text+'">'
						+'		<a href="#">'
						+'			<i class="fa '+treeJsonData[i].iconText+'" style="font-size:20px;"></i>'
						+'			<span class="nav-label">'+treeJsonData[i].text+'</span>'
						+'			<span class="fa arrow"></span>'
						+'		</a>'
						+'	</li>';
		$('#demo-list').append(rootUlHtml);
		
		var menuChildren = treeJsonData[i].children;
		generateNextMenu(menuChildren);
	}
	jQuery("#jquery-accordion-menu").jqueryAccordionMenu();
};

/**
 *生成二级菜单
 */

function generateNextMenu(subchildren){
	if(subchildren==null||subchildren.length<1){
		return;
	}
	var menuUlHtml = '<ul class="submenu" id="menuNextId_'+subchildren[0].parentId+'"></ul>';
	$('#menuId_'+subchildren[0].parentId).append(menuUlHtml);
	for(var i=0;i<subchildren.length;i++){
		var menuLiHtml = '<li onclick="loadIframe(this)" parentid="menuId_'+subchildren[0].parentId+'" frmaeUrl="'+subchildren[i].urlText+'"  ><a name="subchildrenText" href="#">'+subchildren[i].text+'</a></li>';
		$('#menuNextId_'+subchildren[i].parentId).append(menuLiHtml);
	}
};


/**
 *加载子页面
 */
function loadIframe(dom) {
	
	$("a[name='subchildrenText']").removeClass("clickMenu");
	$($(dom).find("a")[0]).addClass("clickMenu");
	
	
	var url = dom.getAttribute('frmaeUrl');
	var parentId = dom.getAttribute('parentid');
	var parentName = $("#"+parentId).attr("contentname");
	var thisName = $($(dom).find("a")[0]).html();
	mainNavContent["parentName"] = parentName;
	mainNavContent["thisName"] = thisName;
	$('#subIframe').attr("src", url);
};
function backMain() {
	$('#subIframe').attr("src", "./index.html");
}

var querySession = function(){
	global_filePushResInterval = setInterval(function(){
		util.emmAjax({
			url : './user/querySession.action',
			loading:false,
			success : function(data) {
				var data = util.str2Json(data);
				if(data.success=="false"){
					window.location.href = './logOut.action';
				}
			}
		});
	},20000);
};

