
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
	
var stepIndex = 0;
	
	$("#addInstallStep").click(function(){
		stepIndex++;
		var index = stepIndex;
		var installStepHtml = '<tr><td></td>'+
								'<td><input type="text"    class="updateDis" id="report" name="report" value="" style="width:150px"/></td>'+
								'<td><input type="text"   class="updateDis" id="add" name="add" value="" style="width:300px"/></td>'+
								'<td><button check="" onclick="deletetr(this.parentNode)" type="button" class="btn btn-sucess btn-sm" name="removeStepBtn" title="删除权限"><i class="glyphicon glyphicon-minus" ></i></button></td>'+
								'<td><input type="text"  disabled="disabled"  class="updateDis" id="addId" name="addId" value="" style="display:none;" /></td> </tr>';
		$("#grid1").append(installStepHtml);
	});
});

function deletetr(tdobject){  
    var td=$(tdobject);  
    td.parents("tr").remove();  
} 

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
	$("#addInstallStep").attr("disabled","disabled");
	
 	$("#bj-child").css("display","none");
 	$("#query").val("");
 	$("#add").val("");
 	$("#update").val("");
 	$("#delete").val("");
 	$("#report").val("");
 	
 	
 	var xx=treeNode.xx;
 	
		var stepnum=0;
		//$("#grid1").remove();
		$("#grid1").html("");  
		for(var i =0;i<xx.length;i++)
		{
			stepnum=i+1;
			var installStepHtml = '<tr><td>'+stepnum+'</td>'+
			'<td><input type="text"  disabled="disabled"  class="updateDis" id="authCn'+i+'" name="report" value="'+xx[i].authCn+'" style="width:150px"/></td>'+
			'<td><input type="text"  disabled="disabled"  class="updateDis" id="authPath'+i+'" name="add" value="'+xx[i].serverPath+'" style="width:300px"/></td>'+
			'<td><button  check="" onclick="deletetr(this.parentNode)" disabled="disabled" type="button" class="btn btn-sucess btn-sm" name="removeStepBtn" title="删除权限"><i class="glyphicon glyphicon-minus" ></i></button></td>'+
			'<td><input type="text"  disabled="disabled"  class="updateDis" id="authId'+i+'" name="" value="'+xx[i].authId+'" style="display:none;" /></td> </tr>';
			$("#grid1").append(installStepHtml);
		}
		/*stepIndex++;
		var index = stepIndex;
		var installStepHtml = '<tr><td>'+stepIndex+'</td>'+
								'<td><input type="text"  disabled="disabled"  class="updateDis" id="report" name="report" value="" style="width:150px"/></td>'+
								'<td><input type="text"  disabled="disabled"  class="updateDis" id="add" name="add" value="" style="width:300px"/></td>'+
								'<td onclick="deletetr(this)"><button  check=""  type="button" class="btn btn-sucess btn-sm" name="removeStepBtn" title="删除权限"><i class="glyphicon glyphicon-minus" ></i></button></td>'+
								'<td><input type="text"  disabled="disabled"  class="updateDis" id="addId" name="addId" value="" style="display:none;" /></td> </tr>';
		$("#grid1").append(installStepHtml);*/
 	
 	
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
				
			 	var xx=data.xx;
			 	
			 	
			 	$("#bc-button").attr("diaplay","block");
			 	
			 	$("#grid1").html("");  
				for(var i =0;i<xx.length;i++)
				{
					stepnum=i+1;
					var installStepHtml = '<tr><td>'+stepnum+'</td>'+
					'<td><input type="text"  disabled="disabled"  class="updateDis" id="authCn'+i+'" name="report" value="'+xx[i].authCn+'" style="width:150px"/></td>'+
					'<td><input type="text"  disabled="disabled"  class="updateDis" id="authPath'+i+'" name="add" value="'+xx[i].serverPath+'" style="width:300px"/></td>'+
					'<td ><button  check="" onclick="deletetr(this.parentNode)" id="deleteBtn'+i+'" disabled="disabled" type="button" class="btn btn-sucess btn-sm" name="removeStepBtn" title="删除权限"><i class="glyphicon glyphicon-minus" ></i></button></td>'+
					'<td><input type="text"  disabled="disabled"  class="updateDis" id="authId'+i+'" name="" value="'+xx[i].authId+'" style="display:none;" /></td> </tr>';
					$("#grid1").append(installStepHtml);
					
					$("#deleteBtn"+i).removeAttr("disabled");
				}
				
				$(".updateDis").removeAttr("disabled");
				
				$("#orgName").removeAttr("disabled");
				$("#addInstallStep").removeAttr("disabled");
				$("#cd-imge").removeAttr("disabled");
				//$("#nodeType").removeAttr("disabled");
				$("#url").removeAttr("disabled");
				$("#parentOrgName").val(data.getParentNode().name);
			 	$("#orgName").val(data.name);
			 	$("#cd-imge").val(data.iconUrl);
			 	$("#url").val(data.durl);
			 	var ntype=data.nodeType;
			 	$("#nodeType").val(ntype);
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
		$("#addInstallStep").removeAttr("disabled");
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
				//alert(param);
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
				//alert(param);
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
		
		var authClass = treeData.name;
		var allIndex=0;
		var trList = $("#grid1").children("tr")
		  for (var i=0;i<trList.length;i++) {
		    var tdArr = trList.eq(i).find("td");
		    var authName = tdArr.eq(1).find("input").val();//authName
		    var serverPath = tdArr.eq(2).find("input").val();//serverPath
		    var authId = tdArr.eq(4).find("input").val();//authId
		     
		    //alert(authName);
		    //alert(serverPath);
		    //alert(authId);
		    if(serverPath==""&&authId!="")
			{
				param=param+('\"authInfos['+allIndex+'].authId\":\"'+authId+ '\",');
				param=param+('\"authInfos['+allIndex+'].authCn\":\"'+authName+'\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
			else if(serverPath!=""&&authId=="")
			{
				param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+serverPath+ '\",');
				param=param+('\"authInfos['+allIndex+'].authCn\":\"'+authName+'\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
			else if(serverPath!=""&&authId!="")
			{
				param=param+('\"authInfos['+allIndex+'].serverPath\":\"'+serverPath+ '\",');
				param=param+('\"authInfos['+allIndex+'].authId\":\"'+authId+ '\",');
				param=param+('\"authInfos['+allIndex+'].authCn\":\"'+authName+'\",');
				param=param+('\"authInfos['+allIndex+'].authClass\":\"'+authClass+'\",');
				allIndex++;
			}
		  }
		return param;
	}
	
	/*切换类型事件*/
	function subm(){
		var dval=$("#nodeType").val();
		if(dval!=0 &&dval!=4){
			//$("#qx-area").css("display","block");
			$("#url").removeAttr("disabled");
			$(".updateDis").removeAttr("disabled");
			$("#addInstallStep").removeAttr("disabled");
			if(fistNode==0){
				$(".add-input").val("");
				$(".add-check").prop("checked",false);
			}
		}else{
			$("#url").attr("disabled","disabled");
			$("#addInstallStep").attr("disabled","disabled");
			$("#grid1").html("");
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