
/**
 * checkId-输入框的id值
 * patrn-正则表达式
 * msg-输入框label名字
 * sysMsg-提示信息
 * isNull 表示是否要对输入的数据进行判断（false不进行，默认为true）
 * isTime 判断是否为时间
 * @returns
 */
var Check=function(){
	this.checkNumber=/^[0-9]+$/;//校验数字
	this.checkNumber6_10=/^[0-9]{6,10}$/;//校验数字
	this.checkNumber8=/^[0-9]{8}$/;//校验8位数字
	this.checkNumber4=/^[0-9]{4}$/;//校验4位数字
	this.checkNumber9=/^[0-9]{9}$/;//校验9位数字  机构编码
	this.checkString512="^.{1,512}$";//校验1到512位字符
	this.checkString256="^.{1,256}$";//校验1到256位字符
	this.checkString100="^.{1,100}$";//校验1到100位字符
	this.checkString64="^.{1,64}$";//校验1到64位字符
	this.checkString50="^.{1,50}$";//校验1到50位字符
	this.checkString32="^.{1,32}$";//校验1到16位字符
	this.checkString30=/^.{6,30}$/;//校验1到16位字符
	this.checkString15="^.{7,15}$";//7-15位字符  
	this.checkString1="^.{0,1}$";//0-1位字符  
	this.checkxiaoshu="^0\.[1-9]\d*$";//0-1的小数
	this.checkBankCardNumber=/^(\d{16}|\d{19})$/;//19位银行卡号
	this.checkNumberString="^(\\w){1,32}$";//校验数字字母下划线
	this.checkCN=/^[\u4e00-\u9fa5]+$/;//校验汉字
	this.checkPassword=/^(?![^a-zA-Z]+$)(?!\D+$).{6,10}/;//校验密码 包含数字和字母
	this.checkorgCode="[0-9]{1,20}";
	this.checkEN=/^[a-zA-Z]+$/;//检验英文
	this.checkEmail=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;//校验email	
	this.checkMobilePhone=/^[1][3458][0-9]{9}$/;//校验手机号码
	this.checkFax=/^(\d{3,4}-)?\d{7,8}$/;//校验传真
	this.checkID=/^(\d{15}|\d{18})$/;//校验身份证
	this.checkAccount=/^[a-zA-Z0-9]{1,30}$/;//校验序列号
	this.checkPwd="^[a-zA-Z]|[0-9]|[a-zA-Z0-9]\\w{6,17}$";//校验密码
	this.checkDate="^\\d{4}-\\d{1,2}-\\d{1,2}";//校验日期
	this.checkChar=/^[\u4E00-\u9FA5A-Za-z\d-]{1,100}$/;//校验汉字字母数字
	this.checkCode=/^[A-Z_]{1,20}$/;//校验状态码
	this.checkCode20=/^[a-zA-Z0-9]{1,20}$/;//校验数字 字母
	this.checkIP=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;//校验ip	
	this.checkNoCN = /^[^\u4e00-\u9fa5]{0,}$/;
	var msgUrlNo="../UI/img/cross.png";
	var msgUrlYes="../UI/img/tick.png";
	var childMsgUrlNo="../../UI/img/cross.png";
	var childMsgUrlYes="../../UI/img/tick.png";
	this.testRate=/^[1-9]{0,1}[0-9]{1}\.[0-9]{4}$/;//校验利率，保留四位小数11.3000
	
	this.onCheck=function(checkObj){
		var isTime=false;
		var checkId;
		var patrn;
		var msg;
		var sysMsg;
		var result=true;
		var isNull;
		var rules;
		checkId=checkObj.checkId;
		isNull=true;
		var noTitleMsg = "";
		if(checkObj.isTime!=null||checkObj.isTime!=undefined){
			isTime=checkObj.isTime;
		}
		if(checkObj.msgUrl!=null||checkObj.msgUrl!=undefined){
			msgUrlNo=childMsgUrlNo;
			msgUrlYes=childMsgUrlYes;
		}
		if(checkObj.isNull!=null||checkObj.isNull!=undefined){
			isNull=checkObj.isNull;
		}
		if(checkObj.patrn!=null){
			patrn=checkObj.patrn;
			
		}
		if(checkObj.sysMsg!=null){
			sysMsg=checkObj.sysMsg;
		}
		if(checkObj.msg!=null){
			msg=checkObj.msg;
		}
		if(checkObj.rules!=null||checkObj.rules!=undefined){
			rules=checkObj.rules;
		}
		if(checkObj.pagePath!=null){
			msgUrlNo = checkObj.pagePath+"UI/img/cross.png";
			msgUrlYes = checkObj.pagePath+"UI/img/tick.png";
		}
		
		var checkParam= $("#"+checkId).val();
		if(checkParam==null||checkParam==''){
			if(isNull){//是否判断输入框为空
				util.sysTips(msg+"信息不能为空！",checkId);
				sysMsg=msg+"信息不能为空！";
					result=false;
			}else{
				 result=true;
			}
		
		}else if(isTime){
			result=false;
		}
		else{
			result = true;
			if(rules != null){
				for(var i=0;i<rules.length;i++){
					var reg =rules[i].patrn;
					if(!reg.test(checkParam)){//进行正则表达判断
						util.sysTips(rules[i].sysMsg,checkId);
						noTitleMsg = rules[i].sysMsg;
						result=false;
					}else{
						
					}
				}
			}
			
		}
		var id=checkId+"Img";
		
		$("#"+id).remove();
		$("#"+checkId).removeClass("input_check_no");
		$("#"+checkId).addClass("input_check_ok");
		var str_model='<i id="'+id+'"><img  class="tick" alt="tick" src="'+msgUrlYes+'"></i>';
		var $str=$(str_model);
		$("#"+checkId).after($str);
		if(!result){
			$("#"+id).remove();
			$("#"+checkId).removeClass("input_check_ok");
			$("#"+checkId).addClass("input_check_no");
			 str_model='<i id="'+id+'"><img title="'+noTitleMsg+'" class="cross" alt="cross" src="'+msgUrlNo+'"></i>';
			 $str=$(str_model);
			$("#"+checkId).after($str);
		}
		return result;
	};
	
	/**
	 * 清除正则表达式判断
	 */
	this.clear=function(id){
		var idImg=id+"Img";
		$("#"+idImg).remove();
		$("#"+id).removeClass("input_check_ok");
		$("#"+id).removeClass("input_check_no");
	};
	//-------------------------------添加中的产品信息管理---------------------------------------------

	this.checkTime=function(startId,endId){
		var result=true;
		var sysMsg="时间格式不正确！";
		/**
		 *开售时间（saleStartTime）
		 */
		checkSaleStartTime=function(sysMsg){
			
			var patrn=checkDate;
			var checkId=startId;
			var checkObj={};
			checkObj["isTime"]=true;
			checkObj["patrn"]=patrn;
			checkObj["sysMsg"]=sysMsg;
			checkObj["checkId"]=checkId;
			checkObj["isNull"]=false;
			result=check.onCheck(checkObj);
			return result;
		};
		/**
		 *停售时间（saleEndTime）
		 */
		checkSaleEndTime=function(sysMsg){
		
			var patrn=checkDate;
			var checkId=endId;
			var checkObj={};
			checkObj["isTime"]=true;
			checkObj["patrn"]=patrn;
			checkObj["sysMsg"]=sysMsg;
			checkObj["checkId"]=checkId;
			checkObj["isNull"]=false;
			result=check.onCheck(checkObj);
			return result;
		};
		var startVal=$("#"+startId).val();
		var endVal= $("#"+endId).val();
		
		if(startVal !=''&&endVal!=''&&result){
			if(startVal>=endVal){
				sysMsg="结束时间要大于开始时间！";
				checkSaleStartTime(sysMsg);
				checkSaleEndTime(sysMsg);
				return false;
			}
		}
		return true;
	};
};

var check =new Check();
