var rowNum={value:10};
var total={value:0};

var util = new NT.utilObj.util();

var pageClassBean = new PageClass();
$(function(){
	/**
	 * 切换样式
	 */
	var exchageClass = function(dom,class1,class2){
		var nowClass = $(dom).attr("class");
		if(nowClass==class1){
			$(dom).removeClass(class1);
			$(dom).addClass(class2);
		}else{
			$(dom).removeClass(class2);
			$(dom).addClass(class1);
		}
	};
	
	var navContent = window.parent.mainNavContent;
	if(navContent!=null){
		$("#parentNavName").html(navContent.parentName);
		$("#thisNavName").html(navContent.thisName);
	}
	
	$("#updownarea").click(function(){
		$("#queryForm").slideToggle("fast",function(){
			var i0 = $("#updownarea").find("i")[0];
			exchageClass(i0,"glyphicon glyphicon-chevron-down","glyphicon glyphicon-chevron-up");
		}); 
	});
});



/**
 * 表格对象
 */
var NTGridBean = function (){
	var url;
	var headParam = [];
	var queryParam = {};
	var headFormat = {};
	var defaultBtns ;
	var operateBtns = [];
	var pk ;
	var columnValue;
	var page;
	var loadComplete;
	var checkboxSingle;
	var checkboxAll;
	var checked=true;
	
	//默认操作按钮
	var viewBtnHtml = 	'<button class="btn btn-sm btn-success"  onclick="viewBtn(this)" title="详情">' +
							' <i class="glyphicon glyphicon-file"></i> </button>';
	
	var editBtnHtml = 	'<button class="btn btn-sm btn-primary" onclick="editBtn(this)" title="编辑">' +
							' <i class="glyphicon glyphicon-pencil"></i> </button>';
	
	var removeBtnHtml = '<button class="btn btn-sm btn-danger" onclick="removeBtn(this)" title="删除">' +
							' <i class="glyphicon glyphicon-trash"></i> </button>';
	
	
	
	
	this.init = function(gridObj){
		
		url = gridObj.url;
		headParam = gridObj.headParam;
		
		if(gridObj.queryParam!=null&&gridObj.queryParam!=""){
			queryParam = gridObj.queryParam;
		}
		defaultBtns = gridObj.defaultBtns;
		operateBtns = gridObj.operateBtns;
		pk = gridObj.pk;
		columnValue=gridObj.columnValue;
		page = gridObj.page;
		if(gridObj.loadComplete!=null){
			loadComplete = gridObj.loadComplete;
		}
		if(gridObj.headFormat!=null){
			headFormat = gridObj.headFormat;
		}
		
		if(gridObj.checkboxSingle!=null){
			checkboxSingle = gridObj.checkboxSingle;
		}
		
		if(gridObj.checkboxAll!=null){
			checkboxAll = gridObj.checkboxAll;
		}
		
		if(gridObj.checked!=null){
			checked=gridObj.checked;
		}
		
	};
	
	this.loadGrid = function(){
		pageClassBean.init(queryListData,rowNum,total,0);
	};
	

	/**
	 * 查询数据列表
	 */
	var queryListData = function(page_id,drawLinks){
		var param = queryParam;
		if(page&&page_id!=null){
			var currentPage = parseInt(page_id); //跳转页数
			param["page"] = currentPage;
			param["size"] = rowNum.value;
		}else{
			param["page"] = "0";
			param["size"] = rowNum.value;
			
		}
		if(!page){
			param["page"] = "0";
			param["size"] = "0";
			$($(".table-foot")[0]).hide();
		}
		
		util.emmAjax({
			url : url,
			data : param,
			success : function(data) {
				var object = util.str2Json(data);
				if(object!="false"){
					total.value = object.number;
					initGrid(object);
					if(typeof drawLinks == 'function'){
						drawLinks(total.value);
					};
					resetCheckboxAll();
				}else{
					alert(object.data);
				}
				
			}
		});
	};
	
	/**
	 * 获得操作按钮
	 */
	var getAllOperateBtns = function(){
		var allOprateBtns = [];
	    
	    if(defaultBtns.viewBtn!=null&&defaultBtns.viewBtn=="show"){
	    	allOprateBtns.push({'btnName':'viewBtn','text':viewBtnHtml});
	    }
	    
	    if(defaultBtns.editBtn!=null&&defaultBtns.editBtn=="show"){
	    	allOprateBtns.push({'btnName':'editBtn','text':editBtnHtml});
	    }
	    
	    if(defaultBtns.removeBtn!=null&&defaultBtns.removeBtn=="show"){
	    	allOprateBtns.push({'btnName':'removeBtn','text':removeBtnHtml});
	    }
	    
	    for(var i=0;i<operateBtns.length;i++){
	    	allOprateBtns.push({'btnName':operateBtns[i].btnName,'text':operateBtns[i].text});
	    }
		
		return allOprateBtns;
	};
	
	/**
	 * 获得操作按钮html
	 * 
	 */
	var getAllOperateBtnsHtml = function(){
		var allOprateBtns = getAllOperateBtns();
		var html = "";
		for(var i=0;i<allOprateBtns.length;i++){
			var operateBtn = allOprateBtns[i];
			html +=operateBtn.text+"&nbsp;&nbsp;&nbsp;&nbsp;";
		}
		return html;
	};
	
	
	/**
	 * 获得空格行
	 */
	
	var getBlankTr = function(trLength){
		var blankTr = "<tr class='spacetr'>";
		blankTr+="<td><div class='checker'><span><input type='checkbox' class='uniform emmCheckbox'/></span></div></td>";
		
		var operateHtml = getAllOperateBtnsHtml();
		if(operateHtml!=null&&operateHtml!=""){
			
		}else{
			trLength = trLength-1;
		}

		
		for(var i=0;i<=trLength;i++){
			var td = "<td><div></div></td>";
			blankTr += td;
		}
		blankTr += "</tr>";
		return blankTr;
	};
	
	/**
	 * 生成表格的body的字符串
	 */
	var getTbodyStr = function(data){
		var allOprateBtns = getAllOperateBtns();
		var tbodyStr = "";
		$(data).each(function(index,ele){
			var tr = "<tr pk='"+ele[pk]+"' columnValue='"+ele[columnValue]+"'  style='border:solid red 1px'>";
			if(checked==true)
			tr = tr+"<td style='width:30px;'><div class='checker'><span><input type='checkbox' class='uniform emmCheckbox'/></span></div></td>";
			
			for(var i=0;i<headParam.length;i++){
				
				var headFieldName=headParam[i].split(".");
				var strVal;
				strVal=ele[headFieldName[0]];
				for(var j=1;j<headFieldName.length;j++){
					strVal=strVal[headFieldName[j]];
				}
				//var strVal = ele[headParam[i]];
				var strFormat = headFormat[headParam[i]];
				if(strFormat!=null){
					strVal = strFormat(strVal);
				}
				if(strVal==null){
					strVal="";
				}
				var td = "<td><div>"+strVal+"</div></td>";
				tr += td;
			}
	
			var allOprateBtns = getAllOperateBtns();
			var width = allOprateBtns.length*50
			var operateHtml = getAllOperateBtnsHtml();
			if(operateHtml!=null&&operateHtml!=""){
				tr += "<td style='width:"+width+"px;'><div style='width:"+width+"px;'>"+operateHtml+"</div></td>";
			}
			
			tr += "</tr>";
			
			tbodyStr += tr;
			//alert(tr);
		});
		
		if(data.length==0){
			var length = headParam.length+2;
			tbodyStr = "<tr><td colspan='"+length+"'  align='center'>暂无记录</td></tr>";
		}
		return tbodyStr;
	};

	/**
	 * 加载表格数据
	 */
	var initGrid = function(object){
		var data = object.data;
		if(data){
			var dataListHtml = getTbodyStr(data);
			$("#dataList").html(dataListHtml);
			initStyle();
			if(loadComplete!=null){
				loadComplete();
			}
		}
	};
	
	/**
	 * 处理批量选中
	 */
	var operateCheckboxAll = function(tableId){
		var checkboxAllRet = $("#"+tableId).find("thead").find("input[name='checkboxAll']");
		var checkboxs = $("#"+tableId).find("tbody").find("input[type='checkbox']");
		$(checkboxAllRet).change(function(){
			if($(this).is(":checked")){
				$(checkboxs).each(function(index,ele){
					if($(ele).attr("disabled")!="disabled"){
						$(ele).prop("checked",true);
					}
				});
				
			}else{
				$(checkboxs).each(function(index,ele){
					if($(ele).attr("disabled")!="disabled"){
						$(ele).prop("checked",false);
					}
				});
			}
			
			var emmFormStyle = new EmmFormStyle();
			emmFormStyle.setCheckboxClass("emmCheckbox");
			if(checkboxAll!=null){
				checkboxAll(checkboxAllRet);
			}
			
		});
		
		
		
	};
	
	/**
	 * 处理单个选中
	 */
	var operateCheckboxSingle = function(tableId){
		var checkboxs = $("#"+tableId).find("tbody").find("input[type='checkbox']");
		$(checkboxs).change(function(){
			var emmFormStyle = new EmmFormStyle();
			emmFormStyle.setCheckboxClass("emmCheckbox");
			if(checkboxSingle!=null){
				checkboxSingle(this);
			}
		});
	};
	
	/**
	 * 分页时重置表头复选框
	 */
	var resetCheckboxAll = function(){
		var checkboxAll = $("#table").find("thead").find("input[name='checkboxAll']");
		$(checkboxAll[0]).prop("checked",false);
		var emmFormStyle = new EmmFormStyle();
		emmFormStyle.setCheckboxClass("emmCheckbox");
	};
	
	
	/**
	 * 设置样式
	 */
	var initStyle = function(){
		var fixedTheadTable = new FixedTheadTable();
		fixedTheadTable.setTheadTtable("table");
		
		operateCheckboxAll("table");
		operateCheckboxSingle("table");
		
	};
	
};