package com.example.health.serviceimpl;

import com.example.health.bean.Opinion;
import com.example.health.bean.User;
import com.example.health.mapper.StudentMapper;
import com.example.health.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Xuan
 * @date 2019/9/17 17:53
 */
@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentMapper studentMapper;

    /**
     * 查询信息
     * @param name
     * @return
     */
    @Override
    public User selectPersonContent(String name){
        User user = studentMapper.selectPersonContent(name);
        return user;
    }

    @Override
    public List<User> selectStu(String name) {
        return studentMapper.selectStu(name);
    }

    @Override
    public void deleteStu(int id) {
        studentMapper.deleteStu(id);
    }

    @Override
    public void updatePersonContent(User user) {
        studentMapper.updatePersonContent(user);
    }

    @Override
    public void updatePassword(String password, int id) {
        studentMapper.updatePassword(password, id);
    }

    @Override
    public void sendOpinion(Opinion opinion) {
        studentMapper.sendOpinion(opinion);
    }

    @Override
    public void deleteOpin(int id) {
        studentMapper.deleteOpin(id);
    }

    @Override
    public List<Opinion> selectOpin(String sendName) {
        return studentMapper.selectOpin(sendName);
    }
}
