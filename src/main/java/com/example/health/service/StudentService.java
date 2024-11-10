package com.example.health.service;


import com.example.health.bean.Opinion;
import com.example.health.bean.User;

import java.util.List;

/**
 * @author Xuan
 * @date 2019/9/17 17:53
 */
public interface StudentService {
    /**
     * 查询信息
     * @param name
     * @return
     */
    User selectPersonContent(String name);

    List<User> selectStu(String name);
    void deleteStu(int id);

    /**
     * 修改信息
     * @param user
     */
    void updatePersonContent(User user);

    /**
     * 修改密码
     * @param password
     * @param id
     */
    void updatePassword(String password,int id);

    void sendOpinion(Opinion opinion);


    void deleteOpin(int id);
    List<Opinion> selectOpin(String sendName);
}
