var baseUrl = "http://localhost:8080";
var paramLogin = 1;
/**
 * 登录
 */
function loginAdmin() {
    var name = $("#name").val();
    var password = $("#password").val();
    var url = baseUrl + "/loginAdmin";
    var obj = {};
    obj.name = name;
    obj.password = password;
    $.ajax({
        url:url,
        data:obj,
        type:"POST",
        success:function (msg) {
            if (msg != 0){
                $.cookie("name",name);
                window.location.href = baseUrl + "/admin/Management.html";
            }else {
                alert("用户名或密码不正确！");
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
    if (text == "医生登录界面"){
        $("#loginUser").text("用户登录界面");
        paramLogin = 1;
    }else{
        $("#loginUser").text("医生登录界面");
        paramLogin = 2;
    }

}