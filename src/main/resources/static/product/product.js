var util = new NT.utilObj.util();
/*
 * 用户列表显示
 */
var queryGridUrl = "../product/findByCondition.action";

var addDataUrl = "../product/addProduct.action";
var editDataUrl = "../product/updateProduct.action";
var removeDataUrl = "../product/delProduct.action";

var firmOptionUrl = "../firm/queryFirmOptions.action";

/*
 *查询用户资料 
 */
var querDetialUrl = "../product/findById.action";

var nowOperate;

var store_old={};
var store_new={};
function compareStore(){
	var returnValue=1;
	$.each(store_new,function(key,ele){
			
			var valueOld=store_old[key];
			if(ele!=valueOld){
				returnValue=0;
			}
			
		}
	);
	return returnValue;
}

function sortArr(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
				var temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	return arr;
}

/**
 * 加载数据
 */
var loadData = function(){
	var headParam = [];
	headParam.push("productNum");
	headParam.push("productName");
	headParam.push("qsNum");
	headParam.push("gbNum");
	headParam.push("firmName");
	headParam.push("productType");
	//headParam.push("productTech");
	//headParam.push("shelfLife");
	//headParam.push("quantity");
	//headParam.push("ingredient");
	headParam.push("productionDate");
	
	var url = queryGridUrl;
	
	var defaultBtns = {"viewBtn":"show","editBtn":"show","removeBtn":"show"};
	var operateBtns = [];
	var imageBtn = {'btnName':'imageBtn','text':'<button class="btn btn-sm btn-success" onclick="image(this)" title="图片信息">' +
			' <i class="glyphicon glyphicon-camera"></i>' +
			'</button>'};
	operateBtns.push(imageBtn);
	var movieBtn = {'btnName':'movieBtn','text':'<button class="btn btn-sm btn-success" onclick="movie(this)" title="视频信息">' +
			' <i class="glyphicon glyphicon-film"></i>' +
			'</button>'};
	operateBtns.push(movieBtn);
	var querParam = getQueryGridParam();
	
	var gridObj = {};
	gridObj["url"] = url;
	gridObj["headParam"] = headParam;
	gridObj["queryParam"] = querParam;
	gridObj["defaultBtns"] = defaultBtns;
	gridObj["operateBtns"] = operateBtns;
	gridObj["pk"] = "productNum";
	gridObj["page"] = true;
	gridObj["checked"]=false;
	
	var nTGridBean = new NTGridBean();
	nTGridBean.init(gridObj);
	nTGridBean.loadGrid();
};


/**
 * 获得pk
 */
var getPk = function(btn){
	var pk = $(btn).parent().parent().parent().attr("pk");
	return pk;
};

/**
 * 显示模态框
 */
var  showModel = function(){
	resetAddOrEditForm();
	$("#addOrEditModal").modal("show");
//	AddOrEditCheck();
};

/**
 * 关闭模态框
 */
var hideModel = function(){
	$("#addOrEditModal").modal("hide");
};

/**
 * 清空form
 */
var resetAddOrEditForm = function(){
	$("#addOrEditForm")[0].reset();
	$('span[id="errormsg"]').remove();
};



/**
 * 新增或修改成功之后的事件
 * @return
 */
var addOrEditCompleteFun = function(){
	hideModel();
	loadData();
};


/**
 * 新增
 * @return
 */
var addData = function(param){
	operateUtil.addData(addDataUrl,param,addOrEditCompleteFun);
};

/**
 * 详情
 */
var viewData = function(param,viewSuccessFun){
	operateUtil.viewData(querDetialUrl,param,viewSuccessFun);
};

/**
 *编辑
 */
var editData = function(param){
	operateUtil.editData(editDataUrl,param,addOrEditCompleteFun);
};


/**
 * 删除
 */
var removeData = function(param){
	operateUtil.removeData(removeDataUrl,param,addOrEditCompleteFun);
};



/**
 * 删除
 */
