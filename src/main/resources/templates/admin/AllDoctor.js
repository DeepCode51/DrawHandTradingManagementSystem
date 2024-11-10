var studentMessage = "";
var shopMinNum = 1;
var curPage = 1;
var showPage = 8;
var shopMaxNum = 0;
var uName = "";
var nowID = 0;
var id = 0;
$(function () {
    selectDoc();
    // selectCount();
});

/**
 * 查询所有学生
 */
function selectDoc() {
    var url = baseUrl + "/caseList";
    var obj = {};
    // obj.curPage = curPage;
    // obj.showPage = showPage;
    obj.doctor = uName;
    $.ajax({
        url:url,
        type:"POST",
        data:obj,
        success:function (msg) {
            console.log(JSON.stringify(msg));
            studentMessage = msg;
            Assignment();
        }
    })
}

/**
 * 动态html赋值
 * @constructor
 */
function Assignment() {
    var html = "";
    for (var i = 0; i < studentMessage.length; i++) {
        html += "<tr>";
        html += "<td>"+(i+1)+"</td>";
        html += "<td>"+studentMessage[i].doctor+"</td>";
        html += "<td>"+studentMessage[i].type+"</td>";
        html += "<td>"+studentMessage[i].content+"</td>";
        html += "<td>"+studentMessage[i].price+"</td>";
        html += "<td>"+studentMessage[i].introduce+"</td>";
        var staus = "";
        if (studentMessage[i].point == 1){
            staus = "已通过";
        }else {
            staus = "未通过";
        }
        html += "<td>"+staus+"</td>";
        html += "<td> " +
            "<a href='#' onclick='doctorHtml(\""+studentMessage[i].id+"\")'>通过</a>"+
            "<a href='#' style='margin-left: 10px'><img src='../ACredit/img/delete.jpg' title='删除' onclick='deleteHtml("+studentMessage[i].id+")' " +
            "style='width: 20px;height: 18px;margin-top: -8px'></a></td>";
        html += "</tr>";
    }
    $("#studentHtml").html(html);
}

function changeDoc(name) {
    var url = baseUrl + "/caseList";
    var obj = {};
    obj.doctor = name;
    $.ajax({
        url:url,
        type:"POST",
        data:obj,
        success:function (msg) {
            id = msg[0].id;
            doctorHtmlBuild(msg);
        }
    })
}

function doctorHtml(id) {
    var url = baseUrl + "/showPass";
    var obj = {};
    obj.id = id;
    $.ajax({
        url:url,
        type:"POST",
        data:obj,
        success:function (msg) {
            alert("已审核通过!");
            selectDoc();
        }
    })
}

function doctorHtmlBuild(msg) {
    $("#doctor").val(msg[0].doctor);
    $("#type").val(msg[0].type);
    $("#contentD").val(msg[0].content);
    $("#price").val(msg[0].price);
}
/**
 * 查询总页数
 */
function selectCount() {
    var url = baseUrl + "/selectShopNum";
    var obj = {};
    obj.showPage = showPage;
    $.ajax({
        url:url,
        type:"POST",
        data:obj,
        success:function (msg) {
           console.log(JSON.stringify(msg))
           $("#pageTotal").text(msg.shopTotalPage);
           $("#AllNumber").text(msg.shopNum);
           $("#cur").text(curPage);
           shopMaxNum = msg.shopTotalPage;
           pageHtml();
           pageBack();
        }
    })
}

function sureChan() {
    var url = baseUrl + "/sureChan";
    var doctor = $("#doctor").val();
    var type = $("#type").val();
    var content = $("#contentD").val();
    var price = $("#price").val();
    var info = {};
    info.doctor = doctor;
    info.type = type;
    info.content = content;
    info.price = price;
    info.id = id;
    var obj = {};
    obj.info = JSON.stringify(info);
    $.ajax({
        url:url,
        type:"POST",
        data:obj,
        success:function (msg) {
            alert("修改成功!");
            history.go(0);
        }
    })
}

/**
 * 分页动态
 */
function pageHtml() {
    var html = "";
    html += "<ul class='allpage'>";
    html += "<li><a onclick='goPage("+shopMinNum+")'>首页</a></li>";
    html += "<li><a onclick='lastPage()'>&laquo;</a></li>";
    for (var i = 0; i < shopMaxNum; i++) {
        if (curPage <= (i+2) && curPage >= i){
            html += "<li><a onclick='goPage("+(i+1)+")' id='pageClass"+i+"'>"+(i+1)+"</a></li>";
        }
    }
    html += "<li><a onclick='nextPage()'>&raquo;</a></li>";
    html += "<li><a onclick='goPage("+shopMaxNum+")'>末页</a></li>";
    html += "</ul>";
    $("#pageHtml").html(html);
}

/**
 * 分页背景
 */
function pageBack() {
    for (var i = 0; i < shopMaxNum; i++) {
        if ((i+1) == curPage){
            $("#pageClass"+i).css("background","#5acde2");
        }
    }
}
/**
 * 首页 尾页
 */
function goPage(i) {
    curPage = i;
    selectDoc();
    selectCount();
}

/**
 * 上一页
 */
function lastPage() {
    if (curPage != 1){
        curPage --;
        selectDoc();
        selectCount();
    }
}

/**
 * 上一页
 */
function nextPage() {
    if (curPage != shopMaxNum){
        curPage ++;
        selectDoc();
        selectCount();
    }
}

/**
 * 删除界面
 */
function deleteHtml(id) {
    nowID = id;
    layer.open({
        type: 1,
        content: $("#deleteStuHtml"),
        area: ['28%','22%'],
    })
}
/**
 * 取消界面
 * @constructor
 */
function CancelHtml() {
    $(".layui-layer-close").click();
}
/**
 * 删除学生(单删)
 */
function deleteDoc() {
    var url = baseUrl + "/deleteDoc";
    var obj = {};
    obj.id = nowID;
    $.ajax({
        url:url,
        data:obj,
        type:"POST",
        success:function (msg) {
            alert("删除成功！");
            history.go(0);
        }
    })
}
/**
 * 删除学生(批量)
 */
function deleteStuAll() {
    debugger;
    var url = baseUrl + "/deleteStuAll";
    var uid = new Array();
    $('input[name="studentBox"]:checked').each(function () {
        var val = $(this).val();
        var id = studentMessage[val].uid;
        uid.push(id);
    });
    console.log(uid);
    var obj = {};
    obj.uid = uid;
    $.ajax({
        url:url,
        data:obj,
        type:"POST",
        traditional: true,//这里设置为true 传递数组时使用
        success:function () {
            alert("删除成功！");
            history.go(0);
        }
    })

}

/**
 * 查询列表
 */
function selectByNameOrCard() {
    var content = $("#content").val();
    if(content == "" || content == null){
        uName = "";
        selectDoc();
    }
    else{
        uName = content;
        selectDoc();
    }

}