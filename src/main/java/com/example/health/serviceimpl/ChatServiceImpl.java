package com.example.health.serviceimpl;

import com.example.health.bean.Case;
import com.example.health.bean.Chat;
import com.example.health.mapper.ChatMapper;
import com.example.health.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Monster
 */
@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    ChatMapper chatMapper;

    @Override
    public List<Case> chatList(String sendName,String receiveName) {
        return chatMapper.chatList(sendName,receiveName);
    }

    @Override
    public void sendChat(Chat chat) {
         chatMapper.sendChat(chat);
    }

    @Override
    public void sendUploadWorks(Case c) {
        chatMapper.sendUploadWorks(c);
    }

    @Override
    public void editUploadWorks(Case c) {
        chatMapper.editUploadWorks(c);
    }
}