var removeBtn = function(btn){
	var pk = getPk(btn);
	
	util.emmAjax({
		url : querDetialUrl,
		data:{'productNum':pk},
		type : 'post',
		success : function(data) {
			var obj = util.str2Json(data);
			var productObj=obj.data;
			if(obj.success=='true')
				{
					var param='{'
						param=param+('\"productNum\":\"'+productObj.productNum+ '\",');
						param=param+('\"productName\":\"'+productObj.productName+ '\",');
						param=param+('\"qsNum\":\"'+productObj.qsNum+ '\",');
						param=param+('\"gbNum\":\"'+productObj.gbNum+ '\",');
						param=param+('\"firmNum\":\"'+productObj.firmNum+ '\",');
						param=param+('\"productType\":\"'+productObj.productType+ '\",');
						param=param+('\"productTech\":\"'+productObj.productTech+ '\",');
						param=param+('\"shelfLife\":\"'+productObj.shelfLife+ '\",');
						param=param+('\"quantity\":\"'+productObj.quantity+ '\",');
						param=param+('\"ingredient\":\"'+productObj.ingredient+ '\",');
						param=param+('\"productionDate\":\"'+productObj.productionDate+ '\",');
						param=param+('\"qualityCode\":\"'+productObj.qualityCode+ '\",');
						param=param+('\"checkoutResult\":\"'+productObj.checkoutResult+ '\",');
						param=param+('\"checkoutId\":\"'+productObj.checkoutId+ '\",');
						param=param+('\"proEnPname\":\"'+productObj.proEnPname+ '\",');
						param=param+('\"proPinTro\":\"'+productObj.proPinTro+ '\",');
						param=param+('\"proNote\":\"'+productObj.proNote+ '\",');
						param=param+('\"commodityCodes\":\"'+productObj.commodityCodes+ '\",');
						param=param+('\"menufactureAddress\":\"'+productObj.menufactureAddress+ '\",');
						param=param+('\"institutionCode\":\"'+productObj.institutionCode+ '\",');
						param=param+('\"dutyPerson\":\"'+productObj.dutyPerson+ '\",');
						param=param+('\"manufacturePhone\":\"'+productObj.manufacturePhone+ '\"');
					
						param += '}';
						param=str2Json(param);
					removeData(param);
				}
			else{
				util.sysAlert(obj.data);
			}
			
		}
	});
};



/**
 * 编辑回填
 */
var editDataFill=function(pk){
	var param = {"productNum":pk};
	viewData(param,dataFill);
};

/**
 * 编辑
 */
