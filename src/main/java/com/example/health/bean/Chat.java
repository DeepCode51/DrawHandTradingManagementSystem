package com.example.health.bean;

public class Chat {
    private int id;
    private String sendName;
    private String receiveName;
    private String content;
    private String sendByName;
    private String chatTitle;
    private String chatAbout;
    private String chatPrice;
    private String chatPath;

    public String getChatTitle() {
        return chatTitle;
    }

    public void setChatTitle(String chatTitle) {
        this.chatTitle = chatTitle;
    }

    public String getChatAbout() {
        return chatAbout;
    }

    public void setChatAbout(String chatAbout) {
        this.chatAbout = chatAbout;
    }

    public String getChatPrice() {
        return chatPrice;
    }

    public void setChatPrice(String chatPrice) {
        this.chatPrice = chatPrice;
    }

    public String getChatPath() {
        return chatPath;
    }

    public void setChatPath(String chatPath) {
        this.chatPath = chatPath;
    }

    public String getSendByName() {
        return sendByName;
    }

    public void setSendByName(String sendByName) {
        this.sendByName = sendByName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSendName() {
        return sendName;
    }

    public void setSendName(String sendName) {
        this.sendName = sendName;
    }

    public String getReceiveName() {
        return receiveName;
    }

    public void setReceiveName(String receiveName) {
        this.receiveName = receiveName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
