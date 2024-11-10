package com.example.health.serviceimpl;

import com.example.health.bean.Comment;
import com.example.health.bean.Dynamic;
import com.example.health.mapper.DynamicMapper;
import com.example.health.service.DynamicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Monster
 */
@Service
public class DynamicServiceImpl implements DynamicService {

    @Autowired
    com.example.health.mapper.DynamicMapper DynamicMapper;

    @Override
    public List<Dynamic> selectDynamic(String DynamicSendName) {
        return DynamicMapper.selectDynamic(DynamicSendName);
    }

    @Override
    public List<Dynamic> selectDynamicMe(String setName) {
        return DynamicMapper.selectDynamicMe(setName);
    }


    @Override
    public void saveDynamicContent(Dynamic dynamic) {
        DynamicMapper.saveDynamicContent(dynamic);
    }

    @Override
    public void savePersonHead(String personHead, String name) {
        DynamicMapper.savePersonHead(personHead, name);
    }

    @Override
    public int selectVBNum(String name) {
        return DynamicMapper.selectVBNum(name);
    }

    @Override
    public void deleteDynamic(int ID) {
        DynamicMapper.deleteDynamic(ID);
    }

    @Override
    public void sendDynamicContent(Dynamic dynamic) {
        DynamicMapper.sendDynamicContent(dynamic);
    }

    @Override
    public void updateDynamicHead(String personImg,String fileName) {
        DynamicMapper.updateDynamicHead(personImg,fileName);
    }

    @Override
    public void clickPraise(int praise, int id) {
        DynamicMapper.clickPraise(praise, id);
    }

    @Override
    public void sendComment(Comment comment) {
        DynamicMapper.sendComment(comment);
    }

    @Override
    public List<Comment> clickComment(String commentName, String commentPath, String commentContent) {
        return DynamicMapper.clickComment(commentName, commentPath, commentContent);
    }
}
