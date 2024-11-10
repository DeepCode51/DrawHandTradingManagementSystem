package com.example.health.mapper;
import com.example.health.bean.Opinion;
import com.example.health.bean.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 映射类接口
 * @author Xuan
 * @date 2019/9/17 17:51
 */
@Repository
public interface StudentMapper {
    /**
     * 查询信息
     * @param name
     * @return
     */
    User selectPersonContent(String name);

    /**
     * 修改信息
     * @param user
     */
    void updatePersonContent(User user);
    void deleteStu(int id);
    List<User> selectStu(String name);
    /**
     * 修改密码
     * @param password
     * @param id
     */
    void updatePassword(@Param("password") String password,@Param("id") int id);

    void sendOpinion(Opinion opinion);
    void deleteOpin(int id);
    List<Opinion> selectOpin(String sendName);
}
