var baseUrl = "http://localhost:8080";
var doctor = "";
var sendUserName = "";
var content = "";
var type = "";
var price = "";
var point = "";
var flag = "";
var chatTitle = "";
var chatPrice = "";
var chatAbout = "";
var chatPath = "";
$(function () {
	doctor = $.cookie("name");
	flag = $.cookie("name");
	if (flag == 1){
		$("#buyMess").hide();
	}
	caseDoctorChat();
});

function caseDoctorChat() {
	var url = baseUrl + "/caseDoctorChat";
	var obj = {};
	obj.receiveName = doctor;
	$.ajax({
		type:"POST",
		data:obj,
		url:url,
		success:function (msg) {
			caseDoctorHtml(msg);
		}
	})
}

function caseDoctorHtml(msg) {
	var html = "";
	var arr = [];
	var num = 0;
	for (let i = 0; i < msg.length; i++) {
		var exists = arr.indexOf(msg[i].sendName);
		arr.push(msg[i].sendName);
		var pic = "http://localhost:8080/getImgHead?image="+msg[i].chatPath;
		if (exists != 0){
			num ++;
			html += "<tr>";
			html += "<td class='pro-thumbnail'>"+(num)+"</td>";
			html += "<td class='pro-title'><span>"+msg[i].chatTitle+"</span></td>";
			html += "<td class='pro-price'><span>"+msg[i].chatPrice+"</span></td>";
			html += "<td class='pro-price'><span>"+msg[i].sendName+"</span></td>";
			html += "<td class='pro-quantity'><img src='"+pic+"'></td>";
			html += "<td class='pro-quantity'><span>"+msg[i].chatAbout+"</span></td>";
			html += "<td class='pro-remove'><a href='#' onclick='chatLayerHtml(\""+msg[i].sendName+"\",\""+msg[i].chatTitle+"\",\""+msg[i].chatPrice+"\",\""+msg[i].chatAbout+"\",\""+msg[i].chatPath+"\")'>回复</a></td>";
			html += "</tr>";
		}
	}
	$("#caseHtml").html(html);
}


function chatLayerHtml(sendName,title,price,about,path) {
	sendUserName = sendName;
	chatTitle = title;
	chatAbout = about;
	chatPrice = price;
	chatPath = path;
	layer.open({
		type: 1,
		title: "聊天界面",
		content: $("#chatHtml"),
		area: ['60%','80%'],
	});
	chatList(sendName);
	$("#chatName").text(sendName);
}

function chatList(sendName) {
	var url = baseUrl + "/chatList";
	var obj = {};
	obj.sendName = doctor;
	obj.receiveName = sendName;
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
		if (sendByName == doctor){
			html += "<li class='msgright' style='list-style: none;'>";
			html += "<img style='border-radius: 20px; vertical-align: top;width: 35px;height: 35px;' class='msgright' src='../img/head.gif'>";
			html += "<p class='msgcard msgright'>"+msg[i].content+"</p>";
			html += "</li>";
		}else{
			html += "<li class='msgleft' style='list-style: none;'>";
			html += "<img style='border-radius: 20px; vertical-align: top;width: 35px;height: 35px;' class='msgleft' src='../img/head.gif'>";
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
	info.sendName = doctor;
	info.receiveName = sendUserName;
	info.content = chatMess;
	info.sendByName = doctor;
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
			chatList(sendUserName);
			$("#chatMess").val("");
		}
	})
}