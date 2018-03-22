
var util = new NT.utilObj.util();
			
var treeData="";//记录点击节点

var authDesc = {};

//记录新节点
var newNode={icon:"../menu/css/zTreeStyle/img/leaf.png"};

//记录修改id
var trid="";
			
//记录添加父id
var trparid="";
			 
//添加删除标识
var uoaflag=0;
			 
//初次类型
var fistNode="";
		  
function getFlag(data){
	if(authDesc[data.subAuthority+"-box"]!=null){
		$("#"+data.subAuthority+"-box").prop("checked",true);
	}
}
$(function(){
	$.fn.zTree.init($("#sidebar1"), setting, null);
	loadTree();
	
	//getSx();
	
	$("body").bind(
		//鼠标点击事件不在节点上时隐藏右键菜单  
		"mousedown",
		function(event) {
			if (!(event.target.id == "bizMenu" || $(event.target)
					.parents("#bizMenu").length > 0)) {
				$("#bizMenu").hide();
			}
	});
	
	$("#nodeType").change(function(){
		subm();
	});
	
	$("#refreshAuthDesc").click(function(){
		refreshAuthDesc();
	});
	
	
});

function loadTree(){
	$.ajax( {    
		    url:'../menu/queryMenuTreeAll.action',      
		    type:'post',    
		    cache:false,    
		    dataType:'text',    
		    success:function(data) {    
		    	var menuObj = str2Json(data);
		    	if(menuObj.success=='true')
		    		{
		    			initRootTree(menuObj); 
		    		}
		    	else{
		    		 util.sysAlert(menuObj.data); 
		    	}
				  
		     },
		     error : function() {      
		          util.sysAlert("异常！");    
		     }    
		});
};

/**
 *初始化最上层菜单
 */
function initRootTree(treeJsonData){
	//for(var i=0;i<treeJsonData.data.length;i++){
		var subchildrenStr = JSON.stringify(treeJsonData.data.children);
		var treeObj = $.fn.zTree.getZTreeObj("sidebar1");
		var rootNode = {name:treeJsonData.data.text,isParent:true,iconClose:"../menu/css/zTreeStyle/img/close.png",iconOpen:"../menu/css/zTreeStyle/img/open.png"};
		rootNode = treeObj.addNodes(null, rootNode);
		var subchildren = str2Json(subchildrenStr);
		generateTree(rootNode,subchildren);
//	}
	var treeObj = $.fn.zTree.getZTreeObj("sidebar1");
	treeObj.expandAll(false);
}
/**
 *生成整棵树
 */
function generateTree(node,subchildren){
	var treeObj = $.fn.zTree.getZTreeObj("sidebar1");
	var parentnode = node;
	var sub = subchildren;
	for(var i= 0;i<sub.length;i++){
		if(sub[i].children.length!=0){
			var firstNode = {name:sub[i].text,id:sub[i].id,iconUrl:sub[i].iconText,parentId:sub[i].parentId,durl:sub[i].urlText,nodeType:sub[i].nodeType,xx:sub[i].authInfos,isParent:true,iconClose:"../menu/css/zTreeStyle/img/close.png",iconOpen:"../menu/css/zTreeStyle/img/open.png"};
			firstNode = treeObj.addNodes(parentnode[0], firstNode);
			var childrenStr = JSON.stringify(sub[i].children);
			var subsubchildren = str2Json(childrenStr);
			generateTree(firstNode,subsubchildren);
		}else{
			var firstNode = {name:sub[i].text,durl:sub[i].urlText,iconUrl:sub[i].iconText,id:sub[i].id,parentId:sub[i].parentId,nodeType:sub[i].nodeType,xx:sub[i].authInfos,icon:"../menu/css/zTreeStyle/img/leaf.png"};
			firstNode = treeObj.addNodes(parentnode[0], firstNode);
		}
	}
}

/*右键点击事件*/
function treeOnRightClick(event, treeId, treeNode) {
	if(treeNode!=null){
		$("#bizMenu").show();
		$("#bizMenu").css({
			"top" : event.clientY + "px",
			"left" : event.clientX + "px",
			"display" : "block"
		});
		$("#add-li").css("display","none");
		if(treeNode.nodeType==0||treeNode.nodeType==4||treeNode.name=="监控"){
			$("#add-li").css("display","block");
		}
		fistNode=treeNode.nodeType;
		treeData=treeNode;
	}
};

