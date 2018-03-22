
/**
 * url 需要获取的后台请求路径
 * id  下拉选择框的select的id值
 * param 需要传到后台的参数
 * valueParam option属性里面的value值
 * htmlParam  option里面显示的值
 * selectedParam  下拉选择框默认的选择的值
 * @returns
 */
var SelectOption=function(){
	var url;
	var id;
	var param=[];
	var valueParam;
	var htmlParam;
	var selectedParam;
	var str_model;
	var defaultSelectedValue;
	this.loadOption = function(selectObj) {
		url=selectObj.url;
		id='#'+selectObj.id;
		param=selectObj.param;
		htmlParam=selectObj.htmlParam;
		valueParam=selectObj.valueParam;
		selectedParam=selectObj.selectedParam;
		defaultSelectedValue = selectObj.defaultSelectedValue;
		util.emmAjax({
			url : url,
			type : 'post',
			data : param,
			cache : false,
			dataType : 'text',
			success : function(data) {
				var obj = util.str2Json(data).data;
				$(id).append('<option value="">请选择</option>');
				for(var i=0;i<obj.length;i++){
					var value=obj[i][valueParam];
					var html=obj[i][htmlParam];	
			
						if(selectedParam==html){
							str_model='<option selected="selected" style="background-color:#ccc" value='+value+'>'+html+'</option>';
						}else{
							str_model='<option value='+value+'>'+html+'</option>';
						}
						var $str=$(str_model);
						$(id).append($str);
					}
				if(defaultSelectedValue!=null){
					$(id).find("option[value='"+defaultSelectedValue+"']").attr("selected",true);
				}
				
			}
		});
	};
	/**
	 * 清空选择框里面的值
	 */
	this.clear=function(id){
		$('#'+id).empty();
	}
}