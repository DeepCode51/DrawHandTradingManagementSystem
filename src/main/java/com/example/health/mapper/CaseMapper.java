package com.example.health.mapper;

import com.example.health.bean.Case;
import com.example.health.bean.Chat;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Monster
 */
@Repository
public interface CaseMapper {

    List<Case> caseList(String doctor);

    void addPoint(int point,int id);

    int selectCase(int id);

    Case caseDoctor(String doctor);

    List<Chat> caseDoctorChat(String receiveName);

    void deleteDoc(int id);

    void sureChan(Case c);

    void deleteBook(int id);

    void delShow(int id);

    Case editShow(int id);

    void showPass(int id);
}
