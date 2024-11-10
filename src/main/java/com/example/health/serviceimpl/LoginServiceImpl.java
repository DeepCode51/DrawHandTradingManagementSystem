package com.example.health.serviceimpl;

import com.example.health.bean.Admin;
import com.example.health.bean.Case;
import com.example.health.bean.User;
import com.example.health.mapper.LoginMapper;
import com.example.health.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Monster
 */
@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    LoginMapper loginMapper;

    @Override
    public User loginMessage(String name, String password) {
        return loginMapper.loginMessage(name,password);
    }

    @Override
    public Case loginDoctorMessage(String name, String password) {
        return loginMapper.loginDoctorMessage(name, password);
    }

    @Override
    public Admin loginAdmin(String name, String password) {
        return loginMapper.loginAdmin(name,password);
    }

    @Override
    public User forget(String name, String phone) {
        return loginMapper.forget(name, phone);
    }

    @Override
    public void registered(User user) {
        loginMapper.registered(user);
    }

    @Override
    public void registeredD(Case c) {
        loginMapper.registeredD(c);
    }

    @Override
    public String Verification(String phone) {
        return loginMapper.Verification(phone);
    }

    @Override
    public User nameRepeatYesOrNo(String name) {
        return loginMapper.nameRepeatYesOrNo(name);
    }

}
