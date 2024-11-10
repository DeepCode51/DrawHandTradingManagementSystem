package com.example.health.serviceimpl;

import com.example.health.bean.Case;
import com.example.health.bean.Chat;
import com.example.health.mapper.CaseMapper;
import com.example.health.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

/**
 * @author Monster
 */
@Service
public class CaseServiceImpl implements CaseService {

    @Autowired
    CaseMapper caseMapper;

    @Override
    public List<Case> caseList(String doctor) {
        return caseMapper.caseList(doctor);
    }

    @Override
    public void addPoint(int point,int id) {
        caseMapper.addPoint(point,id);
    }

    @Override
    public int selectCase(int id) {
        return caseMapper.selectCase(id);
    }

    @Override
    public Case caseDoctor(String name) {
        return caseMapper.caseDoctor(name);
    }

    @Override
    public List<Chat> caseDoctorChat(String receiveName) {
        return caseMapper.caseDoctorChat(receiveName);
    }

    @Override
    public void deleteDoc(int id) {
        caseMapper.deleteDoc(id);
    }

    @Override
    public void sureChan(Case c) {
        caseMapper.sureChan(c);
    }

    @Override
    public void deleteBook(int id) {
        caseMapper.deleteBook(id);
    }

    @Override
    public void delShow(int id) {
        caseMapper.delShow(id);
    }

    @Override
    public Case editShow(int id) {
        return caseMapper.editShow(id);
    }

    @Override
    public void showPass(int id) {
        caseMapper.showPass(id);
    }

}
