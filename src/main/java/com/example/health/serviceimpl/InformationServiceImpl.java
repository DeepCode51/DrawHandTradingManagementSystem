package com.example.health.serviceimpl;

import com.example.health.bean.Case;
import com.example.health.bean.Chat;
import com.example.health.bean.Information;
import com.example.health.mapper.CaseMapper;
import com.example.health.mapper.InformationMapper;
import com.example.health.service.CaseService;
import com.example.health.service.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Monster
 */
@Service
public class InformationServiceImpl implements InformationService {
 
    @Autowired
    InformationMapper informationMapper;
    
    @Override
    public List<Chat> InformationList(String title) {
        return informationMapper.InformationList(title);
    }

    @Override
    public void deleteInfor(int id) {
        informationMapper.deleteInfor(id);
    }

    @Override
    public void saveSureAddIn(String fileName, String title, String kind,String content) {
        informationMapper.saveSureAddIn(fileName, title, kind,content);
    }

    @Override
    public void sureUpdateInfor(int id, String fileName, String title, String kind, String content) {
        informationMapper.sureUpdateInfor(id,fileName,title,kind,content);
    }

    @Override
    public List<Information> selectKindContent(String kind) {
        int start = informationMapper.selectCount(kind);
        if (start >= 3){
            start -= 3;
        }else{
            start = 0;
        }
        return informationMapper.selectKindContent(kind,start);
    }

    @Override
    public Information selectTanKuang(int id) {
        return informationMapper.selectTanKuang(id);
    }

    @Override
    public void readAdd(int id,int num) {
        informationMapper.readAdd(id,num);
    }
}
