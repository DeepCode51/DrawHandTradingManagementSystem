package com.example.health.mapper;

import com.example.health.bean.Case;
import com.example.health.bean.Chat;
import com.example.health.bean.Information;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Monster
 */
@Repository
public interface InformationMapper {

    List<Chat> InformationList(String title);

    void deleteInfor(int id);

    void saveSureAddIn(String fileName,String title,String kind,String content);

    void sureUpdateInfor(int id,String fileName,String title,String kind,String content);

    List<Information> selectKindContent(String kind,int start);

    int selectCount(String kind);

    Information selectTanKuang(int id);

    void readAdd(int id,int num);
}