/**
 *添加节点点击事件
 */
 function treeOnLeftClick(event, treeId, treeNode){
	 $("#save-btn").css("display","none");
 	treeData="";
 	$("#parentOrgName").val("");
 	$("#orgName").val("");
 	$("#cd-imge").val("");
 	$("#url").val("");
 	$("#nodeType").val("4");
 	//$(".add-input").val("");
	//$(".add-check").prop("checked",false);
 	if(treeNode.name=="监控"){
 		return;		
 	}
 	//$("#qx-area").css("diaplay","block");
 	var isparent=treeNode.isParent;
 	$("#parentOrgName").val(treeNode.getParentNode().name);
 	$("#orgName").val(treeNode.name);
 	$("#cd-imge").val(treeNode.iconUrl);
 	$("#url").val(treeNode.durl);
 	var ntype=treeNode.nodeType;
 	$("#nodeType").val(ntype);
 	
 	$(".cdmc").attr("disabled","disabled");
 	$(".updateDis").attr("disabled","disabled");
	$("#orgName").attr("disabled","disabled");
	$("#cd-imge").attr("disabled","disabled");
	$("#nodeType").attr("disabled","disabled");
	
 	$("#bj-child").css("display","none");
 	$("#query").val("");
 	$("#add").val("");
 	$("#update").val("");
 	$("#delete").val("");
 	$("#report").val("");
 	
 	
 	var xx=treeNode.xx;
 			/*xx =str2Json(xx);*/
 	var queryPath="";
 	var addPath="";
 	var updatePath="";
 	var deletePath="";
 	var reportPath="";
 	var queryId="";
 	var addId="";
 	var updateId="";
 	var deleteId="";
 	var reportId="";
		for(var i=0;i<xx.length;i++){
			//getFlag(xx[i]);
			
			if(xx[i].authCn=="查询")
	 		{
				queryPath+=xx[i].serverPath+";";
				queryId+=xx[i].authId+";";
	 		}
	 		else if(xx[i].authCn=="添加")
	 		{
	 			addPath+=xx[i].serverPath+";";
	 			addId+=xx[i].authId+";";
	 		}
	 		else if(xx[i].authCn=="修改")
	 		{
	 			updatePath+=xx[i].serverPath+";";
	 			updateId+=xx[i].authId+";";
	 		}
	 		else if(xx[i].authCn=="删除")
	 		{
	 			deletePath+=xx[i].serverPath+";";
	 			deleteId+=xx[i].authId+";";
	 		}
	 		else if(xx[i].authCn=="报表")
	 		{
	 			reportPath+=xx[i].serverPath+";";
	 			reportId+=xx[i].authId+";";
		 		
	 		}
		}
		
		$("#query").val(queryPath);
		$("#add").val(addPath);
		$("#update").val(updatePath);
		$("#delete").val(deletePath);
		$("#report").val(reportPath);
		$("#queryId").val(queryId);
		$("#addId").val(addId);
		$("#updateId").val(updateId);
		$("#deleteId").val(deleteId);
		$("#reportId").val(reportId);
 	
 	/*if(!isparent){
 		if(ntype!="0"){
 			//$("#qx-area").css("display","block");
 			$(".updateDis").attr("disabled","disabled");
			var xx=treeNode.xx;
	 		for(var i=0;i<xx.length;i++){
	 			if(xx[i].authCn=="查询")
		 		{
			 		$("#query").val(xx[i].serverPath);
			 		
		 		}
		 		else if(xx[i].authCn=="添加")
		 		{
			 		$("#add").val(xx[i].serverPath);
		 		}
		 		else if(xx[i].authCn=="修改")
		 		{
			 		$("#update").val(xx[i].serverPath);
		 		}
		 		else if(xx[i].authCn=="删除")
		 		{
			 		$("#delete").val(xx[i].serverPath);
		 		}
		 		else if(xx[i].authCn=="报表")
		 		{
			 		$("#report").val(xx[i].serverPath);
		 		}
	 		}
 		}else{
 			//$("#qx-area").css("display","none");
 		}
 	}else{
 		//$("#qx-area").css("display","none");
 	}*/
}
 
 var setting = {
			view : {
				dblClickExpand : false,
				showLine : true,
				selectedMulti : false
			},
			data : {
				simpleData : {
					enable : true
				}
			},
			callback : {
				onRightClick : treeOnRightClick,
				onClick : treeOnLeftClick
			}
		};
 
	/**
	 *将json字符串转化为json对象
	 */
	function str2Json(jsonStr){
		var json = eval("(" + jsonStr + ")"); 
		return json;
	};
	
	
	function getSx(){
		$.ajax( {    
			    url:'../menu/authorityDescLoad.action',      
			    type:'post',    
			    cache:false,    
			    dataType:'text',    
			    success:function(data) {  
			    	var menuObj = str2Json(data);
			    	if(menuObj.success=='true')
			    		{
			    			loadSx(menuObj);
			    		}
			    	else{
			    		util.sysAlert(menuObj.data);    
			    	}
			    	
			     },
			     error : function() {      
			          util.sysAlert("异常！");    
			     }    
			});
	}
	
	function loadSx(data){
		//data=data.data;
		for(var i=0;i<data.length;i++){
				var pid=data[i].subAuthority+"-url";
				var cid=data[i].subAuthority+"-box";
				var html = ' <tr>'+
								'<td><input type="checkbox" id='+cid+'  class="add-check updateDis"  pem='+data[i].subAuthority+' pnm='+data[i].authorityCn+' pid='+pid+' name="userName"  disabled="disabled"  /></td>'+
								'<td>'+data[i].authorityCn+'</td>'+ 
								'<td><input type="text"  disabled="disabled"  class="updateDis" id='+pid+' value="'+data[i].serverPath+'"/></td>'+ 
						      '</tr>';
				authDesc[cid] = data[i];
				if(data[i].extendFlag){
					$('#grid2').append(html);
				}else{
					$('#grid1').append(html);
				}					
		}
	}
	
	/*编辑请求数据*/
	function updateData(){
		$("#save-btn").css("display","block");
		uoaflag=0;
		$("#bizMenu").hide();
		var isParent =treeData.isparent;
		var param={"menuTreeNode.id":treeData.id};
		updateShow(treeData,treeData.getParentNode().name,treeData.isParent);
		/*$.ajax( {    
			    url:'./menu/findMenuById.action',      
			    type:'post',    
			    cache:false,
			    data:param,    
			    dataType:'text',    
			    success:function(data) { 
			    	var temp='{"data":{"authorityCoreInfos":[{"authorityClass":"","authorityCn":"查看","authorityId":101,"extendFlag":false,"servletPath":"/menu/menuTreeByUser.action","subAuthority":"query"}],"children":[],"expanded":false,"iconText":"","id":"3","leaf":false,"nodeType":1,"parentId":2,"text":"菜单管理","urlText":"menumanage/menu"},"extData":null,"mapData":null,"number":0,"page":0,"promptMsg":"","rowNum":0,"success":"","totalPage":0}';
			    	var menuObj = str2Json(temp).data;
			    	updateShow(menuObj,treeData.getParentNode().name,treeData.isParent);
			    	//loadSx(menuObj);
			     },
			     error : function() {      
			          util.sysAlert("异常！");    
			     }    
			});*/
	}
	
	
	/*编辑显示*/
	function updateShow(data,paratNm,isparent){
		trid=data.id;
		trparid=data.parentId;
	 	$("#parentOrgName").val("");
	 	$("#orgName").val("");
	 	$("#cd-imge").val("");
	 	$("#url").val("");
	 	$("#nodeType").val("4");
	 	//$(".add-input").val("");
		//$(".add-check").prop("checked",false);
	 	$("#query").val("");
		$("#add").val("");
		$("#update").val("");
		$("#delete").val("");
		$("#report").val("");
		$("#queryId").val("");
		$("#addId").val("");
		$("#updateId").val("");
		$("#deleteId").val("");
		$("#reportId").val("");
	 	
		if(isparent){
			//$("#qx-area").css("display","none");
			$("#orgName").removeAttr("disabled");
			$("#cd-imge").removeAttr("disabled");
			
		 	$("#parentOrgName").val(data.getParentNode().name);
		 	$("#orgName").val(data.name);
		 	$("#cd-imge").val(data.iconUrl);
		 	$("#url").val(data.durl);
		 	var ntype=data.nodeType;
		 	$("#nodeType").val(ntype);
		 	$("#bc-button").attr("diaplay","block");
		}else{
			if(data.nodeType=="0"){
				//$("#qx-area").css("display","none");
				$("#orgName").removeAttr("disabled");
				$("#cd-imge").removeAttr("disabled");
				//$("#nodeType").removeAttr("disabled");
				$("#parentOrgName").val(data.getParentNode().name);
			 	$("#orgName").val(data.name);
			 	$("#cd-imge").val(data.iconUrl);
			 	$("#url").val(data.durl);
			 	var ntype=data.nodeType;
			 	$("#nodeType").val(ntype);

			 	$("#bc-button").attr("diaplay","block");
			}else{
				//$("#qx-area").css("display","block");
				$(".updateDis").removeAttr("disabled");
				$("#orgName").removeAttr("disabled");
				$("#cd-imge").removeAttr("disabled");
				//$("#nodeType").removeAttr("disabled");
				$("#url").removeAttr("disabled");
				$("#parentOrgName").val(data.getParentNode().name);
			 	$("#orgName").val(data.name);
			 	$("#cd-imge").val(data.iconUrl);
			 	$("#url").val(data.durl);
			 	var ntype=data.nodeType;
			 	$("#nodeType").val(ntype);
			 	var xx=data.xx;
			 	
			 	var queryPath="";
			 	var addPath="";
			 	var updatePath="";
			 	var deletePath="";
			 	var reportPath="";
			 	var queryId="";
			 	var addId="";
			 	var updateId="";
			 	var deleteId="";
			 	var reportId="";
					for(var i=0;i<xx.length;i++){
						//getFlag(xx[i]);
						
						if(xx[i].authCn=="查询")
				 		{
							queryPath+=xx[i].serverPath+";";
							queryId+=xx[i].authId+";";
				 		}
				 		else if(xx[i].authCn=="添加")
				 		{
				 			addPath+=xx[i].serverPath+";";
				 			addId+=xx[i].authId+";";
				 		}
				 		else if(xx[i].authCn=="修改")
				 		{
				 			updatePath+=xx[i].serverPath+";";
				 			updateId+=xx[i].authId+";";
				 		}
				 		else if(xx[i].authCn=="删除")
				 		{
				 			deletePath+=xx[i].serverPath+";";
				 			deleteId+=xx[i].authId+";";
				 		}
				 		else if(xx[i].authCn=="报表")
				 		{
				 			reportPath+=xx[i].serverPath+";";
				 			reportId+=xx[i].authId+";";
					 		
				 		}
					}
					
					$("#query").val(queryPath);
					$("#add").val(addPath);
					$("#update").val(updatePath);
					$("#delete").val(deletePath);
					$("#report").val(reportPath);
					$("#queryId").val(queryId);
					$("#addId").val(addId);
					$("#updateId").val(updateId);
					$("#deleteId").val(deleteId);
					$("#reportId").val(reportId);
			 	$("#bc-button").attr("diaplay","block");
			}
		}
	}
	
	/*添加菜单*/
	function addData(){
		$("#save-btn").css("display","block");
		uoaflag=1;
		$("#bizMenu").hide();
		$(".cdmc").removeAttr("disabled");
		$("#parentOrgName").attr("disabled","disabled");
		$("#parentOrgName").val(treeData.name);
		$("#orgName").val("");
		$("#cd-imge").val("");
		$("#url").val("");
		$("#nodeType").val("4");
		$("#nodeType").removeAttr("disabled");
		$("#query").val("");
		$("#add").val("");
		$("#update").val("");
		$("#delete").val("");
		$("#report").val("");
		$("#queryId").val("");
		$("#addId").val("");
		$("#updateId").val("");
		$("#deleteId").val("");
		$("#reportId").val("");
		//$("#qx-area").css("display","none");
		$("#bc-button").attr("diaplay","block");
	}
	
	
	
	/*保存*/
	function saveBtn(){
		if(uoaflag==1){
			var nodeType=$("#nodeType").val();
			if(nodeType=="0"){
				var parentId2=treeData.id;
					if($("#parentOrgName").val()=="监控"){
						parentId2=1;
					}
				var param={
					"nodeType":0,
					"parentId":parentId2,
					"text":$("#orgName").val(),
					"miconText":$("#cd-imge").val(),
					"urlText":"",
				};
			}else{
				var param=getParam();
				param=param+('\"nodeType\":\"'+nodeType+ '\",');
				param=param+('\"parentId\":\"'+treeData.id+ '\",');
				param=param+('\"text\":\"'+$("#orgName").val()+ '\",');
				param=param+('\"iconText\":\"'+$("#cd-imge").val()+ '\",');
				param=param+('\"urlText\":\"'+$("#url").val()+ '\",');
				param = param.substring(0, param.length - 1);
				param += '}';
				param=str2Json(param);
				}
				
			util.emmAjax( {    
			    url:'../menu/addMenu.action',      
			    type:'post',    
			    cache:false,
			    data:param,
			    dataType:'text',    
			    success:function(data) {
					//data=eval("(" + data + ")");
					var menuObj = str2Json(data);
					if(menuObj.success=='true')
						{
							util.sysAlert("添加成功"); 
					    	getNewNode(menuObj.data);
					    	$("#save-btn").css("display","none");
					    	$(".cdmc").attr("disabled","disabled");
					    	//location.reload();
					    	rereshNode();
						}
					else{
						util.sysAlert(menuObj.data);
					}
			    	
			     }   
			});
		}else{
			var nodeType=$("#nodeType").val();
			if(nodeType=="0"){
				var param={
					"nodeType":0,
					"parentId":trparid,
					"id":trid,
					"text":$("#orgName").val(),
					"iconText":$("#cd-imge").val(),
					"urlText":"",
				};
			}else{
				var param=getParam();
				param=param+('\"id\":\"'+trid+ '\",');
				param=param+('\"nodeType\":\"'+nodeType+ '\",');
				param=param+('\"parentId\":\"'+trparid+ '\",');
				param=param+('\"text\":\"'+$("#orgName").val()+ '\",');
				param=param+('\"iconText\":\"'+$("#cd-imge").val()+ '\",');
				param=param+('\"urlText\":\"'+$("#url").val()+ '\",');
				param = param.substring(0, param.length - 1);
				param += '}';
				param=str2Json(param);
				}
				
			util.emmAjax( {    
			    url:'../menu/updateMenu.action',      
			    type:'post',    
			    cache:false,
			    data:param,
			    //dataType:'text',    
			    success:function(data) {
			    	var menuObj = str2Json(data);
					if(menuObj.success=='true')
						{
							util.sysAlert("删除成功"); 
					    	var treeObj = $.fn.zTree.getZTreeObj("sidebar1");
					    	treeObj.removeNode(treeData);
					    	//location.reload();
						}
					else{
						util.sysAlert(menuObj.data);
					}
					
					
			    	util.sysAlert("修改成功");
					$("#save-btn").css("display","none");
					data=eval("(" + data + ")");
					var treeObj1 = $.fn.zTree.getZTreeObj("sidebar1");
					treeObj1.removeNode(treeData);
					getNewNode(data.data);
					rereshPNode();
					//loadTree();
			     }   
			});
		}
		
	}
	
	/*删除*/
	function deleteData(){
		var isparent=treeData.isParent;
		var param={"id":treeData.id};
		util.deleteView(function(){
			util.emmAjax( {    
			    url:'../menu/removeMenu.action',      
			    type:'post',    
			    cache:false,
			    data:param,
			    dataType:'text',    
			    success:function(data) {
			    	var menuObj = str2Json(data);
					if(menuObj.success=='true')
						{
							util.sysAlert("删除成功"); 
					    	var treeObj = $.fn.zTree.getZTreeObj("sidebar1");
					    	treeObj.removeNode(treeData);
					    	//location.reload();
						}
					else{
						util.sysAlert(menuObj.data);
					}
			    	
			     }   
			});
		});
	}
	
	
	function getParam(){
		var param="{";
		var f=0;
		/*$(".add-check").each(function(i){
				if(this.checked){
					if(this.id!="all-box2"||this.id!="all-box1"){
						var id=this.id;
					//	var pid=
						var val=$("#"+$("#"+id).attr("pid")).val();
						param=param+('\"authInfos['+f+'].authCn\":\"'+ $("#"+id).attr("pnm") + '\",');
						param=param+('\"authInfos['+f+'].servletPath\":\"'+ val + '\",');
						param=param+('\"authInfos['+f+'].subAuthority\":\"'+ $("#"+id).attr("pem") + '\",');
						f=f+1;
					}
				}
			});*/
		var queryIds=$("#queryId").val();
		
		var addIds=$("#addId").val();
		var deleteIds=$("#deleteId").val();
		var updateIds=$("#updateId").val();
		var reportIds=$("#reportId").val();
		var queryPaths=$("#query").val();
		var addPaths=$("#add").val();
		var deletePaths=$("#delete").val();
		var updatePaths=$("#update").val();
		var reportPaths=$("#report").val();
		
		//查询权限
		var queryPathStr =null;
		if(queryPaths!="")
		{
			queryPathStr = queryPaths.split(";");	
		}
		var queryIdStr=null;
		if(queryIds!="")
		{
			queryIdStr = queryIds.split(";");
		}
		
		//添加权限
		var addPathStr =null;
		if(addPaths!="")
		{
			addPathStr = addPaths.split(";");	
		}
		var addIdStr=null;
		if(addIds!="")
		{
			addIdStr = addIds.split(";");
		}
		
		//修改权限
		var updatePathStr =null;
		if(updatePaths!="")
		{
			updatePathStr = updatePaths.split(";");	
		}
		var updateIdStr=null;
		if(updateIds!="")
		{
			updateIdStr = updateIds.split(";");
		}
	    //删除
		var deletePathStr =null;
		if(deletePaths!="")
		{
			deletePathStr = deletePaths.split(";");	
		}
		var deleteIdStr=null;
		if(deleteIds!="")
		{
			deleteIdStr = deleteIds.split(";");
		}
		
		//报表权限
		var reportPathStr =null;
		if(reportPaths!="")
		{
			reportPathStr = reportPaths.split(";");	
		}
		var reportIdStr=null;
		if(reportIds!="")
		{
			reportIdStr = reportIds.split(";");
		}
		
		var authClass = treeData.name;
		var allIndex=0;
		if(queryPathStr==null&&queryIdStr!=null)
		{
			var max=queryIdStr.length-1;
			for(var i=0;i<max;i++)
			{
				if(queryIdStr[i]!=null||queryIdStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].authId\":\"'+queryIdStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"查询\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
			
		}
		else if(queryPathStr!=null&&queryIdStr==null)
		{
			var max=queryPathStr.length-1;
			for(var i=0;i<max;i++)
			{
				if(queryPathStr[i]!=null||queryPathStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+queryPathStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"查询\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
			
		}
		else if(queryPathStr!=null&&queryIdStr!=null)
		{
			var max=queryPathStr.length-1;
			if(queryPathStr.length<queryIdStr.length)
			{
				max=queryIdStr.length-1;
			}
			for(var i=0;i<max;i++)
			{
				if(queryPathStr[i]!=null&&queryPathStr[i]!=""&&typeof(queryPathStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+queryPathStr[i]+ '\",');
					}
				if(queryIdStr[i]!=null&&queryIdStr[i]!=""&&typeof(queryIdStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].authId\":\"'+queryIdStr[i]+ '\",');
					}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"查询\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		
		}
		
		
		//添加权限
		/*var addPathStr =null;
		if(addPaths!="")
		{
			addPathStr = addPaths.split(";");	
		}
		var addIdStr=null;
		if(addIds!="")
		{
			addIdStr = addIds.split(";");
		}
		var authClass = treeData.name;*/
		if(addPathStr==null&&addIdStr!=null)
		{
			var max=addIdStr.length-1;
			for(var i=0;i<max;i++)
			{
				if(addIdStr[i]!=null||addIdStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].authId\":\"'+addIdStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"添加\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
			
		}
		else if(addPathStr!=null&&addIdStr==null)
		{
			var max=addPathStr.length-1;
			for(var i=0;i<max;i++)
			{
				if(addPathStr[i]!=null||addPathStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+addPathStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"添加\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
			
		}
		else if(addPathStr!=null&&addIdStr!=null)
		{
			var max=addPathStr.length-1;
			if(addPathStr.length<addIdStr.length)
			{
				max=addIdStr.length-1;
			}
			for(var i=0;i<max;i++)
			{
				if(addPathStr[i]!=null&&addPathStr[i]!=""&&typeof(addPathStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+addPathStr[i]+ '\",');
					}
				if(addIdStr[i]!=null&&addIdStr[i]!=""&&typeof(addIdStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].authId\":\"'+addIdStr[i]+ '\",');
					}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"添加\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		
		//修改权限
		/*var updatePathStr =null;
		if(updatePaths!="")
		{
			updatePathStr = updatePaths.split(";");	
		}
		var updateIdStr=null;
		if(updateIds!="")
		{
			updateIdStr = updateIds.split(";");
		}
		var authClass = treeData.name;*/
		if(updatePathStr==null&&updateIdStr!=null)
		{
			var max=updateIdStr.length-1;
			treeData;
			for(var i=0;i<max;i++)
			{
				if(updateIdStr[i]!=null||updateIdStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].authId\":\"'+updateIdStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"修改\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		else if(updatePathStr!=null&&updateIdStr==null)
		{
			var max=updatePathStr.length-1;
			for(var i=0;i<max;i++)
			{
				if(updatePathStr[i]!=null||updatePathStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+updatePathStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"修改\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		else if(updatePathStr!=null&&updateIdStr!=null)
		{
			var max=updatePathStr.length-1;
			if(updatePathStr.length<updateIdStr.length)
			{
				max=updateIdStr.length-1;
			}
			for(var i=0;i<max;i++)
			{
				if(updatePathStr[i]!=null&&updatePathStr[i]!=""&&typeof(updatePathStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+updatePathStr[i]+ '\",');
					}
				if(updateIdStr[i]!=null&&updateIdStr[i]!=""&&typeof(updateIdStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].authId\":\"'+updateIdStr[i]+ '\",');
					}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"修改\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		
		//删除权限
		/*var deletePathStr =null;
		if(deletePaths!="")
		{
			deletePathStr = deletePaths.split(";");	
		}
		var deleteIdStr=null;
		if(deleteIds!="")
		{
			deleteIdStr = deleteIds.split(";");
		}
		var authClass = treeData.name;*/
		if(deletePathStr==null&&deleteIdStr!=null)
		{
			var max=deleteIdStr.length-1;
			for(var i=0;i<max;i++)
			{
				if(deleteIdStr[i]!=null||deleteIdStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].authId\":\"'+deleteIdStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"删除\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		else if(deletePathStr!=null&&deleteIdStr==null)
		{
			var max=deletePathStr.length-1;
			for(var i=0;i<max;i++)
			{
				if(deletePathStr[i]!=null||deletePathStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+deletePathStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"删除\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		else if(deletePathStr!=null&&deleteIdStr!=null)
		{
			var max=deletePathStr.length-1;
			if(deletePathStr.length<deleteIdStr.length)
			{
				max=deleteIdStr.length-1;
			}
			for(var i=0;i<max;i++)
			{
				if(deletePathStr[i]!=null&&deletePathStr[i]!=""&&typeof(deletePathStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+deletePathStr[i]+ '\",');
					}
				if(deleteIdStr[i]!=null&&deleteIdStr[i]!=""&&typeof(deleteIdStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].authId\":\"'+deleteIdStr[i]+ '\",');
					}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"删除\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		
		
		//报表权限
		/*var reportPathStr =null;
		if(reportPaths!="")
		{
			reportPathStr = reportPaths.split(";");	
		}
		var reportIdStr=null;
		if(reportIds!="")
		{
			reportIdStr = reportIds.split(";");
		}
		var authClass = treeData.name;*/
		if(reportPathStr==null&&reportIdStr!=null)
		{
			var max=reportIdStr.length-1;
			
			for(var i=0;i<max;i++)
			{
				if(reportIdStr[i]!=null||reportIdStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].authId\":\"'+reportIdStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"报表\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		else if(reportPathStr!=null&&reportIdStr==null)
		{
			var max=reportPathStr.length-1;
			for(var i=0;i<max;i++)
			{
				if(reportPathStr[i]!=null||reportPathStr[i]!="")
				{
					param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+reportPathStr[i]+ '\",');
				}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"报表\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		else if(reportPathStr!=null&&reportIdStr!=null)
		{
			var max=reportPathStr.length-1;
			if(reportPathStr.length<reportIdStr.length)
			{
				max=reportIdStr.length-1;
			}
			for(var i=0;i<max;i++)
			{
				if(reportPathStr[i]!=null&&reportPathStr[i]!=""&&typeof(reportPathStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+reportPathStr[i]+ '\",');
					}
				if(reportIdStr[i]!=null&&reportIdStr[i]!=""&&typeof(reportIdStr[i]) != "undefined")
					{
						param=param+('\"authInfos['+allIndex+'].authId\":\"'+reportIdStr[i]+ '\",');
					}
				param=param+('\"authInfos['+allIndex+'].authCn\":\"报表\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		}
		
		
		
		//param=param+('\"authInfos['+f+'].authCn\":\"'+ $("#"+id).attr("pnm") + '\",');
		//param=param+('\"authInfos['+f+'].servletPath\":\"'+ val + '\",');
		//param=param+('\"authInfos['+f+'].subAuthority\":\"'+ $("#"+id).attr("pem") + '\",');
		
		return param;
	}
	
	/*切换类型事件*/
	function subm(){
		var dval=$("#nodeType").val();
		if(dval!=0 &&dval!=4){
			//$("#qx-area").css("display","block");
			$("#url").removeAttr("disabled");
			$(".updateDis").removeAttr("disabled");
			if(fistNode==0){
				$(".add-input").val("");
				$(".add-check").prop("checked",false);
			}
		}else{
			$("#url").attr("disabled","disabled");
			//$("#qx-area").css("display","none");
		}	
		
	}
	//刷新父节点
	function rereshParentNode(){ 
		var treeObj = $.fn.zTree.getZTreeObj("sidebar1");
		treeObj.reAsyncChildNodes(treeData, "refresh");
	 }
	  //刷新当前节点
	function rereshNode(){
		var treeObj = $.fn.zTree.getZTreeObj("sidebar1");
		if(treeData.icon!=null||treeData.icon!=""){
			treeData["iconClose"]="../menu/css/zTreeStyle/img/close.png";
			treeData["iconOpen"]="../menu/css/zTreeStyle/img/open.png";
			//delete treeData["icon"];
			treeObj.updateNode(treeData);
		}
		treeObj.addNodes(treeData, newNode, true); 
	}
	
	function rereshPNode(){
		var treeObj = $.fn.zTree.getZTreeObj("sidebar1");
		var pn=treeData.getParentNode();
		if(pn.icon!=null||pn.icon!=""){
			pn["iconClose"]="../menu/css/zTreeStyle/img/close.png";
			pn["iconOpen"]="../menu/css/zTreeStyle/img/open.png";
			//delete treeData["icon"];
			treeObj.updateNode(pn);
		}
		treeObj.addNodes(pn, newNode, true); 
	}
	
	function getNewNode(data){
		newNode["name"]=data.text;
		newNode["durl"]=data.urlText;
		newNode["iconUrl"]=data.iconText;
		newNode["id"]=data.id;
		newNode["parentId"]=data.parentId;
		newNode["nodeType"]=data.nodeType;
		newNode["xx"]=data.authInfos;
	}
	
	var refreshAuthDesc = function(){
		util.emmAjax( {    
		    url:'../menu!refreshAuthorityDesc.action',      
		    type:'post',    
		    cache:false,
		    dataType:'text',    
		    success:function(data) {    
		    	util.sysAlert("同步成功");
		     }
		});
	}