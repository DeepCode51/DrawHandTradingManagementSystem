var studentMessage = "";
var shopMinNum = 1;
var curPage = 1;
var showPage = 8;
var shopMaxNum = 0;
var uName = "";
var nowID = 0;
var id = 0;
var QfilePath = "";
$(function () {
    selectDoc();
    // selectCount();
});

/**
 * 查询所有学生
 */
function selectDoc() {
    var url = baseUrl + "/InformationList";
    var obj = {};
    // obj.curPage = curPage;
    // obj.showPage = showPage;
    obj.title = uName;
    $.ajax({
        url:url,
        type:"POST",
        data:obj,
        success:function (msg) {
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
        var pic = "http://localhost:8080/getImgHead?image="+studentMessage[i].chatPath;
        html += "<tr>";
        html += "<td style='line-height: 80px;'>"+(i+1)+"</td>";
        html += "<td style='line-height: 80px;'>"+studentMessage[i].sendName+"</td>";
        if(studentMessage[i].content.length >=20){
            studentMessage[i].content = studentMessage[i].content.substring(0,20) + "...";
        }
        html += "<td style='line-height: 80px;'>"+studentMessage[i].content+"</td>";
        html += "<td style='line-height: 80px;'>"+studentMessage[i].receiveName+"</td>";
        html += "<td style='line-height: 80px;'>"+studentMessage[i].chatTitle+"</td>";
        html += "<td style='line-height: 80px;'>"+studentMessage[i].chatAbout+"</td>";
        html += "<td style='line-height: 80px;'>"+studentMessage[i].chatPrice+"</td>";
        html += "<td style='line-height: 80px;'><img src='"+pic+"' style='width: 80px;height: 50px'></td>";
        // html += "<td style='line-height: 80px;'><a href='#' onclick='doctorHtml(\""+studentMessage[i].id+"\")'>修改</a></td>";
        html += "<td style='line-height: 80px;'> <a href='#'>"+
            "<img src='../ACredit/img/delete.jpg' onclick='deleteHtml("+studentMessage[i].id+")' " +
            "style='width: 20px;height: 18px;margin-top: -8px'></a></td>";
        html += "</tr>";
    }
    $("#studentHtml").html(html);
}

function changeDoc(name) {
    var url = baseUrl + "/InformationList";
    var obj = {};
    obj.title = name;
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
function addInformation() {
    layer.open({
        type: 1,
        content: $("#informationHtml"),
        area: ['70%','55%'],
    });
}

function doctorHtml(id,filePath) {
    QfilePath = filePath
    layer.open({
        type: 1,
        content: $("#doctorHtml"),
        area: ['70%','55%'],
    });
    changeDoc(id);
}

function doctorHtmlBuild(msg) {
    $("#doctor").val(msg[0].title);
    $("#srcImg").attr("src","http://localhost:8080/getImgHead?image="+msg[0].image);
    $("#contentD").val(msg[0].content);
    $("#price").text(msg[0].look);
    $("#kind").val(msg[0].kind);
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
    var url = baseUrl + "/sureUpdateInfor";
    var title = $("#doctor").val();
    var content = $("#contentD").val();
    var kind = $("#kind").val();
    var filePath = $("#file1").val();
    var imgObj = $("#file1")[0].files[0];
    var formData = new FormData();
    console.log(filePath);
    //上传朋友圈数据可append
    formData.append("file",imgObj);
    formData.append("title",title);
    formData.append("content",content);
    formData.append("kind",kind);
    formData.append("id",id);
    $.ajax({
        url:url,
        data:formData,
        type:"POST",
        async : false,
        contentType: false,// 告诉jQuery不要去设置Content-Type请求头
        cache: false, //缓存
        processData: false, // 告诉jQuery不要去处理发送的数据
        success:function (msg) {
            alert("修改成功!");
            history.go(0);
        }
    })

}

function sureAddIn() {
    var url = baseUrl + "/sureAddIn";
    var title = $("#title").val();
    var content = $("#contentI").val();
    var kind = $("#kindI").val();

    var filePath = $("#file").val();
    var imgObj = $("#file")[0].files[0];
    var formData = new FormData();
    console.log(filePath);
    //上传朋友圈数据可append
    formData.append("file",imgObj);
    formData.append("title",title);
    formData.append("content",content);
    formData.append("kind",kind);
    $.ajax({
        url:url,
        data:formData,
        type:"POST",
        async : false,
        contentType: false,// 告诉jQuery不要去设置Content-Type请求头
        cache: false, //缓存
        processData: false, // 告诉jQuery不要去处理发送的数据
        success:function (msg) {
            alert("信息添加成功！");
            window.history.go(0);
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
    var url = baseUrl + "/deleteInfor";
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