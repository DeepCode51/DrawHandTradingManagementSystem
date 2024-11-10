var baseUrl = "http://localhost:8080";
var paramRegister = 1;
$(function () {

});

/**
 * 注册 格式规范
 */
function formatRegisteredUser() {
    var name = $("#name").val();
    var password = $("#password").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    if (name == "" ||password == ""||phone == "" ||email == ""){
        alert("所有信息不可为空！");
        return false;
    }
    if (name.length>8){
        alert("用户名长度不符！");
        return false;
    }
    if (password.length<6 || password.length>12){
        alert("密码长度必须在6-12位之间！");
        return false;
    }
    if (phone.length!=11){
        alert("手机号不正确或不存在！");
        return false;
    }
    if (email.indexOf("@") == -1){
        alert("邮箱输入有误！");
        return false;
    }
    return true;
}

/**
 * 注册 格式规范
 */
function formatRegisteredD() {
    var name = $("#name").val();
    var password = $("#password").val();
    var type = $("#type").val();
    var content = $("#content").val();
    var price = $("#price").val();
    if (name == "" ||password == ""||type == "" ||content == "" ||price == ""){
        alert("所有信息不可为空！");
        return false;
    }
    if (name.length>8){
        alert("用户名长度不符！");
        return false;
    }
    if (password.length<6 || password.length>12){
        alert("密码长度必须在6-12位之间！");
        return false;
    }
    return true;
}

/**
 * 注册
 */
function registered() {
    if (formatRegisteredUser()){
        var url = baseUrl + "/registeredUser";
        var name = $("#name").val();
        var password = $("#password").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
        var account = $("#account").val();
        var info = {};
        info.name = name;
        info.password = md5(password);
        info.phone = phone;
        info.email = email;
        info.account = account;
        info.type = 1;
        var obj = {};
        obj.info = JSON.stringify(info);
        $.ajax({
            url:url,
            data:obj,
            type:"POST",
            success:function (msg) {
                alert(msg);
                window.location.href = "login.html";
            }
        })
    }

}

