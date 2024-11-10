package com.example.health.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.health.bean.Case;
import com.example.health.bean.Chat;
import com.example.health.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.List;

/**
 * @author Monster
 */
@Controller
@ResponseBody
public class CaseController {

    @Autowired
    CaseService caseService;

    /**
     * 案例交流
     * @return
     */
    @RequestMapping("/caseList")
    public List<Case> caseList(String doctor) {
        return caseService.caseList(doctor);
    }


    @RequestMapping("/addPoint")
    public void addPoint(int id) {
        int point = caseService.selectCase(id);
        point ++;
        caseService.addPoint(point,id);
    }

    @RequestMapping("/caseDoctor")
    public Case caseDoctor(String doctor){
        Case aCase = caseService.caseDoctor(doctor);
        return aCase;
    }

    @RequestMapping("/caseDoctorChat")
    public List<Chat> caseDoctorChat(String receiveName){
        List<Chat> chat = caseService.caseDoctorChat(receiveName);
        return chat;
    }
    @RequestMapping("/deleteDoc")
    public void deleteDoc(int id){
         caseService.deleteDoc(id);
    }

    @RequestMapping("/sureChan")
    public void sureChan(String info){
        Case aCase = JSONObject.parseObject(info, Case.class);
        caseService.sureChan(aCase);
    }


    @RequestMapping("/deleteBook")
    public void deleteBook(int id){
        caseService.deleteBook(id);
    }


    @RequestMapping("/downLoad")
      public void download(String bookPath, HttpServletResponse response) throws IOException {
        // path是指欲下载的文件的路径。
        File file = new File(bookPath);
        String fileName = file.getName();
        ServletOutputStream out = null;
        FileInputStream in = null;
        try {
            in = new FileInputStream(file);
            String[] array = fileName.split("[.]");
            String fileType = array[array.length-1].toLowerCase();
            //设置文件ContentType类型
            if("jpg,jepg,gif,png".contains(fileType)){//图片类型
                response.setContentType("image/"+fileType);
            }else if("pdf".contains(fileType)){//pdf类型
                response.setContentType("application/pdf");
            }else{//自动判断下载文件类型
                response.setContentType("multipart/form-data");
            }
            //设置文件头：最后一个参数是设置下载文件名
            response.setHeader("Content-Disposition", "attachment;fileName="+ URLEncoder.encode(fileName, "UTF-8"));
            out = response.getOutputStream();
            // 读取文件流
            int len = 0;
            byte[] buffer = new byte[1024 * 10];
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
            out.flush();
        } catch (Exception e) {
            e.getStackTrace();
        }  finally {
            try {
                out.close();
                in.close();
            } catch (Exception e) {
                e.getStackTrace();
            }
        }
    }
    @RequestMapping("/delShow")
    public void delShow(int id){
        caseService.delShow(id);
    }

    @RequestMapping("/editShow")
    public Case editShow(int id){
        return caseService.editShow(id);
    }

    @RequestMapping("/showPass")
    public void showPass(int id){
        caseService.showPass(id);
    }

}
