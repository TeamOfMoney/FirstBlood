
var util = new NT.utilObj.util();

$(function(){
	$("#resetQueryForm").click(function(){
		var form = $("#queryGridForm");
		form[0].reset();
		
	});
});

var OpeateClass = function(){
	/**
	 * 查询详情
	 */
	this.viewData = function(url,param,successFun){
		util.emmAjax({
			url : url,
			data : param,
			success : function(data) {
				var obj = eval("(" + data + ")"); 
				if(obj.success=='true')
					{
						successFun(data);
					}
				else {
					util.sysAlert(obj.data);
				}
				
			}
		});
	};
	
	/**
	 * 增加数据
	 */
	this.addData = function(url,param,successFun,msg){
		var add = function(){
			util.emmAjax({
				url : url,
				data : param,
				success : function(data) {
					var obj = eval("(" + data + ")"); 
					if(obj.success=='true')
						{
							if(msg==null){util.sysAlert("新增成功");}
								else{util.sysAlert(msg);}
							successFun();
						}
						else {
						util.sysAlert(obj.data);
						}
					
					
				}
			});
		};
		util.confirmView(add,"确定保存吗?");
	};
	
	/**
	 * 编辑数据
	 */
	this.editData = function(url,param,successFun,msg){
		var edit = function(){
			util.emmAjax({
				url : url,
				data : param,
				success : function(data) {
					var obj = eval("(" + data + ")"); 
					if(obj.success=='true')
						{
							if(msg==null){util.sysAlert("编辑成功");}
							else{util.sysAlert(msg);}
							successFun();
						}else {
						util.sysAlert(obj.data);
						}
				}
			});
		};
		util.confirmView(edit,"确定保存吗?");
	};
	
	/**
	 * 删除数据
	 */
	this.removeData = function(url,param,successFun,msg){
		var remove = function(){
			util.emmAjax({
				url : url,
				data : param,
				success : function(data) {
					var obj = eval("(" + data + ")"); 
					if(obj.success=='true')
						{
							if(msg==null){util.sysAlert("删除成功");}
							else{util.sysAlert(msg);}
							successFun();
						}else {
							util.sysAlert(obj.data);
							}
				}
			});
		};
		util.confirmView(remove,"确定删除吗?");
	};
	
};

var operateUtil = new OpeateClass();
