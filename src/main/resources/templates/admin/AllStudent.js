var studentMessage = "";
var shopMinNum = 1;
var curPage = 1;
var showPage = 8;
var shopMaxNum = 0;
var uName = "";
var nowID = 0;
$(function () {
    selectStu();
    // selectCount();
});

/**
 * 查询所有学生
 */
function selectStu() {
    var url = baseUrl + "/selectStu";
    var obj = {};
    // obj.curPage = curPage;
    // obj.showPage = showPage;
    obj.name = uName;
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
        html += "<td>"+studentMessage[i].name+"</td>";
        html += "<td>"+studentMessage[i].phone+"</td>";
        html += "<td>"+studentMessage[i].email+"</td>";
        html += "<td>"+studentMessage[i].country+"</td>";
        html += "<td>"+studentMessage[i].signature+"</td>";
        var name = "";
        if (studentMessage[i].account == "1"){
            name = "买家";
        }else {
            name = "设计师";
        }
        html += "<td>"+name+"</td>";
        html += "<td> <a href='#'>"+
            "<img src='../ACredit/img/delete.jpg' onclick='deleteHtml("+studentMessage[i].id+")' " +
            "style='width: 20px;height: 18px;margin-top: -8px'></a></td>";
        html += "</tr>";
    }
    $("#studentHtml").html(html);
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
    selectStu();
    selectCount();
}

/**
 * 上一页
 */
function lastPage() {
    if (curPage != 1){
        curPage --;
        selectStu();
        selectCount();
    }
}

/**
 * 上一页
 */
function nextPage() {
    if (curPage != shopMaxNum){
        curPage ++;
        selectStu();
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
function deleteStu() {
    var url = baseUrl + "/deleteStu";
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
        uCard = "";
        uName = "";
        selectStu();
    }
    else{
        uName = content;
        selectStu();
    }

}