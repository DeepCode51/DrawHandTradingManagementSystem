var name = "";
var flag = "";
$(function () {
    name = $.cookie("name");
	flag = $.cookie("flag");
    if (flag == 1){
        $("#buyMess").hide();
    }
})

/**
 * 查询个人信息
 */
function selectDoctor() {
    var url = baseUrl + "/selectPersonContent";
    var obj = {};
    obj.name = name;
    $.ajax({
        url:url,
        data:obj,
        type:"POST",
        success:function (msg) {

        }
    })

}

/**
 * 发送意见
 */
function sendOpinion() {
    debugger;
    var name = $("#Name").val();
    var Email = $("#Email").val();
    var phone = $("#phone").val();
    var Time = $("#Time").val();
    var Content = $("#Content").val();
    if (name=="" || Email=="" || phone=="" || Time=="" || Content==""){
        alert("当前信息均不可为空！")
    }else {
        var url = baseUrl + "/sendOpinion";
        var info = {};
        info.sendName = name;
        info.time = Time;
        info.content = Content;
        info.phone = phone;
        info.email = Email;
        var obj = {};
        obj.info = JSON.stringify(info);
        $.ajax({
            url:url,
            data:obj,
            type:"POST",
            success:function (msg) {
                alert("意见发送成功！")
                window.history.go(0);
            },
            error:function () {
                alert("意见发送繁忙！");
            }
        })
    }
}