var editBtn = function(btn){
	var pk = getPk(btn);
	nowOperate = "edit";
	$("#action").html('编辑产品厂商信息');
	showModel();
	$("#addProductNum").attr("disabled",true);
	editDataFill(pk);
	
};




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	window.checkForm.openFun().init({path:webPath,form:'addOrEditForm'}); 
	$("#addProductionDate").val(GetDateStr(-30));
	$("#addProductionDate").datetimepicker({
		format: "yyyy-mm-dd",
		autoclose:true,
		minView:2,
		language:'cn'
	});
	
	$("#addBtn").click(function(){
		nowOperate = "add";
		$("#addProductNum").attr("disabled",false);
		$("#action").html('新增产品信息');
		firmOption_add(null);
		showModel();
	});
	
	$("#removeOfNumbersBtn").click(function(){
		var param = getRemoveDataOfNumbersParam();
		if(param!=undefined){
			removeDataOfNumbers(param);
		}
	});
	
	
	$("#addOrEditSaveBtn").click(function(){
		var returnValue=window.checkForm.openFun().onSubmit();
		if(nowOperate=="add"&&returnValue ){
			var param = getAddParam();
			if(param!=undefined){
				addData(param);
			}
		}else if(nowOperate=="edit"&&returnValue ){
			var param = getEditParam();
			if(param!=undefined){
				var returnValue=compareStore();
				if(returnValue==0){
					if(param!=null){
						editData(param);
					}
				}else{
					util.sysAlert("您尚未更改任何内容，保存失败！");
				}
			}
		}

	});
	
	$("#queryGridBtn").click(function(){
		loadData();
	});
	$("#upload").click(function(){
		$("#upload_form").submit();
	});
	
	//新增鱼类名录模态框的提交按钮点击事件。
	$("#imageSaveBtn").click(function () {
	   // var picturename="";//获取上传的文件的后缀名，如果不是jpg,或者png的话不出发上传，弹出提示，表单里面的其他内容也不上传。
	   // picturename=$("#productImages").val().substring($("#productImages").val().indexOf('.'),$("#productImages").val().length).toUpperCase();
	    /*当上传的文件的格式是.png .jpg .PNG .JPG时 先将表单内的除图片以外的东西提交到后天，然后在触发插件，将图片上传，保存。
	     */
	    //if (picturename ==".JPG"  || picturename ==".PNG" || picturename =="" || picturename==".BMP"|| picturename==".JPEG") {
	      /*  $.ajax({
	            type: 'post',
	            url: '/SongshanManagement/animalcontent/addfishcontent.html',
	            data: $("#form_addfishContent").serialize(),
	            success: function (data) {*/
	               // fishId = data;
	                //不上传图片时，不触发bootstrap 上传插件的初始化方法。仅将表单里面的（除图片以外的）内容提交，
	                if ($("#productImages").val() != "") {
	                    $('#productImages').fileinput('upload'); //触发插件开始上传。
	                }
	               // else {
	                //    closeModal('fishAddDetail');
	                //    $("#bootstraptable_fishcontent").bootstrapTable("refresh");
	                //}

	        /*    }
	        });*/
	   // }else {
	    //    alert("只能上传.jpg，.png，.PNG,.JPG,bmp,jpeg格式的图片");
	   //     return false;
	    //}

	});
	
	firmOption_query();
	loadData();	
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/**
 * 详情
 */
var viewBtn = function(btn){
	var productNum = getPk(btn);
	var url = "./detailsProduct.html?productNum=" + productNum;
	window.location.href = encodeURI(url);
};


/**
 * 获得查询列表参数
 */
var getQueryGridParam = function(){
	var QNum = $("#query_firmNum").val();
	var QName = $("#query_productName").val();
	var param = {
		'firmNum' : QNum,
		'productName' : QName
	};
	return param;
};


/**
 * 获得增加的参数
 * @return
 */
var getAddParam = function(){
	var addProductNum = $("#addProductNum").val();
	var addProductName = $("#addProductName").val();
	var addQsNum = $("#addQsNum").val();
    var addGbNum = $("#addGbNum").val();
    var addFirmNum = $("#addFirmNum").val();
    var addProductType = $("#addProductType").val();
	var addProductTech = $("#addProductTech").val();
	var addShelfLife = $("#addShelfLife").val();
	var addQuantity = $("#addQuantity").val();
	var addIngredient = $("#addIngredient").val();
	var addProductionDate = $("#addProductionDate").val();
	
	var addQualityCode = $("#addQualityCode").val();
	var addCheckoutResult = $("#addCheckoutResult").val();
	var addCheckoutId = $("#addCheckoutId").val();
	var addProEnPname = $("#addProEnPname").val();
	var addProPinTro = $("#addProPinTro").val();
	var addProNote = $("#addProNote").val();
	var addCommodityCodes = $("#addCommodityCodes").val();
	var addMenufactureAddress = $("#addMenufactureAddress").val();
	var addInstitutionCode = $("#addInstitutionCode").val();
	var addDutyPerson = $("#addDutyPerson").val();
	var addManufacturePhone = $("#addManufacturePhone").val();
	
	var param='{'
	param=param+('\"productNum\":\"'+addProductNum+ '\",');
	param=param+('\"productName\":\"'+addProductName+ '\",');
	param=param+('\"qsNum\":\"'+addQsNum+ '\",');
	param=param+('\"gbNum\":\"'+addGbNum+ '\",');
	param=param+('\"firmNum\":\"'+addFirmNum+ '\",');
	param=param+('\"productType\":\"'+addProductType+ '\",');
	param=param+('\"productTech\":\"'+addProductTech+ '\",');
	param=param+('\"shelfLife\":\"'+addShelfLife+ '\",');
	param=param+('\"quantity\":\"'+addQuantity+ '\",');
	param=param+('\"ingredient\":\"'+addIngredient+ '\",');
	param=param+('\"productionDate\":\"'+addProductionDate+ '\",');
	param=param+('\"qualityCode\":\"'+addQualityCode+ '\",');
	param=param+('\"checkoutResult\":\"'+addCheckoutResult+ '\",');
	param=param+('\"checkoutId\":\"'+addCheckoutId+ '\",');
	param=param+('\"proEnPname\":\"'+addProEnPname+ '\",');
	param=param+('\"proPinTro\":\"'+addProPinTro+ '\",');
	param=param+('\"proNote\":\"'+addProNote+ '\",');
	param=param+('\"commodityCodes\":\"'+addCommodityCodes+ '\",');
	param=param+('\"menufactureAddress\":\"'+addMenufactureAddress+ '\",');
	param=param+('\"institutionCode\":\"'+addInstitutionCode+ '\",');
	param=param+('\"dutyPerson\":\"'+addDutyPerson+ '\",');
	param=param+('\"manufacturePhone\":\"'+addManufacturePhone+ '\"');
	//param = param.substring(0, param.length - 1);
	param += '}';
	param=str2Json(param);
	return param;
};

