var baseUrl = "http://localhost:8080";
var DynamicMessage = "";
var name = "";
var address = "";
var nowTime = "";
var personImg = "";
var personImgPath = "";
var praise = "";
var flag = "";
$(function () {
	name = $.cookie("name");
	personImg = $.cookie("personImg");
	personImgPath = $.cookie("personImgPath");
	address = $.cookie("country");
	flag = $.cookie("flag");
	if (flag == 1){
		$("#buyMess").hide();
	}
	$("a[name='jumpShoes']").attr("href","../shop/Shop.html");
	$("#rightHead").attr("src",personImg);
	selectDynamic();
});

/**
 * 查询所有动态内容
 */
function selectDynamic() {
	var url = baseUrl + "/selectDynamic";
	$.ajax({
		url:url,
		type:"POST",
		success:function (msg) {
			DynamicMessage = msg;
			dynamicHtml();
		}
	})
}


/**
 * 渲染朋友圈页面
 */
function dynamicHtml() {
	var s = "";
	for (var i = DynamicMessage.length-1; i >= 0; i--) {
		s += "<div class='stateShow'>";
		s += "<div class='stateShowWord'>";
		s += "<table width='450' border='0' cellpadding='0' cellspacing='0' class='stateTable'>";
		s += "<tr>";
		s += "<td width='70' align='center' valign='top'><a href='#'><img src='http://localhost:8080/getImgHead?image="+DynamicMessage[i].dynamicPhoto+"' id='dynamicHead' width='48' height='48' /></a></td>";
		s += "<td width='380'><a href='#'>"+DynamicMessage[i].dynamicSendName+"</a><br>"+DynamicMessage[i].dynamicContent+"</td>";
		s += "</tr>";
		s += "</table>";
		s += "</div>";
		if (DynamicMessage[i].dynamicPath != null && DynamicMessage[i].dynamicPath != ""){
			s += "<div class='stateImgShow'><img src='http://localhost:8080/getImgHead?image="+DynamicMessage[i].dynamicPath+"' id='dynamicImgPath' style='width: 150px;height: 120px'/></div>";
		}
		s += "<div class='stateShowtime'>"+DynamicMessage[i].dynamicTime+"&nbsp;&nbsp;"+DynamicMessage[i].dynamicAddress+"</div>";
		s += "<div class='stateShowtime' style='margin-left: 200px'>" +
			"<a href='javascript:void(0)' class='chat icon' style='margin-top: 14px;margin-left: 20px' onclick='clickComment("+i+")'></a>" +
			"<a href='javascript:void(0)' class='thumbs_button fa fa-thumbs-up' onclick='clickPraise("+i+")' style='color: #eb7350;text-decoration: none;margin-left: 60px' title='点赞，支持一下'> 点赞" +
			"<span id='praise"+i+"'>("+DynamicMessage[i].dynamicZanNum+")</span></a>" +
			"</div>";
		s += "</div>";
		// 评论
		s += "<div id='comment"+i+"'>";
		s += "</div>";
	}
	$("#mainBannerContent").html(s);
	changeDivHeight();
}

/**
 * 评论html
 */
function commentHtml(i,msg) {
	var s = "";
	s += "<div class='comment-wrap'>";
	s += "<div class='photo'>";
	s += "<div class='avatar'></div>";
	s += "</div>";
	s += "<div class='comment-block'>";
	s += "<form action=''>";
	s += "<textarea name='' id='commentContent"+i+"' cols='30' rows='3' placeholder='Say something...'></textarea>";
	s += "</form>";
	s += "</div>";
	s += "</div>";
	s += "<button class='btn btn-sqr' style='margin-left: 364px;width: 114px;height: 42px' onclick='sendComment("+i+")'>确定评论</button>";
	for (var j = 0; j < msg.length; j++) {
		s += "<div class='comment-wrap'>";
		s += "<div class='photo'>";
		s += "<div>" +
			"<img src='http://localhost:8080/getImgHead?image="+msg[j].photo+"' style='width: 50px;height: 40px;border-radius: 25px'/></div>";
		s += "</div>";
		s += "<div class='comment-block'>";
		s += "<div class='bottom-comment'>";
		s += "<div class='comment-date'><span style='color: #eb7350'>"+msg[j].sendName+"</span>&nbsp;:&nbsp;&nbsp;&nbsp;</div>";
		s += "<div class='comment-date' style='color: dimgrey'>"+msg[j].content+"</div><br>";
		s += "<div class='comment-date'>"+msg[j].time+"</div>";
		s += "</div>";
		s += "</div>";
		s += "</div>";
	}
	return s;
}
/**
 * 点赞
 * @constructor
 */
function clickPraise(i) {
	var dynamicZanNum = DynamicMessage[i].dynamicZanNum;
	var id = DynamicMessage[i].dynamicID;
	praise = dynamicZanNum + 1;
	$("#praise"+i).text("("+praise+")");
	var url = baseUrl + "/clickPraise";
	var obj = {};
	obj.praise = praise;
	obj.id = id;
	$.ajax({
		url:url,
		data:obj,
		type:"POST",
		success:function (msg) {}
	})
}

