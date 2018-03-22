var LoadOrgTree = function(){
	var queryOrgTreeUrl = "../org/queryOrgInfoByParentId.action";
	
	function filter(treeId, parentNode, childNodes) {
		var data = childNodes.data;
		var array = [];
		if (!data) return null;
		for (var i=0; i<data.length; i++) {
			var obj = {id:data[i].id,orgPath:data[i].orgPath,text:data[i].text,orgCode:data[i].orgCode,orgAddr:data[i].orgAddr,orgManager:data[i].orgManager,orgTelephone:data[i].orgTelephone,isParent:!data[i].leaf,pId:data[i].parentId,areaCode:data[i].areaCode};
			array.push(obj);
		}
		return array;
	}

	
	function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
		
	}
	
	function onAsyncSuccess(event, treeId, treeNode, msg) {
		
	}
	
	this.loadOrgTree = function(treeId,orgSelect_o,orgAsyncId){
		var orgSelect = function(e,treeId, treeNode){
			orgSelect_o(e,treeId, treeNode);
		};
		
		var beforeClick = function(treeId, treeNode) {
			return true;
		};
		
		var beforeAsync = function(treeId, treeNode) {
			if(treeNode!=null){
				$("#"+orgAsyncId).val(treeNode.id);
			}
			
			return true;
		};
		
		var setting = {
		        view: {
		            selectedMulti: false,
		            showLine: false
		        },
		        async: {
					enable: true,
					url:queryOrgTreeUrl,
					 //type: "get",   //异步加载类型:post和get
					// contentType: "application/json", //定义ajax提交参数的参数类型，一般为json格式
					autoParam:{},
					otherParam:{"id": function(){ return $("#"+orgAsyncId).val()}},
					 //autoParam: ["id=id"] //定义提交时参数的名称，=号前面标识节点属性，后面标识提交时json数据中参数的名称
					dataFilter: filter
					//type:"get"
				},
				callback: {
					beforeClick: beforeClick,
					beforeAsync: beforeAsync,
					onAsyncError: onAsyncError,
					onAsyncSuccess: onAsyncSuccess,
					onClick: orgSelect
				},
		        check: {
		            enable: false
		        },
		        data: {
		            simpleData: {
		                enable: true
		            },
		            key: {
		            	name: "text",
		            	children: "data"
		            }
		            
		        }
		    };
		
		$.fn.zTree.init($("#"+treeId), setting);
	};
	

};

$(function(){
	$($(".orgCodeClass")[0]).click(function() {
		orgLayerSetting("add",this);
	});
	$($(".orgIdClass")[0]).click(function() {
		orgLayerSetting("add",this);
	});
	$($(".orgPathClass")[0]).click(function() {
		orgLayerSetting("add",this);
	});
	
	$($(".orgNameClass")[0]).click(function() {
		orgLayerSetting("add",this);
	});
	
	$($(".queryOrgCodeClass")[0]).click(function() {
		orgLayerSetting("query",this);
	});
	
	$($(".queryOrgIdClass")[0]).click(function() {
		orgLayerSetting("query",this);
	});
	
	$($(".queryOrgPathClass")[0]).click(function() {
		orgLayerSetting("query",this);
	});
	
	$($(".queryOrgNameClass")[0]).click(function() {
		orgLayerSetting("query",this);
	});
	
	var orgLayerSetting = function(queryOrAdd,input){
		var html = '<div class="orgTreeDiv">'+
					'<input class="orgIdClass" id="orgId" hidden>'+
					'<input id="inputOrgAsyncId" hidden>'+
					'<ul id="inputTreeDemo" class="ztree"></ul>'+
				'</div>';
		var orgLayer = layer.open({
			type: 1,
			skin: 'layui-layer-demo',
			offset: '20px',
			title:["机构","background:#D4D4D4;color:#000000;font-weight:bold"],
			area: ['322px', '520px'],
			content: html //这里content是一个DOM
		});
		
		var loadOrgTreeBean_input = new LoadOrgTree();
		var orgSelect_o = function(e,treeId, treeNode){
			if(queryOrAdd=="add"){
				$($(".orgCodeClass")[0]).val(treeNode.orgCode);
				$($(".orgCodeClass")[0]).attr("parentOrgPath",treeNode.orgPath);
				$($(".orgCodeClass")[0]).attr("parentOrgId",treeNode.id);
				$($(".orgCodeClass")[0]).attr("parentOrgName",treeNode.text);
				$($(".orgIdClass")[0]).val(treeNode.id);
				$($(".orgNameClass")[0]).val(treeNode.text);
				$($(".orgPathClass")[0]).val(treeNode.orgPath);
			}
			
			if(queryOrAdd=="query"){
				$($(".queryOrgCodeClass")[0]).val(treeNode.orgCode);
				$($(".queryOrgIdClass")[0]).val(treeNode.id);
				$($(".queryOrgNameClass")[0]).val(treeNode.text);
				$($(".queryOrgPathClass")[0]).val(treeNode.orgPath);
			}
			
			OrgId=treeNode.id;
			layer.close(orgLayer);
			$($(input)).focus();
		};
		loadOrgTreeBean_input.loadOrgTree("inputTreeDemo", orgSelect_o,"inputOrgAsyncId");
	};
});
/*queryDevInfoByOrgId*/


    