/**
 * 获得编辑的参数
 * @return
 */
var getEditParam = function(){
	var addProductNum = $("#addProductNum").val();
	var addProductName = $("#addProductName").val();
	var addQsNum = $("#addQsNum").val();
    var addGbNum = $("#addGbNum").val();
    var addFirmNum = $("#addFirmNum").val();
    var addProductType = $("#addProductType").val();
	var addProductTech = $("#addProductTech").val();
	var addShelfLife = $("#addShelfLife").val();
	var addQuantity = $("#addQuantity").val();
	var addIngredient = $("#addIngredient").val();
	var addProductionDate = $("#addProductionDate").val();
	var addQualityCode = $("#addQualityCode").val();
	var addCheckoutResult = $("#addCheckoutResult").val();
	var addCheckoutId = $("#addCheckoutId").val();
	var addProEnPname = $("#addProEnPname").val();
	var addProPinTro = $("#addProPinTro").val();
	var addProNote = $("#addProNote").val();
	var addCommodityCodes = $("#addCommodityCodes").val();
	var addMenufactureAddress = $("#addMenufactureAddress").val();
	var addInstitutionCode = $("#addInstitutionCode").val();
	var addDutyPerson = $("#addDutyPerson").val();
	var addManufacturePhone = $("#addManufacturePhone").val();
	var param='{'
	param=param+('\"productNum\":\"'+addProductNum+ '\",');
	param=param+('\"productName\":\"'+addProductName+ '\",');
	param=param+('\"qsNum\":\"'+addQsNum+ '\",');
	param=param+('\"gbNum\":\"'+addGbNum+ '\",');
	param=param+('\"firmNum\":\"'+addFirmNum+ '\",');
	param=param+('\"productType\":\"'+addProductType+ '\",');
	param=param+('\"productTech\":\"'+addProductTech+ '\",');
	param=param+('\"shelfLife\":\"'+addShelfLife+ '\",');
	param=param+('\"quantity\":\"'+addQuantity+ '\",');
	param=param+('\"ingredient\":\"'+addIngredient+ '\",');
	param=param+('\"productionDate\":\"'+addProductionDate+ '\",');
	param=param+('\"qualityCode\":\"'+addQualityCode+ '\",');
	param=param+('\"checkoutResult\":\"'+addCheckoutResult+ '\",');
	param=param+('\"checkoutId\":\"'+addCheckoutId+ '\",');
	param=param+('\"proEnPname\":\"'+addProEnPname+ '\",');
	param=param+('\"proPinTro\":\"'+addProPinTro+ '\",');
	param=param+('\"proNote\":\"'+addProNote+ '\",');
	param=param+('\"commodityCodes\":\"'+addCommodityCodes+ '\",');
	param=param+('\"menufactureAddress\":\"'+addMenufactureAddress+ '\",');
	param=param+('\"institutionCode\":\"'+addInstitutionCode+ '\",');
	param=param+('\"dutyPerson\":\"'+addDutyPerson+ '\",');
	param=param+('\"manufacturePhone\":\"'+addManufacturePhone+ '\"');
	//param = param.substring(0, param.length - 1);
	param += '}';
	param=str2Json(param);
				
	store_new['productNum']=addProductNum;
	store_new['productName']=addProductName;
	store_new['qsNum']=addQsNum;
	store_new['gbNum']=addGbNum;
	store_new['firmNum']=addFirmNum;
	store_new['productType']=addProductType;
	store_new['productTech']=addProductTech;
	store_new['shelfLife']=addShelfLife;
	store_new['quantity']=addQuantity;
	store_new['ingredient']=addIngredient;
	store_new['productionDate']=addProductionDate;
	store_new['qualityCode']=addQualityCode;
	store_new['checkoutId']=addCheckoutId;
	store_new['proEnPname']=addProEnPname;
	store_new['proPinTro']=addProPinTro;
	store_new['proNote']=addProNote;
	store_new['commodityCodes']=addCommodityCodes;
	store_new['menufactureAddress']=addMenufactureAddress;
	store_new['institutionCode']=addInstitutionCode;
	store_new['dutyPerson']=addDutyPerson;
	store_new['checkoutResult']=addCheckoutResult;
	store_new['manufacturePhone']=addManufacturePhone;
	return param;
};

