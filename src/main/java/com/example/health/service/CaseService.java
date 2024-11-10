package com.example.health.service;

import com.example.health.bean.Case;
import com.example.health.bean.Chat;

import java.util.List;

/**
 * @author Monster
 */
public interface CaseService {

    List<Case> caseList(String doctor);

    void addPoint(int point,int id);

    int selectCase(int id);

    Case caseDoctor(String name);

    List<Chat> caseDoctorChat(String receiveName);

    void deleteDoc(int id);
    void sureChan(Case c);
    void deleteBook(int id);

    void delShow(int id);

    Case editShow(int id);

    void showPass(int id);
}
