var studentMessage = "";
var uName = "";
var nowID = 0;
var id = 0;
$(function () {
    bookList();
});

function bookList() {
    var url = baseUrl + "/selectDynamic";
    var obj = {};
    obj.DynamicSendName = uName;
    $.ajax({
        type:"POST",
        data:obj,
        url:url,
        success:function (msg) {
            studentMessage=msg;
            bookListHtml(msg);
        }

    })
}

/**
 * 动态html赋值
 * @constructor
 */
function bookListHtml() {
    var html = "";
    for (var i = 0; i < studentMessage.length; i++) {
        var pic = "http://localhost:8080/getImgHead?image="+studentMessage[i].dynamicPath;
        html += "<tr>";
        html += "<td>"+(i+1)+"</td>";
        html += "<td>"+studentMessage[i].dynamicSendName+"</td>";
        html += "<td>"+studentMessage[i].dynamicContent+"</td>";
        html += "<td>"+studentMessage[i].dynamicTime+"</td>";
        html += "<td>"+studentMessage[i].dynamicAddress+"</td>";
        if (studentMessage[i].dynamicPath != null && studentMessage[i].dynamicPath != ""){
            html += "<td><img src='"+pic+"' style='width: 80px;height: 50px'></td>";
        }else {
            html += "<td></td>";
        }
        html += "<td>"+studentMessage[i].dynamicZanNum+"</td>";
        html += "<td> <a href='#'>"+
            "<img src='../ACredit/img/delete.jpg' onclick='deleteHtml("+studentMessage[i].dynamicID+")' " +
            "style='width: 20px;height: 18px;margin-top: -8px'></a></td>";
        html += "</tr>";
    }
    $("#bookListHtml").html(html);
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

function openAdd() {
    layer.open({
        type: 1,
        content: $("#addBookHtml"),
        area: ['40%','40%'],
    })
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

function sureAdd() {
    var url = baseUrl + "/sureAdd";
    var filePath = $("#bookFile").val();
    var fileObj = $("#bookFile")[0].files[0];
    if(filePath != "" && filePath != null && filePath != "undefined"){
        var formData = new FormData();
        var bookName = $("#bookName").val();
        var bookContent = $("#bookContent").val();
        var bookExplame = $("#bookExplame").val();
        //上传朋友圈数据可append
        formData.append("file",fileObj);
        formData.append("bookName",bookName);
        formData.append("bookContent",bookContent);
        formData.append("bookExplame",bookExplame);
        $.ajax({
            url:url,
            data:formData,
            type:"POST",
            // async : false,
            contentType: false,// 告诉jQuery不要去设置Content-Type请求头
            cache: false, //缓存
            processData: false, // 告诉jQuery不要去处理发送的数据
            success:function (msg) {
                alert("发表成功！");
                window.history.go(0);
            },
            error:function () {
                alert("系统繁忙！")
            },
        })
    }else {
        alert("信息填写有误！");
    }
}

function deleteDoc() {
    var url = baseUrl + "/deleteDynamic";
    var obj = {};
    obj.ID = nowID;
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
 * 查询列表
 */
function selectByNameOrCard() {
    var content = $("#content").val();
    if(content == "" || content == null){
        uName = "";
        bookList();
    }
    else{
        uName = content;
        bookList();
    }

}