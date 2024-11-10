package com.example.health.service;


import com.example.health.bean.User;
import com.example.health.bean.userBankCard;

import java.util.List;

/**
 * @author Monster
 */
public interface UserSerivce {
    /**
     * 用户查询信息
     * @param name
     * @return
     */
    List<userBankCard> selectPersonalInformation(String name);

    /**
     * 查询新用户信息 当前无银行卡
     * @param name
     * @return
     */
    List<userBankCard> selectUserInformation(String name);
    /**
     * 更新信息
     * @param user
     */
    void updateUserMessage(User user);


    /**
     * 添加银行卡
     * @param name
     * @param card
     * @param id
     */
    void addCardMessage(int id,String name,String card);

    /**
     * 修改密码
     * @param id
     * @param newPassWord
     */
    void updatePassword(String newPassWord,int id);

    /**
     * 根据ID删除银行卡
     * @param id
     */
    void deleteCard(int id);
    /**
     * 用户发表意见
     * @param sendName
     * @param phone
     * @param email
     * @param time
     * @param message
     * @param name
     */
    void sendMessage(String sendName,String phone,String email,String time,String message,String name);

    /**
     * 根据卡号查询当前余额
     * @param bankCardNow
     * @return
     */
    int selectCardMoney(String bankCardNow);
    /**
     * 充值更新银行卡余额
     * @param cardMoney
     * @param bankCardNow
     */
    void updateCardMoney(int cardMoney,String bankCardNow);

    /**
     * 微信支付
     * @param name
     * @param vx
     */
    void vxPay(String name,int vx);

    /**
     * 支付宝支付
     * @param name
     * @param zfb
     */
    void zfbPay(String name,int zfb);
    /**
     * 账户充值
     * @param name
     * @param myAccount
     */
    void myAccountUpdate(String name,int myAccount);
    /**
     * 查询当前参数为1的卡号
     * @param parameterBank
     * @param userID
     * @return
     */
    int selectBankParameter(int parameterBank,int userID);
    /**
     * 根据之前ID修改参数
     * @param bankCardNow
     * @param userID
     */
    void updateBankCardNow(String bankCardNow,int parameter,int userID);

    /**
     * 根据之后ID修改参数
     * @param bankCardAfter
     * @param userID
     */
    void updateBankCardAfter(String bankCardAfter,int parameter,int userID);

    /**
     * 支付购物车
     * @param account
     * @param userID
     */
    void payMoney(int account,int userID);

    /**
     * 购买完后删除此商品
     * @param cardID
     */
    void deleteCart(int cardID);
}
