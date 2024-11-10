package com.example.health.mapper;

import com.example.health.bean.Admin;
import com.example.health.bean.Case;
import com.example.health.bean.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Monster
 */
@Repository
public interface LoginMapper {
    /**
     * 根据账户密码登录
     * @param name
     * @param password
     * @return
     */
    User loginMessage(@Param("name") String name, @Param("password")String password);

    Case loginDoctorMessage(String doctor, String password);

    Admin loginAdmin(String name, String password);
    /**
     * 找回密码
     * @param name
     * @param phone
     * @return
     */
    User forget(@Param("name")String name,@Param("phone")String phone);

    /**
     * 注册
     * @param user
     */
    void registered(User user);

    /**
     * 注册
     * @param c
     */
    void registeredD(Case c);

    /**
     * 判断当前注册用户名是否重复
     * @param name
     * @return
     */
    User nameRepeatYesOrNo(@Param("name")String name);

    /**
     * 根据手机查询密码
     * @param phone
     * @return
     */
    String Verification(String phone);


}
