package com.example.health.controller;

import com.example.health.bean.Chat;
import com.example.health.bean.Information;
import com.example.health.service.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

/**
 * @author Monster
 */
@Controller
@ResponseBody
public class InformationController {

    @Autowired
    InformationService InformationService;


    @RequestMapping("/InformationList")
    public List<Chat> InformationList(String title) {
        return InformationService.InformationList(title);
    }

    @RequestMapping("/deleteInfor")
    public void deleteInfor(int id) {
         InformationService.deleteInfor(id);
    }

    @RequestMapping("/sureAddIn")
    public void sureAddIn(@RequestParam("file") MultipartFile file, String title, String kind,String content) throws IOException {
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
        InformationService.saveSureAddIn(fileName,title,kind,content);
    }

    @RequestMapping("/sureUpdateInfor")
    public void sureUpdateInfor(@RequestParam("file") MultipartFile file, String title, String kind,String content,int id) throws IOException {
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
        InformationService.sureUpdateInfor(id,fileName,title,kind,content);
    }

    @RequestMapping("/getImgHead")
    public void getImgHead(String image,HttpServletResponse response) throws IOException {
        //拼接路径
        String personHead = "D:/draw/img/"+image;
        //读取本地图片输入流
        FileInputStream inputStream = new FileInputStream(personHead);
        int i = inputStream.available();
        //byte数组用于存放图片字节数据
        byte[] buff = new byte[i];
        inputStream.read(buff);
        //记得关闭输入流
        inputStream.close();
        //设置发送到客户端的响应内容类型
        response.setContentType("image/*");
        OutputStream out = response.getOutputStream();
        out.write(buff);
        //关闭响应输出流
        out.close();
    }

    @RequestMapping("/selectKindContent")
    public List<Information> selectKindContent(String kind){
        return InformationService.selectKindContent(kind);
    }

    @RequestMapping("/selectTanKuang")
    public Information selectTanKuang(int id){
        Information information = InformationService.selectTanKuang(id);
        return information;
    }

    @RequestMapping("/readAdd")
    public void readAdd(int id){
        Information information = InformationService.selectTanKuang(id);
        String look = information.getLook();
        int num = Integer.parseInt(look);
        num++;
        InformationService.readAdd(id,num);
    }

}
