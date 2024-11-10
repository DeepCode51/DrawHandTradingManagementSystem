var randomNumber = 0;
var password = "";
$(function () {
    RandomCode();
})

/**
 * 随机验证码
 * @constructor
 */
function RandomCode() {
    var code = "";
    for(var i=0;i<6;i++){
        var random = Math.floor(Math.random()*10);
        code += random;
    }
    console.log(code);
    randomNumber = code;

}

/**
 * 验证
 * @constructor
 */
function Verification() {
    var phone = $("#email").val();
    var url = baseUrl + "/Verification";
    var obj = {};
    obj.phone = phone;
    $.ajax({
        url:url,
        data:obj,
        type:"POST",
        success:function(msg){
            if (msg != 111){
                alert("当前验证码："+randomNumber);
                password = msg;
            }else {
                alert("当前邮箱不正确！");
            }
        }
    })
}

/**
 * 确定找回
 */
function findPass() {
    var ramCode = $("#ramCode").val();
    if (ramCode == randomNumber){
        alert("您当前密码为："+password)
    }else {
        alert("当前验证码不正确！")
    }
}