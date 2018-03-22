(function ($) {
	var checkForm={
		data:{
				root:{},
				path:'',
				form:'',
				Password1:'',
				//图片路径
				img_error: "/UI/img/cross.png",
				img_success: "/UI/img/tick.png",
				
				//提示信息
				tips_success: '', //验证成功时的提示信息，默认为空
				tips_required: '不能为空',
				tips_English: '请输入英文字符',
				tips_Chinese: '请输入中文字符',
				tips_Number: '请输入1-10的数字',
				tips_MobilePhone: '请输入正确的移动号码',
				tips_Number8: '请输入0~9的8位数字',
				tips_Account: '请输入1-30个字母和数字',
				tips_Ip: '请输入正确的IP地址！',
				tips_Number9: '请输入0~9的9位数字',
				tips_pwdrule: '限6~10个字母和数字',
				tips_pwdequal: '两次密码不一致',
				tips_FixedPhone: '请输入正确的固定电话',
				tips_Email: '请输入电子邮箱',
				tips_Fax: '请输入正确的传真',
				tips_BankCardNumber: '请输入银行卡号',
				tips_IDCard2: '请输入正确身份证号',
				tips_NOChinese: '请勿输入中文',
				tips_Number4: '请输入4位数字',
				tips_NumberNoZero:'请输入数字，数字不能是0',
				tips_EnOrNum : '请输入字母或数字',
				tips_Minutes: '请输入0~59的整数分钟',
				tips_Hours:'请输入0~23的整数小时',
				tips_EnOrChinese:'请输入英文或中文',
				tips_EnOrChineseOrNum:'请输入英文或中文或数字',
				
				
				//正则
				reg_English: /^[a-zA-Z]+$/, //验证英文
				reg_Chinese: /^[\u4e00-\u9fa5]+$/,//验证中文 
				reg_Number:/^[0-9]+$/, //校验数字
				reg_EnOrNum:/^[a-zA-Z0-9]+$/,//字母或数字
				reg_NumberNoZero:/^[1-9]\d*$/, //校验数字大于0
				reg_MobilePhone: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,//校验手机号码
				reg_Number8:/^[0-9]{8}$/,//校验8位数字
				reg_Account:/^[a-zA-Z0-9]{1,30}$/,//校验序列号
				reg_Ip:/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,//校验ip	
				reg_Number9:/^[0-9]{9}$/,//校验9位数字  机构编码
				reg_Password:/^(?![^a-zA-Z]+$)(?!\D+$).{6,10}/,//校验密码 包含数字和字母
				reg_FixedPhone:/^0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}/,//校验固定电话
				reg_Email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,//校验email	
				reg_Fax:/^(\d{3,4}-)?\d{7,8}$/,//校验传真
				reg_BankCardNumber:/^(\d{16}|\d{18}|\d{19})$/,//19位银行卡号
				reg_IDCard2:/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,//18位数身份证验证
				reg_NOChinese:/^[^\u4e00-\u9fa5]+$/,//校验不包含中文
				reg_Number4:/^[0-9]{4}$/,//校验4位数字
				reg_Minutes:/^([1-5]?\d)$/,//校验分钟，范围是0~59
				reg_Hours:/^(1?[0-9]|2[0-3])$/,//校验小时，范围是0--23
				reg_EnOrChinese:/^[a-zA-Z\u4e00-\u9fa5]+$/,
				reg_EnOrChineseOrNum:/^[0-9a-zA-Z\u4e00-\u9fa5]+$/
		},
		fun:{
			init:function(options){
				 $.extend(checkForm.data, options);
				 checkForm.data.root[checkForm.data.form]=$("#"+checkForm.data.form);
				 $(":text,select,textarea,:password", checkForm.data.root[checkForm.data.form]).each(function () {
					 	var tid;
			            $(this).blur(function () {
			            	var o=$(this);
			            	tid=setTimeout(function(){
			            		checkForm.data.root[checkForm.data.form].focus();
				                var _validate = o.attr("check"); //获取check属性的值
				                if (_validate) {
				                    var arr = _validate.split(' '); //用空格将其拆分成数组
				                    for (var i = 0; i < arr.length; i++) {
				                        //逐个进行验证，不通过跳出返回false,通过则继续
				                        if (!checkForm.fun.check(o, arr[i], o.val()))
				                            return false;
				                        else
				                            continue;
				                    }
				                }
			            	},300);
			            });
			            $(this).focus=(function () {
			            	clearTimeout(tid);
			            	});
			        });
				},
			onSubmit:function(formId){
				var isok = true;
	            $(":text:visible,select:visible,textarea:visible,:password:visible", checkForm.data.root[formId]).each(function () {
	            	var _validate = $(this).attr("check");
	                if (_validate) {
	                    var arr = _validate.split(' ');
	                    for (var i = 0; i < arr.length; i++) {
	                        if (!checkForm.fun.check($(this), arr[i], $(this).val())) {
	                            isok = false; //验证不通过阻止表单提交，开关false
	                            return; //跳出
	                        	}
	                    	}
	                	}
	            	});
	            return isok;
				},
				check: function (obj, _match, _val) {
		            switch (_match) {
		            case 'required':
		                return jQuery.trim(_val) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_required, false);
		            case 'English':
		                return chk(_val, checkForm.data.reg_English) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_English, false);
		            case 'Chinese':
		                return chk(_val, checkForm.data.reg_Chinese) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Chinese, false);
		            case 'Number':
		                return chk(_val, checkForm.data.reg_Number) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Number, false);
		            case 'MobilePhone':
		                return chk(_val, checkForm.data.reg_MobilePhone) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_MobilePhoner, false);
		            case 'Number8':
		                return chk(_val, checkForm.data.reg_Number8) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Number8, false);
		            case 'Account':
		                return chk(_val, checkForm.data.reg_Account) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Account, false);
		            case 'Ip':
		                return chk(_val, checkForm.data.reg_Ip) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Ip, false);
		            case 'Number9':
		                return chk(_val, checkForm.data.reg_Number9) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Number9, false);
		            case 'Password1':
		            	Password1 = _val;
		                return chk(Password1, checkForm.data.reg_Password) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_pwdrule, false);
		          case 'Password2':
	                    return pwdEqual(_val, Password1) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_pwdequal, false);
	                case 'FixedPhone':
		                return chk(_val, checkForm.data.reg_FixedPhone) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_FixedPhone, false);
	                case 'Email':
		                return chk(_val, checkForm.data.reg_Email) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Email, false);
	                case 'Fax':
		                return chk(_val, checkForm.data.reg_Fax) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Fax, false);
	                case 'BankCardNumber':
		                return chk(_val, checkForm.data.reg_BankCardNumber) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_BankCardNumber, false);
	                case 'IDCard2':
		                return chk(_val, checkForm.data.reg_IDCard2) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_IDCard2, false);
	                case 'NOChinese':
		                return chk(_val, checkForm.data.reg_NOChinese) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_NOChinese, false);
	                case 'Number4':
		                return chk(_val, checkForm.data.reg_Number4) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Number4, false);
	                case 'NumberNoZero':
		                return chk(_val, checkForm.data.reg_NumberNoZero) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_NumberNoZero, false);
	                case 'EnOrNum':
		                return chk(_val, checkForm.data.reg_EnOrNum) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_EnOrNum, false);
	                case 'Minutes':
	                	return chk(_val, checkForm.data.reg_Minutes) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Minutes, false);
	                case 'Hours':
	                	return chk(_val, checkForm.data.reg_Hours) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_Hours, false);
	                case 'EnOrChinese':
	                	return chk(_val, checkForm.data.reg_EnOrChinese) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_EnOrChinese, false);
	                case 'EnOrChineseOrNum':
	                	return chk(_val, checkForm.data.reg_EnOrChineseOrNum) ? showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, defaults.tips_EnOrChineseOrNum, false);
	                default:
		                return true;
	            	}
				},
				
		    //判断两次密码是否一致(返回bool值)
		    pwdEqual:function(val1, val2) {
		            return val1 == val2 ? true : false;
		        },
				
			chk:function (str, reg) {
					if(str=="" || str==undefined){
						return true;
					}
					return reg.test(str);
				},
			check:function (obj, _match, _val) {
	            switch (_match) {
	            case 'required':
	                return jQuery.trim(_val) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_required, false);
	            case 'English':
	                return checkForm.fun.chk(_val, checkForm.data.reg_English) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_English, false);
	            case 'Chinese':
	                return checkForm.fun.chk(_val, checkForm.data.reg_Chinese) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Chinese, false);
	            case 'Number':
	                return checkForm.fun.chk(_val, checkForm.data.reg_Number) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Number, false);
	            case 'MobilePhone':
	                return checkForm.fun.chk(_val, checkForm.data.reg_MobilePhone) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_MobilePhone, false);
	            case 'Number8':
	                return checkForm.fun.chk(_val, checkForm.data.reg_Number8) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Number8, false);
	            case 'Account':
	                return checkForm.fun.chk(_val, checkForm.data.reg_Account) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Account, false);
	            case 'Ip':
	                return checkForm.fun.chk(_val, checkForm.data.reg_Ip) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Ip, false);
	            case 'Number9':
	                return checkForm.fun.chk(_val, checkForm.data.reg_Number9) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Number9, false);
	            case 'FixedPhone':
	                return checkForm.fun.chk(_val, checkForm.data.reg_FixedPhone) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_FixedPhone, false);
	            case 'Email':
	                return checkForm.fun.chk(_val, checkForm.data.reg_Email) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Email, false);
	            case 'Fax':
	                return checkForm.fun.chk(_val, checkForm.data.reg_Fax) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Fax, false);
	            case 'Password1':
	            	Password1 = _val;
	                return checkForm.fun.chk(Password1, checkForm.data.reg_Password) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_pwdrule, false);
	            case 'Password2':
	                return checkForm.fun.pwdEqual(_val, Password1) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_pwdequal, false);
	            case 'BankCardNumber':
	                return checkForm.fun.chk(_val, checkForm.data.reg_BankCardNumber) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_BankCardNumber, false);
	            case 'IDCard2':
	                return checkForm.fun.chk(_val, checkForm.data.reg_IDCard2) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_IDCard2, false);
	            case 'NOChinese':
	                return checkForm.fun.chk(_val, checkForm.data.reg_NOChinese) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_NOChinese, false);
	            case 'Number4':
	                return checkForm.fun.chk(_val, checkForm.data.reg_Number4) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Number4, false);
	            case 'NumberNoZero':
	                return checkForm.fun.chk(_val, checkForm.data.reg_NumberNoZero) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_NumberNoZero, false);
	            case 'EnOrNum':
	                return checkForm.fun.chk(_val, checkForm.data.reg_EnOrNum) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_EnOrNum, false);
	            case 'Minutes':
                	return checkForm.fun.chk(_val, checkForm.data.reg_Minutes) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Minutes, false);
                case 'Hours':
                	return checkForm.fun.chk(_val, checkForm.data.reg_Hours) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_Hours, false);
                case 'EnOrChinese':
                	return checkForm.fun.chk(_val, checkForm.data.reg_EnOrChinese) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_EnOrChinese, false);
                case 'EnOrChineseOrNum':
                	return checkForm.fun.chk(_val, checkForm.data.reg_EnOrChineseOrNum) ? checkForm.fun.showMsg(obj, checkForm.data.tips_success, true) : checkForm.fun.showMsg(obj, checkForm.data.tips_EnOrChineseOrNum, false);
	            default:
	                return true;
	            }
	        },
			showMsg:function (obj, msg, mark) {
	            $(obj).next("#errormsg").remove();//先清除
	            var _html = "<span id='errormsg' style='font-size:13px;color:red;background:url(" +checkForm.data.path+ checkForm.data.img_error + ") no-repeat 0 -1px;padding-left:20px;margin-left:5px;'>" + msg + "</span>";
	            if (mark)
	                _html = "<span id='errormsg' style='font-size:13px;color:gray;background:url(" +checkForm.data.path+ checkForm.data.img_success + ") no-repeat 0 -1px;padding-left:20px;margin-left:5px;'>" + msg + "</span>";
	            $(obj).after(_html);//再添加
	            return mark;
	        }
		},
		openFun:function(){
		      return {
		          init:checkForm.fun.init,
		          onSubmit:checkForm.fun.onSubmit,
		          checkProxy:checkForm.fun.checkProxy
		      };
		}
	}
	window.checkForm = checkForm;
})(jQuery);