/**
 * 编辑回调回填
 * @param data
 * @return
 */
var update_old_data;
var dataFill = function(data){
	var roles=[];
	var object = util.str2Json(data).data;
	update_old_data=object;
	
	$("#addProductNum").val(object.productNum);
	$("#addProductName").val(object.productName);
	$("#addQsNum").val(object.qsNum);
    $("#addGbNum").val(object.gbNum);
    $("#addFirmNum").val(object.firmNum);
    $("#addProductType").val(object.productType);
	$("#addProductTech").val(object.productTech);
	$("#addShelfLife").val(object.shelfLife);
	$("#addQuantity").val(object.quantity);
	$("#addIngredient").val(object.ingredient);
	$("#addProductionDate").val(object.productionDate);
	
	$("#addQualityCode").val(object.qualityCode);
	$("#addCheckoutResult").val(object.checkoutResult);
	$("#addCheckoutId").val(object.checkoutId);
	$("#addProEnPname").val(object.proEnPname);
	$("#addProPinTro").val(object.proPinTro);
	$("#addProNote").val(object.proNote);
	$("#addCommodityCodes").val(object.commodityCodes);
	$("#addMenufactureAddress").val(object.menufactureAddress);
	$("#addInstitutionCode").val(object.institutionCode);
	$("#addDutyPerson").val(object.dutyPerson);
	$("#addManufacturePhone").val(object.manufacturePhone);
	
	firmOption_add(object.firmNum);
	
	store_old['productNum']=object.productNum;
	store_old['productName']=object.productName;
	store_old['qsNum']=object.qsNum;
	store_old['gbNum']=object.gbNum;
	store_old['firmNum']=object.firmNum;
	store_old['productType']=object.productType;
	store_old['productTech']=object.productTech;
	store_old['shelfLife']=object.shelfLife;
	store_old['quantity']=object.quantity;
	store_old['ingredient']=object.ingredient;
	store_old['productionDate']=object.productionDate;
	
	store_old['qualityCode']=object.qualityCode;
	store_old['checkoutId']=object.checkoutId;
	store_old['proEnPname']=object.proEnPname;
	store_old['proPinTro']=object.proPinTro;
	store_old['proNote']=object.proNote;
	store_old['commodityCodes']=object.commodityCodes;
	store_old['menufactureAddress']=object.menufactureAddress;
	store_old['institutionCode']=object.institutionCode;
	store_old['dutyPerson']=object.dutyPerson;
	store_old['checkoutResult']=object.checkoutResult;
	store_old['manufacturePhone']=object.manufacturePhone;
};

