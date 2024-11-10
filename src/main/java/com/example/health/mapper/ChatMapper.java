package com.example.health.mapper;

import com.example.health.bean.Case;
import com.example.health.bean.Chat;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Monster
 */
@Repository
public interface ChatMapper {

    List<Case> chatList(String sendName,String receiveName);

    void sendChat(Chat chat);

    void sendUploadWorks(Case c);

    void editUploadWorks(Case c);
}
