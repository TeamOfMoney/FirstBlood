
/**
 *替换字符串中制定字符串
 */
String.prototype.replaceAll = function(s1,s2){    
			return this.replace(new RegExp(s1,"gm"),s2);    
		};
		
String.prototype.endWith=function(endStr){
			  var d=this.length-endStr.length;
			  return (d>=0&&this.lastIndexOf(endStr)==d)
			}

String.prototype.startWith=function(s){
	if(s==null||s==""||this.length==0||s.length>this.length)
		   return false;
		  if(this.substr(0,s.length)==s)
		     return true;
		  else
		     return false;
		  return true;
	}

/*定义数组Contains方法*/
Array.prototype.contains = function(obj) {
	  var i = this.length;
	  while (i--) {
	    if (this[i] === obj) {
	      return true;
	    }
	  }
	  return false;
	}
		
var utilObj = NT.namespace("utilObj");	

utilObj.util = function(){
	/**
	 *将json字符串转化为json对象
	 */
	this.str2Json = function(jsonStr){
		var json = eval("(" + jsonStr + ")"); 
		return json;
	};
	
	/**
	 * 将json对象变为json字符串
	 */
	
	this.json2str = function(jsonObj){
		var str = JSON.stringify(jsonObj); 
		return str;
	};

	/**
	 * 
	 *函数功能：从href获得参数
	 *sHref:   http://www.cscenter.com.cn/arg.htm?arg1=d&arg2=re
	 *sArgName:arg1, arg2
	 *return:  the value of arg. d, re
	 */
	this.GetArgsFromHref = function(sHref, sArgName)
	{
		var args  = sHref.split("?");
		var retval = "";
		
		if(args[0] == sHref) /*参数为空*/
		{
			 return retval; /*无需做任何处理*/
		}  
		var str = args[1];
		args = str.split("&");
		for(var i = 0; i < args.length; i ++)
		{
			str = args[i];
			var arg = str.split("=");
			if(arg.length <= 1) continue;
			if(arg[0] == sArgName) retval = arg[1]; 
		}
		return retval;
	}

	/**
	 *loading加载(提供给外部调用)
	 */
	this.index;
	this.loading = function (){
		//loading层
		 index = layer.load(2, {
			shade: [0.5,'#fff'],//0.1透明度的白色背景
			offset:'60px'
		});	
	};

	/**
	 *关闭loading(提供给外部调用)
	 */
	this.closeLoading = function(){
		layer.closeAll();
	};
	
	/**
	 * layer弹出框提示(提供给外部调用)
	 */
	this.sysAlert = function(msg){
		layer.alert(msg, {skin: 'layer-ext-myskin',offset:'60px' });
	};
	
	
	/**
	 * layer tips 提示框(供给外部使用)
	 */
	this.sysTips = function(msg,id){
		layer.tips(msg, '#'+id,{
			tips: [2, '#FB3838'],
		    time: 2000
		});
	};
	
	this.deleteView = function(fun){
		var delteViewLayer = layer.confirm('确定删除吗？',{'title':'温馨提示',offset:'60px',
		    btn: ['确定','取消'] 
		}, function(){
		    fun();
		    layer.close(delteViewLayer);
		}, function(){
		    
		});
	};
	
	this.confirmView = function(fun,msg){
		var confirmViewLayer = layer.confirm(msg,{'title':'温馨提示',offset:'60px',
		    btn: ['确定','取消'] 
		}, function(){
		    fun();
		    layer.close(confirmViewLayer);
		}, function(){
		    
		});
	};
	
	this.msg = function(msg){
		layer.msg(msg,{offset: '20px'});
	};
	
	
	
	/**
	 *loading加载(内部使用)
	 */
	var index;
	var loading = function (){
		//loading层
		 index = layer.load(2, {
			shade: [0.5,'#fff'], //0.1透明度的白色背景
			offset:'60px'
		});	
	};

	/**
	 *关闭loading(内部使用)
	 */
	var closeLoading = function(){
		layer.close(index);
	};
	
	/**
	 * layer弹出框提示(内部使用)
	 */
	var sysAlert = function(msg){
		layer.alert(msg, {skin: 'layer-ext-myskin' ,offset:'60px'});
	};
	
	/**
	 * ajax失败页面请求处理
	 */
	var errorFun = function(response, textStatus, errorThrown){
		if(response.status == "555")
		{
			sysAlert(response.responseText);
		}
		else if(response.status == "556")
		{
			sysAlert(response.responseText);
		}
		else
		{
			sysAlert('网络故障');
		}
	};
	
	/**
	 * ajax 请求
	 */
	
	this.emmAjax = function(paramObj){
		$.ajaxSettings.traditional=true;
		$.ajax( {    
		    url:paramObj.url,      
		    type:paramObj.type==null?"POST":paramObj.type,    
		    cache:paramObj.cache==null?false:paramObj.cache,
		    dataType:paramObj.dataType==null?"text":paramObj.dataType,
		    timeout:paramObj.timeout==null?30000:paramObj.timeout,
		    data:paramObj.data,
		    loading : paramObj.loading==null?true:paramObj.loading,
		    beforeSend:function(){
		    	if(paramObj!=null){
		    		paramObj.beforeSend;
		    	}
		    	if(paramObj.loading==null||paramObj.loading==true){
		    		loading();
		    	}
				
		    },		    
		    success:paramObj.success,
		    error : function(XMLHttpRequest, textStatus, errorThrown) {
		    	if(paramObj.error!=null){
		    		paramObj.error();
		    	}else{
		    		errorFun(XMLHttpRequest, textStatus, errorThrown);
		    	}
		    },
		    complete:function(){
		    	if(paramObj.complete!=null){
		    		paramObj.complete();
		    	}
		    	if(paramObj.loading==null||paramObj.loading==true){
		    		 closeLoading();
		    	}
			   
			}
		});
		
	};
	
};
