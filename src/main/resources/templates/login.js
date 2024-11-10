var baseUrl = "http://localhost:8080";
var paramLogin = 1;
/**
 * 登录
 */
function loginStudent() {
    var name = $("#name").val();
    var password = $("#password").val();
    var code = $("#code").val();
    var url = baseUrl + "/loginMessage";
    var obj = {};
    obj.name = name;
    obj.password = md5(password);
    obj.code = code;
    $.ajax({
        url:url,
        data:obj,
        type:"POST",
        success:function (msg) {
            if (msg != null && msg != ""){
                $.cookie("name",name);
                $.cookie("flag",msg.account);
                window.location.href = baseUrl + "/index.html";
            }else {
                alert("用户名密码或验证码不正确！");
                change();
            }
        },
        error:function () {
            alert("登录失败！")
        }
    })
}

function register() {
    window.location.href = "register.html";
}

//点击图片刷新验证码
function change() {
    var src = baseUrl + "/code?"+new Date().getTime();
    $("#verifyCodeImg").attr("src",src);
}


function switchLoginUser() {
    var text = $("#loginUser").text();
    if (text == "设计师登录界面"){
        $("#loginUser").text("用户登录界面");
        paramLogin = 1;
    }else{
        $("#loginUser").text("设计师登录界面");
        paramLogin = 2;
    }

}

function loginAdmin(){
    window.location.href = "admin/login.html";
}