var querDetialUrl = "../product/findById.action";
var selectedProductNum="";
/*-------------------------页面加載------------------------------*/
var loadsoftDetInfo = function(id) {
	var ctrlName ="productMovies";
	var uploadUrl = "../product/movieUpload.action";
	selectedProductNum=id;
	util.emmAjax({
		url : '../product/findMovieById.action',
		type : 'post',
		data : {
			'productNum' : id
		},
		cache : false,
		dataType : 'json',
		success : function(data) {
			showPhotos(id,ctrlName,uploadUrl,data);
			
		}
	});

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
			// 视频类型
			 preList[i]= "<video src=\"../appDownload/down?fileName="+array_element.fileName+"&productNum="+id+"\" class=\"kv-preview-data file-preview-video\" style=\"height:200px;width:200px\" controls>" +
			 		//"<source src=\"../appDownload/down?fileName="+array_element.fileName+"&productNum="+id+"\" class=\"kv-preview-data file-preview-video\" type=\"video/mp4\">" +
			 				"</video>";
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
				url : '../product/deleteMovie.action', // 删除url
				key : array_element.fileName, // 删除是Ajax向后台传递的参数
				extra : {
					fileName : array_element.fileName,
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
				allowedFileExtensions : [ 'mp4'],// 接收的文件后缀
				showUpload : true, // 是否显示上传按钮
				showPreview : true, // 展前预览
				showCaption : false,// 是否显示标题
				showRemove : false,
				showCancel :false,
				showClose : false,
				maxFileSize : 10000,// 上传文件最大的尺寸
				//maxFileCount : 2,//
				dropZoneEnabled : true,// 是否显示拖拽区域
				browseClass : "btn btn-primary", // 按钮样式
				uploadAsync : false,
				initialPreviewShowDelete : true,
				msgFilesTooMany : "选择上传的文件数量 超过允许的最大数值！",
				layoutTemplates:{
					actionUpload:''
				},
				initialPreview : previewJson,
				initialPreviewFileType : 'video', 
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
					util.sysAlert("视频信息添加成功");
					//var url = "./movieProduct.html?productNum=" + id;
					//window.location.href = encodeURI(url);
					
				}
			})
			.on('fileerror', function(event, data, msg) { // 一个文件上传失败
				console.log('文件上传失败！' + msg);
			})
			.on('filepreupload',
					function(event, data, previewId, index) {
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


$("#returnBtn").click(function(){
	window.location.href = "./product.html";
});

$("#showUpdloadedFileBtn").click(function(){
	var url = "./movieProduct.html?productNum=" + selectedProductNum;
	window.location.href = encodeURI(url);
});