package com.example.health.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.health.bean.Comment;
import com.example.health.bean.Dynamic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author Monster
 */
@Controller
@ResponseBody
public class DynamicController {

    @Autowired
    com.example.health.service.DynamicService DynamicService;

    /**
     * 查询动态内容
     * @return
     */
    @RequestMapping("/selectDynamic")
    public List<Dynamic> selectDynamic(String DynamicSendName){
        List<Dynamic> dynamic = DynamicService.selectDynamic(DynamicSendName);
        return dynamic;
    }

    /**
     * 查询我的动态内容
     * @return
     */
    @RequestMapping("/selectDynamicMe")
    public List<Dynamic> selectDynamicMe(String setName){
        List<Dynamic> dynamic = DynamicService.selectDynamicMe(setName);
        return dynamic;
    }

    /**
     * 查询当前发表微博数量(自己)
     * @param name
     * @return
     */
    @RequestMapping("/selectVBNum")
    public int selectVBNum(String name){
        int num = DynamicService.selectVBNum(name);
        return num;
    }

    /**
     * 删除当前个人已发表内容
     * @param ID
     */
    @RequestMapping("/deleteDynamic")
    public void deleteDynamic(int ID){
        DynamicService.deleteDynamic(ID);
    }

    /**
     * 发送朋友圈(无图片)
     * @param info
     */
    @RequestMapping("/sendDynamicContent")
    public void sendDynamicContent(String info){
        Dynamic dynamic = new Dynamic();
        dynamic = JSONObject.parseObject(info, dynamic.getClass());
        DynamicService.sendDynamicContent(dynamic);
    }

    /**
     * 点赞
     */
    @RequestMapping("/clickPraise")
    public void clickPraise(int praise,int id){
        DynamicService.clickPraise(praise,id);
    }

    /**
     * 发送评论
     */
    @RequestMapping("/sendComment")
    public void sendComment(String info){
        Comment comment = new Comment();
        comment = JSONObject.parseObject(info, comment.getClass());
        DynamicService.sendComment(comment);
    }

    /**
     * 点击查询评论
     * @return
     */
    @RequestMapping("/clickComment")
    public List<Comment> clickComment(String commentName,String commentPath,String commentContent){
        List<Comment> comments = DynamicService.clickComment(commentName, commentPath, commentContent);
        return comments;
    }
}
