package com.example.health.service;

import com.example.health.bean.Case;
import com.example.health.bean.Chat;

import java.util.List;

/**
 * @author Monster
 */
public interface ChatService {

    List<Case> chatList(String sendName,String receiveName);

    void sendChat(Chat chat);

    void sendUploadWorks(Case c);

    void editUploadWorks(Case c);
}
