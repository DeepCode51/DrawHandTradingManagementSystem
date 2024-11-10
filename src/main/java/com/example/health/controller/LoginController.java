package com.example.health.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.health.bean.Admin;
import com.example.health.bean.Case;
import com.example.health.bean.User;
import com.example.health.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Monster
 */
@Controller
@ResponseBody
public class LoginController {

    @Autowired
    LoginService loginService;

    /**
     * 登录信息
     * @param name
     * @param password
     * @param request
     * @param code
     * @return
     */
    @RequestMapping("/loginMessage")
    public User loginMessage(String name, String password, HttpServletRequest request,String code){
        User user = loginService.loginMessage(name, password);
        request.getSession().setAttribute("name",name);
        String verifyCode = (String)request.getSession().getAttribute("verifyCode");
        verifyCode= verifyCode.toLowerCase();
        if (!verifyCode.equals(code)){
            return null;
        }
        if (user != null){
            request.getSession().setAttribute("loginPassword",password);
            return user;
        }
        return null;
    }

    @RequestMapping("/loginDoctorMessage")
    public int loginDoctorMessage(String name, String password, HttpServletRequest request,String code){
        Case c = loginService.loginDoctorMessage(name, password);
        String verifyCode = (String)request.getSession().getAttribute("verifyCode");
        verifyCode= verifyCode.toLowerCase();
        if (!verifyCode.equals(code)){
            return 111111;
        }
        if (c != null){
            return c.getId();
        }
        return 0;
    }

    @RequestMapping("/loginAdmin")
    public int loginAdmin(String name, String password){
        Admin admin = loginService.loginAdmin(name, password);
        if (admin != null){
            return admin.getId();
        }
        return 0;
    }




    /**
     * 忘记密码
     * @param name
     * @param phone
     * @return
     */
    @RequestMapping("/forget")
    public String forget(String name,String phone){
        User user = loginService.forget(name, phone);
        if (user != null){
            String password = user.getPassword();
            return password;
        }else {
            return "当前填写信息不对！";
        }

    }

    /**
     * 注册用户
     * @param info
     * @return
     */
    @RequestMapping("/registeredUser")
    public String registered(String info){
        User user = new User();
        user = JSONObject.parseObject(info,user.getClass());
        loginService.registered(user);
        return "注册成功！";
    }

    /**
     * 注册医生
     * @param info
     * @return
     */
    @RequestMapping("/registeredD")
    public String registeredD(String info){
        Case c = new Case();
        c = JSONObject.parseObject(info,c.getClass());
        loginService.registeredD(c);
        return "注册成功！";
    }


    /**
     * 判断当前注册用户名是否重复
     * @param name
     * @return
     */
    @RequestMapping("/nameRepeatYesOrNo")
    public String nameRepeatYesOrNo(String name){
        User user = loginService.nameRepeatYesOrNo(name);
        if (user != null){
            return "y";
        }
        return "n";
    }

    @RequestMapping("/Verification")
    public String Verification(String phone){
        String password = loginService.Verification(phone);
        if (password != null){
            return password;
        }else{
            return "111";
        }
    }
}
