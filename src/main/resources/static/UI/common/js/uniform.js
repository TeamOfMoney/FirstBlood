var EmmFormStyle = function(){
	
	/**
	 * 外部用
	 */
	this.setCheckboxClass = function(checkboxClass){
		var emmCheckbox = $("."+checkboxClass);
		$(emmCheckbox).each(function(index,ele){
			if($(this).is(":checked")){
				$(this).parent().addClass("checked");
			}else{
				$(this).parent().removeClass("checked");
			}
		});
	};
	
	
	/**
	 * 设置radio样式
	 */
	
};