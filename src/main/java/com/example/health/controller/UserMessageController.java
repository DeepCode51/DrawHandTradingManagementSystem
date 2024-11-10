package com.example.health.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.health.bean.Dynamic;
import com.example.health.bean.User;
import com.example.health.bean.userBankCard;
import com.example.health.service.DynamicService;
import com.example.health.service.UserSerivce;
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
@ResponseBody
@Controller
public class UserMessageController {

    @Autowired
    DynamicService DynamicService;

    @Autowired
    private UserSerivce userSerivce;

    /**
     * 查询个人信息
     * @param name
     * @return
     */
    @RequestMapping("/selectPersonalInformation")
    public List<userBankCard> selectPersonalInformation(String name){
        List<userBankCard> userBankCard = null;
        userBankCard = userSerivce.selectPersonalInformation(name);
        if (userBankCard.size() == 0){
            userBankCard = userSerivce.selectUserInformation(name);
            return userBankCard;
        }
        return userBankCard;
    }

    /**
     * 更换头像
     * @param file
     * @param name
     * @throws IOException
     */
    @RequestMapping("/uploadSure")
    public void uploadSure(@RequestParam("file") MultipartFile file, String name, String personImg) throws IOException {
        //图片名字
        String fileName = file.getOriginalFilename();
        //存储路径
        String path = "D:/draw/img/"+fileName;
        File person = new File(path);
        if (!person.exists()){
            person.mkdirs();
        }
        //将文件图片写入此文件夹
        file.transferTo(person);
        //成功之后将此图片给数据库
        DynamicService.savePersonHead(fileName,name);
        //将动态社交属于自己所有的发表内容头像修改
        DynamicService.updateDynamicHead(personImg,fileName);
    }

    /**
     * 更新信息
     * @param info
     * @return
     */
    @RequestMapping("/updateUserMessage")
    public String updateUserMessage(String info){
        User user = new User();
        user = JSONObject.parseObject(info, user.getClass());
        userSerivce.updateUserMessage(user);
        return "信息修改成功！";
    }

    /**
     * 修改密码
     * @param id
     * @param newPassWord
     * @return
     */
    @RequestMapping("/updatePassword")
    public String updatePassword(int id,String newPassWord){
        userSerivce.updatePassword(newPassWord,id);
        return "密码修改成功！";
    }

    /**
     * 用户发表意见
     * @return
     */
    @RequestMapping("/sendMessage")
    public String sendMessage(String sendName,String phone,String email,String time,String message,String name){
        userSerivce.sendMessage(sendName,phone,email,time,message,name);
        return "意见发表成功！";
    }

    /**
     * 发送朋友圈
     * @param file
     * @param name
     * @param address
     * @param time
     * @param content
     * @param photo
     * @throws IOException
     */
    @RequestMapping("/uploadPicture")
    public void uploadPicture(@RequestParam("file") MultipartFile file,String name,String address,String time,String content,String photo) throws IOException {
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
        com.example.health.bean.Dynamic dynamic = new Dynamic();
        dynamic.setDynamicAddress(address);
        dynamic.setDynamicContent(content);
        dynamic.setDynamicPath(fileName);
        dynamic.setDynamicSendName(name);
        dynamic.setDynamicTime(time);
        dynamic.setDynamicPhoto(photo);
        DynamicService.saveDynamicContent(dynamic);
    }
}
