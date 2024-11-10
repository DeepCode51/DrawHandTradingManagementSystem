var baseUrl = "http://localhost:8080";
var message = []; //用户信息
var myAccount = ""; //账户
var name = "";
var id = 0;
var flag = 0;
var personImg = ""; //本人头像地址
$(function () {
    name = $.cookie("name");
    id = $.cookie("id");
    flag = $.cookie("flag");
    if (flag == 1){
        $("#buyMess").hide();
    }
    $("#myName").text(name);
    $("a[name='jumpShoes']").attr("href","../shop/Shop.html");
    selectUserMessage();
});

/**
 * 查询用户信息
 */
function selectUserMessage() {
    var url = baseUrl + "/selectPersonalInformation";
    var obj = {};
    obj.name = name;
    $.ajax({
        url:url,
        data:obj,
        type:"POST",
        dataType:"json",
        success:function (msg) {
            message = msg;
            myAccount = message[0].account;
            $.cookie("myAccount",myAccount,{expires:7,path:"/"});
            password = message[0].password;
            personImg = message[0].path;
            id = message[0].id;
            $.cookie("country",message[0].country,{expires:7,path:"/"});
            $.cookie("personImg","http://localhost:8080/getImgHead?image="+personImg,{expires:7,path:"/"});
            $.cookie("personImgPath",personImg,{expires:7,path:"/"});
            assignment();
            bindClick1();
        }
    })
}

/**
 * 赋值
 */
function assignment() {
    $("#netName").val(message[0].netName);
    $("#email").val(message[0].email);
    $("#country").val(message[0].country);
    $("#phone").val(message[0].phone);
    $("#signature").val(message[0].signature);
    $("#account").val(message[0].account);
    $("#bankName").val(message[0].bankName);
    $("#bankCard").val(message[0].bankCard);
    if (personImg != null && personImg != "" && personImg != "undefined"){
        $("#personImg").attr("src","http://localhost:8080/getImgHead?image="+personImg);
    }else{
        $("#personImg").attr("src","../img/logo/person2.jpg");
    }
}

/**
 * 修改信息
 */
function updateUser() {
    debugger;
    var url = baseUrl + "/updateUserMessage";
    var netName = $("#netName").val();
    var email = $("#email").val();
    var country = $("#country").val();
    var phone = $("#phone").val();
    var signature = $("#signature").val();
    var info = {};
    info.netName = netName;
    info.email = email;
    info.country = country;
    info.phone = phone;
    info.signature = signature;
    info.id = id;
    var obj = {};
    obj.info = JSON.stringify(info);
    $.ajax({
        url:url,
        data:obj,
        type:"POST",
        success:function (msg) {
            alert(msg);
        },
        error:function (e) {
            alert("操作失败!");
        }
    })

}
/**
 * 上传头像
 */
function loadWord(){
    $("#upload").click();
}

/**
 * 确定上传
 */
function uploadSure() {
    var url = baseUrl + "/uploadSure";
    var filePath = $("#upload").val();
    var imgObj = $("#upload")[0].files[0];
    var formData = new FormData();
    console.log(filePath);
    //上传朋友圈数据可append
    formData.append("file",imgObj);
    formData.append("name",name);
    formData.append("personImg",personImg);
    $.ajax({
        url:url,
        data:formData,
        type:"POST",
        async : false,
        contentType: false,// 告诉jQuery不要去设置Content-Type请求头
        cache: false, //缓存
        processData: false, // 告诉jQuery不要去处理发送的数据
        success:function (msg) {
            alert("头像修改成功！");
            window.history.go(0);
        }
    })

}


/**
 * 将复选框设置成单选
 */
function bindClick1() {
    debugger;
    $("input[name=box]").click(function () {
        $("input[name=box]").not(this).prop("checked",false);
    });
    $("input[name=bankBox]").click(function () {
        $("input[name=bankBox]").not(this).prop("checked",false);
    });
}

/**
 * 修改密码
 */
function updatePassword() {
    if (formatPassWord()){
        var newPassWord = $("#newpasswd1").val();
        var url = baseUrl + "/updatePassword";
        var obj = {};
        obj.newPassWord = md5(newPassWord);
        obj.id = id;
        $.ajax({
            url:url,
            data:obj,
            type:"POST",
            success:function (msg) {
                alert(msg);
            },
            error:function () {
                alert("密码修改失败！")
            }
        })
    }
}

/**
 * 判断用户输入密码格式
 */
function formatPassWord() {
    var passwd = $("#passwd").val();
    var p1 = $("#newpasswd1").val();
    var p2 = $("#newpasswd2").val();
    if (passwd=="" || passwd==null){
        alert("原密码不能为空！");
        return false;
    }
    if (p1=="" || p2==""){
        alert("新密码不能为空！");
        return false;
    }
    if (password != md5(passwd)){
        alert("原密码输入错误！");
        return false;
    }
    if (p1 != p2){
        alert("两次密码不一致！");
        return false;
    }
    if (md5(p1) == password){
        alert("新密码不能与原密码相同！");
        return false;
    }
    return true;
}