$.ajaxSetup({    
    statusCode: {    
        556: function (XMLHttpRequest,textSatus) {    
        	var redirect = XMLHttpRequest.getResponseHeader("REDIRECT");//若HEADER中含有REDIRECT说明后端想重定向  
            if (redirect == "REDIRECT") {  
                var win = window;    
                while (win != win.top){  
                    win = win.top;  
                }
              //将后端重定向的地址取出来,使用win.location.href去实现重定向的要求  
             var url=XMLHttpRequest.getResponseHeader("CONTEXTPATH");
              setTimeout(function(){//两秒后跳转  
                  win.location.href = url;//PC网页式跳转  
               },2000); 
            }  
    }
    }
})