function firmOption_query() {
	var param=[];
	var selectObj = {};
	selectObj["url"] = firmOptionUrl;
	selectObj["id"] = 'query_firmNum';
	selectObj["param"] = param;
	selectObj["valueParam"] = 'firmNum';
	selectObj["htmlParam"] = 'firmName';
	selectObj["defaultSelectedValue"] = null;
	var selectOption = new SelectOption();
	selectOption.clear('query_firmNum');
	selectOption.loadOption(selectObj);
};

function firmOption_add(firmNum) {
	var param=[];
	var selectObj = {};
	selectObj["url"] = firmOptionUrl;
	selectObj["id"] = 'addFirmNum';
	selectObj["param"] = param;
	selectObj["valueParam"] = 'firmNum';
	selectObj["htmlParam"] = 'firmName';
	selectObj["defaultSelectedValue"] = firmNum;
	var selectOption = new SelectOption();
	selectOption.clear('addFirmNum');
	selectOption.loadOption(selectObj);
	
};
/**
 *将json字符串转化为json对象
 */
function str2Json(jsonStr){
	var json = eval("(" + jsonStr + ")"); 
	return json;
};


/**
 * 图片信息
 */
/*var image = function(btn){
	var id = getPk(btn);
	showImageModel(id);
	initFileInput(id);
};*/

/**
 * 详情
 */
var image = function(btn){
	var productNum = getPk(btn);
	var url = "./imageProduct.html?productNum=" + productNum;
	window.location.href = encodeURI(url);
};

/**
 * 视频信息
 */
var movie = function(btn){
	var productNum = getPk(btn);
	var url = "./movieProduct.html?productNum=" + productNum;
	window.location.href = encodeURI(url);
};

/**
 * 清空form
 */
var resetImageForm = function(){
	$("#imageForm")[0].reset();
	//$('#productImages').fileinput('clear');
	//$('span[id="errormsg"]').remove();
};

/**
 * 显示图片框
 */
var  showImageModel = function(id){
	resetImageForm();
	$("#imageModal").modal("show");
	//初始化fileinput控件（第一次初始化）
	
	//$('#productImages').fileinput('refresh');
//	AddOrEditCheck();
};

/**
 * 关闭图片框
 */
var hideImageModel = function(){
	$("#imageModal").modal("hide");
	resetImageForm();
};

//初始化获取原有文件 
function initFileInput(id) {
	var ctrlName ="productImages";
	var uploadUrl = "../product/imageUpload.action";
	var param={"productNum":id};
	$.ajax({
		type : "post",
		url : "../product/findImageById.action",
		dataType : "json",
		 data:param, 
		success : function(data) {
			layer.msg('操作成功！');
			
			showPhotos(id,ctrlName,uploadUrl,data);
			
			

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			layer.msg('操作失败！');
		}
	});
};

