var baseUrl = "http://localhost:8080";
var name = "";
var flag = "";
var receiveUserName = "";
var chatTitle = "";
var chatPrice = "";
var chatAbout = "";
var chatPath = "";
$(function () {
	name = $.cookie("name");
	flag = $.cookie("flag");
	if (flag == 1){
		$("#uploadWorks").hide();
		$("#buyMess").hide();
		$("#caozuo").hide();
		$("#shenhe").hide();
		$("#titleChat").html("画手交易平台(买家端)");
	}
	if (flag == 2){
		$("#liaotian").hide();
	}
	caseList();
});


function caseList() {
	var url = baseUrl + "/caseList";
	$.ajax({
		type:"POST",
		url:url,
		success:function (msg) {
			caseHtml(msg);
		}

	})
}

function uploadWorks() {
	layer.open({
		type: 1,
		title: "上传设计界面",
		content: $("#uploadWorksHtml"),
		area: ['30%','60%'],
	});
	$("#designer").val(name);
}

function sendUploadWorks() {
	var url = baseUrl + "/sendUploadWorks";
	var filePath = $("#show").val();
	var title = $("#title").val();
	var price = $("#price").val();
	var designer = $("#designer").val();
	var introduce = $("#introduce").val();
	if (filePath == "" || filePath == null|| title == ""|| price == ""|| designer == ""){
		alert("数据图片不可为空");
		return false;
	}
	var imgObj = $("#show")[0].files[0];
	var formData = new FormData();
	//上传朋友圈数据可append
	formData.append("file",imgObj);
	formData.append("title",title);
	formData.append("price",price);
	formData.append("designer",designer);
	formData.append("introduce",introduce);
	$.ajax({
		url:url,
		data:formData,
		type:"POST",
		async : false,
		contentType: false,// 告诉jQuery不要去设置Content-Type请求头
		cache: false, //缓存
		processData: false, // 告诉jQuery不要去处理发送的数据
		success:function (msg) {
			alert("作品上传成功！");
			window.history.go(0);
		}
	})
}

function caseHtml(msg) {
	var html = "";
	for (let i = 0; i < msg.length; i++) {
		if (flag == 1 && msg[i].point == 2){
			continue;
		}
		var pic = "http://localhost:8080/getImgHead?image="+msg[i].price;
		html += "<tr>";
		html += "<td class='pro-thumbnail'>"+(i+1)+"</td>";
		html += "<td class='pro-title'><span>"+(msg[i].content)+"</span></td>";
		html += "<td class='pro-price'><span>"+(msg[i].type)+"</span></td>";
		html += "<td class='pro-price'><span>"+(msg[i].doctor)+"</span></td>";
		html += "<td class='pro-quantity'><img src='"+pic+"'></td>";
		html += "<td class='pro-quantity'><span>"+(msg[i].introduce)+"</span></td>";
		if (flag == 1){
			html += "<td class='pro-remove'><a href='#' " +
				"onclick='chatLayerHtml(\""+msg[i].doctor+"\",\""+msg[i].content+"\",\""+msg[i].type+"\",\""+msg[i].introduce+"\",\""+msg[i].price+"\")'>私聊</a></td>";
		}
		if (flag == 2){
			var status = "";
			if (msg[i].point == 1){
				status = "已通过";
			}else {
				status = "未通过";
			}
			html += "<td class='pro-quantity'><span>"+status+"</span></td>";
			html += "<td class='pro-remove' id='shuju'><a href='#' onclick='editShow(\""+msg[i].id+"\")'>编辑</a>" +
				"<a href='#' style='margin-left: 8px' onclick='delShow(\""+msg[i].id+"\")'>删除</a></td>";
		}
		html += "</tr>";
	}
	$("#caseHtml").html(html);
}

function editShow(id) {
	var url = baseUrl + "/editShow";
	var obj = {};
	obj.id = id;
	$.ajax({
		type:"POST",
		data:obj,
		url:url,
		success:function (msg) {
			var pic = "http://localhost:8080/getImgHead?image="+msg.price;
			$("#uTitle").val(msg.content);
			$("#uPrice").val(msg.type);
			$("#uDesigner").val(msg.doctor);
			$("#uIntroduce").val(msg.introduce);
			$("#editId").val(msg.id);
			$("#uImg").attr("src",pic);
			layer.open({
				type: 1,
				title: "编辑设计界面",
				content: $("#editWorksHtml"),
				area: ['30%','60%'],
			});
		}
	})
}