/**
 * 发表评论
 */
function sendComment(i) {
	var content = $("#commentContent"+i).val(); //发表内容
	var time = nowTimeFormat();//发表时间
	var sendName = name;//发送人姓名
	var photo = personImgPath;//发送人头像
	var commentName = DynamicMessage[i].dynamicSendName;// 以前帖子姓名
	var commentPath = DynamicMessage[i].dynamicPath; // 以前帖子图片地址
	var commentContent = DynamicMessage[i].dynamicContent; //以前帖子内容
	if (content != null && content != ""){
		var url = baseUrl + "/sendComment";
		var info = {};
		info.content = content;
		info.time = time;
		info.sendName = sendName;
		info.photo = photo;
		info.commentName = commentName;
		info.commentPath = commentPath;
		info.commentContent = commentContent;
		var obj = {};
		obj.info = JSON.stringify(info);
		$.ajax({
			url:url,
			data:obj,
			type:"POST",
			success:function () {
				alert("当前评论发表完成！");
				history.go(0);
			}
		})
	}else {
		alert("当前发送内容不可为空！");
	}

}
/**
 * 点击评论(先做查询)
 */
function clickComment(i) {
	var url = baseUrl + "/clickComment";
	var obj = {};
	obj.commentName = DynamicMessage[i].dynamicSendName;// 以前帖子姓名
	obj.commentPath = DynamicMessage[i].dynamicPath; // 以前帖子图片地址
	obj.commentContent = DynamicMessage[i].dynamicContent; //以前帖子内容
	$.ajax({
		url:url,
		data:obj,
		type:"POST",
		success:function (msg) {
			// console.log(JSON.stringify(msg))
			var s = commentHtml(i,msg);
			$("#comment"+i).html(s);
			changeDivHeight();
		}
	})

}

/**
 * 封装上传
 * @constructor
 */
function PackageUpload() {
	$("#file").click();
}

/**
 * 发送朋友圈(有图片)
 */
function uploadImg() {
	var url = baseUrl + "/uploadPicture";
	var filePath = $("#file").val();
	var imgObj = $("#file")[0].files[0];
	if(filePath != "" && filePath != null && filePath != "undefined"){
		var formData = new FormData();
		var content = $("#textfield2").val();
		nowTime = nowTimeFormat();
		console.log(nowTime+filePath+content);
		//上传朋友圈数据可append
		formData.append("file",imgObj);
		formData.append("name",name);
		formData.append("address",address);
		formData.append("time",nowTime);
		formData.append("content",content);
		formData.append("photo",personImgPath);
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
		sendDynamicContent();
	}

}

/**
 * 发送朋友圈(无图片形式)
 */
function sendDynamicContent() {
	var content = $("#textfield2").val();
	var url = baseUrl +"/sendDynamicContent";
	var info = {};
	info.DynamicSendName = name;
	info.DynamicTime = nowTimeFormat();
	info.DynamicAddress = address;
	info.DynamicContent = content;
	info.DynamicPhoto = personImgPath;
	var obj = {};
	obj.info = JSON.stringify(info);
	$.ajax({
		url:url,
		data:obj,
		type:"POST",
		success:function () {
			alert("发表成功！");
			window.history.go(0);
		}
	})

}
/* 设置页面中的主题部分的左栏和右栏部分高度为自动 */
function initDivHeight(divObj1,divObj2){
	divObj1.style.height = "auto";
	divObj2.style.height = "auto";
}

/* 设置主体部分的高度以实际高度高的那个为准 */
function changeDivHeight(){
	var mainBanner = document.getElementById("mainBanner");
	var mainRight = document.getElementById("mainRight");
	initDivHeight(mainBanner,mainRight);//设置高度为自动
	var height = mainBanner.offsetHeight > mainRight.offsetHeight ? mainBanner.offsetHeight : mainRight.offsetHeight;//获取高度高的值
	mainBanner.style.height = height + "px";//为他们的高度都赋高的那个值
	mainRight.style.height = height+ "px";//
}

/* 生成当前的时间 */
function nowTimeFormat(){
	var today = new Date();
	var month = today.getMonth();
	var day = today.getDate();
	var hour = today.getHours();
	var minits = today.getMinutes();
	/* 对数字中不到2位数的处理，前面加0 */
	if(month<9){
		month += 1;
		month="0"+month;
	}
	if(day<10){
		day="0"+day;
	}
	if(hour<10){
		hour="0"+hour;
	}
	if(minits<10){
		minits="0" + minits;
	}
	var str = month+"月"+day+"日";
	return str;
}

/**
 * 时刻监测文本框的字数
 */
$('#textfield2').keyup(function () {
	var textLength = $("#textfield2").val().length;
	if (textLength>140){
		return false;
	}
	$("#wordNumber").text(140-textLength);
});
