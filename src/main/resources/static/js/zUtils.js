/**
 * 时间反格式化
 */
function formatTimeCompare(paramTime) {
    //时间格式  2020-10-31 15:36
    paramTime = paramTime.replace("-","/");
    paramTime = paramTime.replace("-","/");
    paramTime = paramTime.replace(" ","/");
    paramTime = new Date(Date.parse(paramTime));
    return paramTime;//返回时间格式
}

/**
 * ajaxPost
 * @param url
 * @param data
 * @param callBack
 */
function ajaxPost(url,data,callBack){
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: callBack,
        dataType: "json"
    });
}

/**
 * 解析地址栏参数
 * decodeURI() url解码
 * @param name
 * @returns {string|null}
 */
function getUrlParam(name) {
    var url = window.location.href;
    var params1 = url.split("?")[1];
    if(typeof(params1) == "undefined") return null;
    var params = params1.split("&");
    for (var i = 0; i < params.length; i++) {
        if(params[i].indexOf(name) > -1){
            return params[i].split("=")[1];
        }
    }
    return null;
}

/**
 * 不可包含特殊符号
 * @type {RegExp}
 */
let codeNone = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
var testCode = "特殊符号";
if (!codeNone.test(testCode)){
    layerCommonUtil.error("标题格式不可包含特殊符号");
}

/**
 * 防止sql注入
 * @param con
 * @returns {string|jQuery}
 */
function fToEscape_S(con){
    if(!con||(con=="null")){
        return "";
    }
    var span=$("<span/>");
    span.text(con);
    var html=span.html();
    return html;
}