//初始化fileinput控件（第一次初始化）
function showPhotos2(id, ctrlName, uploadUrl, djson) {

	// 后台返回json字符串转换为json对象
	var reData = eval(djson).data;
	// 预览图片json数据组
	var preList = new Array();
	for (var i = 0; i < reData.length; i++) {
		var array_element = reData[i];
		// 此处指针对.txt判断，其余自行添加
		if (array_element.fileName.indexOf("txt") > 0) {
			// 非图片类型的展示
			preList[i] = "<div class='file-preview-other-frame'><div class='file-preview-other'><span class='file-icon-4x'><i class='fa fa-file-text-o text-info'></i></span></div></div>"
		} else {
			// 图片类型
			// preList[i]= "<img
			// src=\"/eim/upload/getIMG.do?savePath="+array_element.fileIdFile.filePath+"&name="+array_element.fileIdFile.name+"\"
			// class=\"file-preview-image\">";
			preList[i] = "<img src=\"http://localhost:8080/filePath/imageInfo/test.jpg\" class=\""+array_element.fileName+"\" style=\"height:200px;width:200px\">";
			//preList[i] = "<img src=\""+array_element.filePath+"\" class=\""+array_element.fileName+"\">";
		}
	}
	var previewJson = preList;
	// 与上面 预览图片json数据组 对应的config数据
	var preConfigList = new Array();
	for (var i = 0; i < reData.length; i++) {
		var array_element = reData[i];
		var tjson = {
			caption : array_element.fileName, // 展示的文件名
			width : '120px',
			url : '/eim/project/deleteFile.do', // 删除url
			key : array_element.fileName, // 删除是Ajax向后台传递的参数
			extra : {
				id : 100
			}
		};
		preConfigList[i] = tjson;
	}

	var control = $('#' + ctrlName);
	control.fileinput({
				language : 'zh', // 设置语言
				uploadUrl : uploadUrl, // 上传的地址
				enctype : 'multipart/form-data',
				allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' ],// 接收的文件后缀
				showUpload : false, // 是否显示上传按钮
				showPreview : true, // 展前预览
				showCaption : false,// 是否显示标题
				maxFileSize : 10000,// 上传文件最大的尺寸
				maxFilesNum : 10,//
				dropZoneEnabled : true,// 是否显示拖拽区域
				browseClass : "btn btn-primary", // 按钮样式
				uploadAsync : false,
				initialPreviewShowDelete : true,
				msgFilesTooMany : "选择上传的文件数量 超过允许的最大数值！",
				initialPreview : previewJson,
				initialPreviewFileType : 'image', // image is the default and
													// can be overridden in
													// config below
				initialPreviewConfig : preConfigList,
				uploadExtraData : function(previewId, index) {
					// 向后台传递id作为额外参数，是后台可以根据id修改对应的图片地址。
					var obj = {};
					obj.id = id;
					return obj;
				}
			})
			.on("filebatchuploadsuccess", function(event, data) {
				if (data.response) {
					// closeModal('fishAddDetail'); //关闭模态框。
					util.sysAlert("图片信息修改成功");
					hideImageModel();
					// $("#bootstraptable_fishcontent").bootstrapTable("refresh");
				}
			})
			.on('fileerror', function(event, data, msg) { // 一个文件上传失败
				console.log('文件上传失败！' + msg);
			})
			.on('filepreupload',
					function(event, data, previewId, index) {
						var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
			});

};






// 初始化图像信息
function initPortrait(ctrlName, id) {
    var control = $('#' + ctrlName);
    var imageurl = '/PictureAlbum/GetPortrait?id=' + id + '&r=' + Math.random();

    // 重要，需要更新控件的附加参数内容，以及图片初始化显示
    control.fileinput('refresh', {
        uploadExtraData: { id: id },
        initialPreview: [ //预览图片的设置
            "<img src='" + imageurl + "' class='file-preview-image' alt='肖像图片' title='肖像图片'>",
        ],
    });
}

//添加记录的窗体处理
/*formValidate("ffAdd", function (form) {
    $("#add").modal("hide");
    //构造参数发送给后台
    var postData = $("#ffAdd").serializeArray();
    $.post(url, postData, function (json) {
        var data = $.parseJSON(json);
        if (data.Success) {
            //增加肖像的上传处理
            initPortrait(data.Data1);//使用写入的ID进行更新
            $('#file-Portrait').fileinput('upload');

            //保存成功  1.关闭弹出层，2.刷新表格数据
            showTips("保存成功");
            Refresh();
        }
        else {
            showError("保存失败:" + data.ErrorMessage, 3000);
        }
    }).error(function () {
        showTips("您未被授权使用该功能，请联系管理员进行处理。");
    });
});*/
