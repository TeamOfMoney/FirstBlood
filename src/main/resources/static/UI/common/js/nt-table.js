var FixedTheadTable = function(){
	
	var setFixedTable = function(tableContent){
		$(tableContent).find("table:eq(0) thead th").css("position", "relative").css("top", "0px").css("box-size", "border-box").css("border", "1px solid #ddd;").css("background","#DDDDDD");//设置相对定位
		$(tableContent).on('scroll', function () {
	        var top = $(tableContent).scrollTop();
	        if (top > 0) {
	        	$(tableContent).find("table:eq(0)").css("margin-top", "-1px");//覆盖上面的间隙
	        	$(tableContent).find("table:eq(0) thead th").css("top", top + "px");
	        } else {
	        	$(tableContent).find("table:eq(0)").css("margin-top", "-2px");
	            $(tableContent).find("table:eq(0) thead th").css("top", top + "px");
	        }
	    });
	    
	};
	
	/**
	 * 设置表格奇偶样式
	 */
	var setEvenAndOddClass = function(){
		$("tbody tr:even").addClass("even");
		$("tbody tr:odd").addClass("odd");
	};
	
	
	/**
	 * 设置鼠标悬停样式
	 */
	var setHoverClass = function(){
		 $("tbody tr").hover(function(){
			 $(this).addClass("tr-hover");
        },function(){  
        	 $(this).removeClass("tr-hover");
        })  
	};
	
	
	this.setTheadTtable = function(tableId){
		var tableContent = $(".fixed-table-content");
		if(tableContent!=null){
			for(var i=0;i<tableContent.length;i++){
				setFixedTable(tableContent[i]);
			}
		}
		setEvenAndOddClass();
		setHoverClass();
		
	};
};