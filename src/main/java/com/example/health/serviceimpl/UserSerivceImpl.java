package com.example.health.serviceimpl;

import com.example.health.bean.User;
import com.example.health.bean.userBankCard;
import com.example.health.mapper.UserMapper;
import com.example.health.service.UserSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Monster
 */
@Service
public class UserSerivceImpl implements UserSerivce {

    @Autowired
    private UserMapper userMapper;


    @Override
    public List<userBankCard> selectPersonalInformation(String name) {
        return userMapper.selectPersonalInformation(name);
    }

    @Override
    public List<userBankCard> selectUserInformation(String name) {
        return userMapper.selectUserInformation(name);
    }

    @Override
    public void updateUserMessage(User user) {
        userMapper.updateUserMessage(user);
    }

    @Override
    public void addCardMessage(int id,String name, String card) {
        userMapper.addCardMessage(id,name,card);
    }

    @Override
    public void updatePassword(String newPassWord,int id) {
        userMapper.updatePassword(id,newPassWord);
    }

    @Override
    public void deleteCard(int id) {
        userMapper.deleteCard(id);
    }

    @Override
    public void sendMessage(String sendName, String phone, String email, String time, String message, String name) {
        userMapper.sendMessage(sendName,phone,email,time,message,name);
    }

    @Override
    public int selectCardMoney(String bankCardNow) {
        return userMapper.selectCardMoney(bankCardNow);
    }

    @Override
    public void updateCardMoney(int cardMoney, String bankCardNow) {
        userMapper.updateCardMoney(cardMoney,bankCardNow);
    }

    @Override
    public void vxPay(String name, int vx) {
        userMapper.vxPay(name, vx);
    }

    @Override
    public void zfbPay(String name, int zfb) {
        userMapper.zfbPay(name, zfb);
    }

    @Override
    public void myAccountUpdate(String name, int myAccount) {
        userMapper.myAccountUpdate(name, myAccount);
    }

    @Override
    public int selectBankParameter(int parameterBank,int userID) {
        return userMapper.selectBankParameter(parameterBank,userID);
    }

    @Override
    public void updateBankCardNow(String bankCardNow,int parameter,int userID) {
        userMapper.updateBankCardNow(bankCardNow,parameter,userID);
    }

    @Override
    public void updateBankCardAfter(String bankCardAfter,int parameter,int userID) {
        userMapper.updateBankCardAfter(bankCardAfter,parameter,userID);
    }

    @Override
    public void payMoney(int account, int userID) {
        userMapper.payMoney(account, userID);
    }

    @Override
    public void deleteCart(int cardID) {
        userMapper.deleteCart(cardID);
    }


}