function delShow(id) {
	var url = baseUrl + "/delShow";
	var obj = {};
	obj.id = id;
	$.ajax({
		type:"POST",
		data:obj,
		url:url,
		success:function (msg) {
			alert("作品删除成功！");
			window.history.go(0);
		}
	})
}

function dianPoint(id,i) {
	var url = baseUrl + "/addPoint";
	var obj = {};
	obj.id = id;
	$.ajax({
		type:"POST",
		data:obj,
		url:url,
		success:function (msg) {
			var number = $("#number"+i+"").text();
			number = parseInt(number)+1;
			$("#number"+i+"").text(number)
		}
	})
}
//对私聊的信息 进行获取插入chat表
function chatLayerHtml(receive,content,type,introduce,price) {
	chatTitle = content;
	chatAbout = introduce;
	chatPrice = type;
	chatPath = price;
	receiveUserName = receive;
	layer.open({
		type: 1,
		title: "聊天界面",
		content: $("#chatHtml"),
		area: ['60%','80%'],
	});
	chatList(receive);
	$("#chatName").text(receive)
}

function chatList(receive) {
	var url = baseUrl + "/chatList";
	var obj = {};
	obj.sendName = name;
	obj.receiveName = receive;
	$.ajax({
		type:"POST",
		data:obj,
		url:url,
		success:function (msg) {
			chatHtmlBuild(msg);
		}

	})
}

function chatHtmlBuild(msg) {
	var html = "";
		html += "<ul>";
	for (let i = 0; i < msg.length; i++) {
		var sendName = msg[i].sendName;
		var receiveName = msg[i].receiveName;
		var sendByName = msg[i].sendByName;
		if (sendByName == name){
			html += "<li class='msgright' style='list-style: none;'>";
			html += "<img style='border-radius: 20px; vertical-align: top;width: 35px;height: 35px;' class='msgright' src='img/head.gif'>";
			html += "<p class='msgcard msgright'>"+msg[i].content+"</p>";
			html += "</li>";
		}else{
			html += "<li class='msgleft' style='list-style: none;'>";
			html += "<img style='border-radius: 20px; vertical-align: top;width: 35px;height: 35px;' class='msgleft' src='img/head.gif'>";
			html += "<p class='msgcard msgleft'>"+msg[i].content+"</p>";
			html += "</li>";
		}
	}
	html += "</ul>";
	$("#chatHtmlBuild").html(html);
}

function sendChat() {
	var chatMess = $("#chatMess").val();
	var url = baseUrl + "/sendChat";
	var info = {};
	info.sendName = name;
	info.receiveName = receiveUserName;
	info.content = chatMess;
	info.sendByName = name;
	info.chatTitle = chatTitle;
	info.chatAbout = chatAbout;
	info.chatPrice = chatPrice;
	info.chatPath = chatPath;
	var obj = {};
	obj.info = JSON.stringify(info);
	$.ajax({
		type:"POST",
		data:obj,
		url:url,
		success:function (msg) {
			chatList(receiveUserName);
			$("#chatMess").val("");
		}
	})
}

function editUploadWorks() {
	var url = baseUrl + "/editUploadWorks";
	var filePath = $("#uShow").val();
	var title = $("#uTitle").val();
	var price = $("#uPrice").val();
	var designer = $("#uDesigner").val();
	var introduce = $("#uIntroduce").val();
	var id = $("#editId").val();
	if (filePath == "" || filePath == null|| title == ""|| price == ""|| designer == ""){
		alert("数据图片不可为空");
		return false;
	}
	var imgObj = $("#uShow")[0].files[0];
	var formData = new FormData();
	//上传朋友圈数据可append
	formData.append("file",imgObj);
	formData.append("title",title);
	formData.append("price",price);
	formData.append("designer",designer);
	formData.append("introduce",introduce);
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
			alert("作品修改成功！");
			window.history.go(0);
		}
	})
}