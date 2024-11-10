package com.example.health.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.health.bean.Opinion;
import com.example.health.bean.User;
import com.example.health.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


/**
 * @author Xuan
 * @date 2019/9/17 17:53
 */
@Controller
@ResponseBody
public class StudentController {

    @Autowired
    StudentService studentService;

    /**
     * 查询信息
     * @param name
     * @return
     */
    @RequestMapping("/selectPersonContent")
    public User selectPersonContent(String name){
        User user = studentService.selectPersonContent(name);
        return user;
    }

    @RequestMapping("/selectStu")
    public List<User> selectStu(String name){
        List<User> user = studentService.selectStu(name);
        return user;
    }
    @RequestMapping("/deleteStu")
    public void deleteStu(int id){
        studentService.deleteStu(id);
    }

    /**
     * 修改信息
     * @param info
     */
    @RequestMapping("/updatePersonContent")
    public void updatePersonContent(String info){
        User user = new User();
        user = JSONObject.parseObject(info,user.getClass());
        studentService.updatePersonContent(user);
    }

    /***
     * 发表建议
     * @param info
     */
    @RequestMapping("/sendOpinion")
    public void sendOpinion(String info){
        Opinion opinion = JSONObject.parseObject(info, Opinion.class);
        studentService.sendOpinion(opinion);
    }
    /***
     * 意见箱
     * @param
     */
    @RequestMapping("/selectOpin")
    public List<Opinion> selectOpin(String sendName){
        List<Opinion> opinion = studentService.selectOpin(sendName);
        return opinion;
    }

    /***
     * 意见箱
     * @param
     */
    @RequestMapping("/deleteOpin")
    public void deleteOpin(int id){
        studentService.deleteOpin(id);
    }


}
