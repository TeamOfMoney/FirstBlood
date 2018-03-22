var querDetialUrl = "../product/findById.action";
var selectedProductNum="";

/*-------------------------页面加載------------------------------*/
var loadsoftDetInfo = function(id) {
	var ctrlName ="productImages";
	var uploadUrl = "../product/imageUpload.action";
	selectedProductNum=id;
	util.emmAjax({
		url : '../product/findImageById.action',
		type : 'post',
		data : {
			'productNum' : id
		},
		cache : false,
		dataType : 'json',
		success : function(data) {
			//layer.msg('操作成功！');
			showPhotos(id,ctrlName,uploadUrl,data);
			
		}
	});
	
	/*var param={"productNum":id};
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
	});*/
};


//初始化fileinput控件（第一次初始化）
function showPhotos(id, ctrlName, uploadUrl, djson) {

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
			 preList[i]= "<img src=\"../appDownload/down?fileName="+array_element.fileName+"&productNum="+id+"\" class=\"kv-preview-data file-preview-image\" >";
			//preList[i]= "http://127.0.0.1:8080/nfcm/appDownload/down?fileName="+array_element.fileName+"&productNum="+id+"";
			// class=\"file-preview-image\">";
			//preList[i] = "<img src=\"http://localhost:9080/nfcm/upload/image/test.jpg\" class=\""+array_element.fileName+"\" style=\"height:200px;width:200px\">";
			//preList[i] = "<img src=\""+array_element.fileUrl+"\" class=\""+array_element.fileName+"\" style=\"height:200px;width:200px\">";
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
			url : '../product/deleteImage.action', // 删除url
			key : array_element.fileName, // 删除是Ajax向后台传递的参数
			extra : {
				//fileName : array_element.fileName,
				productNum : id
			}
		};
		preConfigList[i] = tjson;
	}

	var control = $('#' + ctrlName);
	control.fileinput({
				language : 'zh', // 设置语言
				uploadUrl : uploadUrl, // 上传的地址
				enctype : 'multipart/form-data',
				allowedFileExtensions : [ 'jpg', 'png'],// 接收的文件后缀
				showUpload : true, // 是否显示上传按钮
				showPreview : true, // 展前预览
				showCaption : false,// 是否显示标题
				showRemove : false,
				showCancel :false,
				showClose : false,
				maxFileSize : 10000,// 上传文件最大的尺寸
				//maxFilesNum : 10,//
				dropZoneEnabled : true,// 是否显示拖拽区域
				browseClass : "btn btn-primary", // 按钮样式
				uploadAsync : false,
				initialPreviewShowDelete : true,
				msgFilesTooMany : "选择上传的文件数量 超过允许的最大数值！",
				append:true,
				layoutTemplates:{
					actionUpload:''
				},
				initialPreviewAsData: false, 
				/*previewSettings: {
				    image: {width: "auto", height: "auto"},
				    video: {width: "213px", height: "160px"},
				    other: {width: "213px", height: "160px"}
				},*/
		       /* previewZoomSettings:{
		            image: {width: "auto", height: "auto", 'max-width': "100%", 'max-height': "100%"},
		            video: {width: "100%", height: "auto",'max-width': "100%", 'max-height': "100%"},
		            other: {width: "100%", height: "160px"}
		        },*/
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
					//$("#saveImageBtnDiv").css("display","none");
					util.sysAlert("图片信息添加成功");
					//alert("图片信息添加成功");
					//window.location.href = "./product.html";
					//util.sysAlert(data.response.data);
					/*var url = "./imageProduct.html?productNum=" + id;
					window.location.href = encodeURI(url);*/
					//hideImageModel();
					// $("#bootstraptable_fishcontent").bootstrapTable("refresh");
				}
			})
			.on('filebatchuploaderror', function(event, data, msg) { // 一个文件上传失败
				console.log('文件上传失败！' + msg);
				util.sysAlert(msg);
			})
			.on('filepreupload',
					function(event, data, previewId, index) {
					util.sysAlert("上传前调用");
						var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
			}).on("filebatchselected", 
					function(event, files) {
					$("#showUpdloadedFileDiv").css("display","block");
			});

};
/*
 * 获取url参数
 */
var getUrlParam=function(name) {
	 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	 var urlParam = window.location.search.substr(1);
	 var r = decodeURI(urlParam).match(reg);  //匹配目标参数
	 if (r != null) return unescape(r[2]); return null; //返回参数值

};

$(function(){
	var productNum = getUrlParam('productNum');
	loadsoftDetInfo(productNum);
	
});

//新增鱼类名录模态框的提交按钮点击事件。
$("#imageSave1Btn").click(function () {
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
                else{
                	util.sysAlert("图片信息未发生变化");
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
$("#returnBtn").click(function(){
	window.location.href = "./product.html";
});

$("#showUpdloadedFileBtn").click(function(){
	var url = "./imageProduct.html?productNum=" + selectedProductNum;
	window.location.href = encodeURI(url);
});