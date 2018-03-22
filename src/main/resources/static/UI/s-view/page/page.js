var PageClass = function(){

	this.init = function(pageselectCallback,rowNum,total,current_page){
		function change(rowNum){
			var gotoval = $('#gotoval').val();
			var pagecountstr =$("#pagenum").text();
			var pagecount = parseInt(pagecountstr);
			var intval = parseInt(gotoval)-1; //跳转页数
			if (parseInt(gotoval)<0){  
				alert("请输入非零的正整数！");  
				return ;  
			} 
			if(parseInt(gotoval) > pagecount){  
				alert("您输入的页面超过总页数 "+pagecount);  
				return ;  
			}
			$("#Pagination").pagination(total.value,{
				items_per_page:rowNum,
				current_page:intval,
				callback:pageselectCallback
			});
		}
		// 创建分页元素
		$("#Pagination").pagination(total.value, {
			items_per_page:rowNum.value,
			current_page:current_page,
			callback: pageselectCallback
		});
		/*使用下拉列表更改网页显示行数
		*/	
			
		$("#setRownum").change(function(){
			var row = $("#setRownum option:selected").val();
			rowNum.value=row;
			$("#Pagination").pagination(total.value, {
			items_per_page:row,
			callback: pageselectCallback  //回调函数
			});	
		});		
		$("#gotopage").click(function(){
			change(rowNum.value);
		});	
	};
};