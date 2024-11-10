package com.example.health.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.health.bean.Case;
import com.example.health.bean.Chat;
import com.example.health.bean.Dynamic;
import com.example.health.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * @author Monster
 */
@Controller
@ResponseBody
public class ChatController {

    @Autowired
    ChatService chatService;

    /**
     * 聊天记录
     * @return
     */
    @RequestMapping("/chatList")
    public List<Case> chatList(String sendName,String receiveName) {
        return chatService.chatList(sendName,receiveName);
    }

    /**
     * 发送
     * @return
     */
    @RequestMapping("/sendChat")
    public void sendChat(String info) {
        Chat chat = JSONObject.parseObject(info, Chat.class);
        chatService.sendChat(chat);
    }

    @RequestMapping("/sendUploadWorks")
    public void sendUploadWorks(@RequestParam("file") MultipartFile file, String title, String price, String designer,String introduce) throws IOException {
        //图片名字
        String fileName = file.getOriginalFilename();
        //存储路径 获取当前resources静态文件下DynamicImg文件目录
        String path = "D:/draw/img/"+fileName;
        File Dynamic = new File(path);
        if (!Dynamic.exists()){
            Dynamic.mkdirs();
        }
        //将文件图片写入此文件夹
        file.transferTo(Dynamic);
        //成功之后将此图片给数据库
        Case c = new Case();
        c.setPrice(fileName);//作品
        c.setContent(title);
        c.setType(price);
        c.setDoctor(designer);
        c.setIntroduce(introduce);
        chatService.sendUploadWorks(c);
    }

    @RequestMapping("/editUploadWorks")
    public void editUploadWorks(@RequestParam("file") MultipartFile file, String title, String price, String designer,String introduce,int id) throws IOException {
        //图片名字
        String fileName = file.getOriginalFilename();
        //存储路径 获取当前resources静态文件下DynamicImg文件目录
        String path = "D:/draw/img/"+fileName;
        File Dynamic = new File(path);
        if (!Dynamic.exists()){
            Dynamic.mkdirs();
        }
        //将文件图片写入此文件夹
        file.transferTo(Dynamic);
        //成功之后将此图片给数据库
        Case c = new Case();
        c.setPrice(fileName);//作品
        c.setContent(title);
        c.setType(price);
        c.setDoctor(designer);
        c.setIntroduce(introduce);
        c.setId(id);
        chatService.editUploadWorks(c);
    }



}
