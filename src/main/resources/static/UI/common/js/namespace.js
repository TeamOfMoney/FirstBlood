var NT = window.NT || {};
/*
 * 注册命名空间
 * 使用示例：
 * var myObj = NT.namespace("rp.list");
 * 
 * myObj.myClass = function(){
 * 		this.x = 1;
 *      this.y = 1;
 *      this.test = function(){
 *      	alert(this.x);
 *      }
 * }
 * 
 * 用法：
 * 
 * var obj = new NT.rp.list.myClass();
 * obj.test();
 * 
 * 效果：
 * 输出alert（1）；
 */
NT.namespace = function(ns) {
	if (!ns || !ns.length) {
	   return null;
	}
	var levels = ns.split(".");
	var nsobj = NT;
	//如果申请的命名空间是在NT下的，则必须忽略它，否则就成了NT.NT了
	for (var i=(levels[0] == "NT") ? 1 : 0; i<levels.length; ++i) {
		//如果当前命名空间下不存在，则新建一个关联数组。
		nsobj[levels[i]] = nsobj[levels[i]] || {};
		nsobj = nsobj[levels[i]];
	}
	//返回所申请命名空间的一个引用；
	return nsobj;
};


