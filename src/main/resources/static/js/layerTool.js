
var oLayerTool = new LayerTool();

function pData(cindex){
	
	if(!parent){
		return null;
	}
	var dt=parent.oLayerTool;
	if(!dt){
		return null;
	}
	var data=parent.oLayerTool.data();
	if(cindex){//深拷贝传过来的对象，然后关闭父窗口
		var da= $.extend(true, {}, data);
		parent.layer.close(cindex);
		
		return da;
	}

	return data;
	
}

/**
 *弹出单独页面时
 *关闭当前的layer窗口
 **/
function closeCurrLayer(){
	 var currIndex = parent.layer.getFrameIndex(window.name);
	 parent.layer.close(currIndex);
}

/**
 * 根据传过来的数据关闭父窗口弹出的某个子窗口
 * @param pdata
 */
function closePaLayer(pdata){
	var index=pdata.pwIndex;
	 parent.layer.close(index);
}

function constructLayerData(data){
	 var currIndex = parent.layer.getFrameIndex(window.name);
	 data.pwIndex=currIndex;
}


function LayerTool(){
	var layerData={};//父窗口要传值的对象

	

	this.data=function(){	
		
		return layerData.data;
	}
	//noCall表明，窗口的回掉函数需要显示调用
	this.openUrl=function(url,data,config,noCall){
		if(!url){
			return;
		}
		var width=$(window).width()-100;
		var height=$(window).height()-50;
		if(url=="#"){
			return;
		}
		layerData["url"]=url;//最近打开的Url
		var lconfig={
				type: 2,
				title: false,
				shadeClose: true,
				 //closeBtn: 0, //不显示关闭按钮
				shade: 0.8,
				area: [width+"px", height+"px"],
				end:function(index){
					if(noCall){
						return;
					}
					if(data && data.callBack){
						data.callBack();
					}
				},
				content:url
			};
		
		
		if(config){
			$.extend(lconfig, config);
		}
		if(data){
			layerData.data=data;
			
			
			//layerData.data.pwIndex=aindex;
		}else{
			layerData.data=undefined;
		}
		layer.open(lconfig);
	}
}

/*
 * layer的常用工具方法
 * success
 * error
 * 
 * */

var layerCommonUtil={
		success:function(msg,callback){
			if(!msg){
				msg="操作成功！";
			}
			layer.open({
				title:false,
				closeBtn:0,
				type:0,
				btn:[],
				icon:1,
				content:msg,
				time:2000,
				shadeClose:true,
				yes: function(index){
				},
				cancel:function(index){
				},
				end:function(index){
					if($.isFunction(callback)){
						callback();
					}
				}
			});
		},
		error:function(msg,callback){
			if(!msg){
				msg="操作失败！";
			}
			layer.open({
				title:false,
				closeBtn:0,
				type:0,
				btn:[],
				icon:2,
				content:msg,
				time:2000,
				shadeClose:true,
				yes: function(index){
				},
				cancel:function(index){
				},
				end:function(index){
					if($.isFunction(callback)){
						callback();
					}
				}
			});
		},
		loading:function(){
			var loadingIndex=layer.load(1, {
				shade: [0.1,'#000'],
				shadeClose: false
			});
			return loadingIndex;
		},
		closeLoading:function(){
			layer.closeAll('loading');
		}
};

/**
 * 打开open页
 * @param url
 * @param data
 * @param config
 */
function openUrl(url,data,config,call){
	var nocall="1";
	if(call){
		nocall=null;
	}
	
	oLayerTool.openUrl(url, data, config,nocall);//默认nocall
}

