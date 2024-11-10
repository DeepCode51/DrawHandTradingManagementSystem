package com.example.health.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

/**
 * @author Monster
 */
@ResponseBody
@Controller
public class VerificationCodeController {

    /**
     * 构建验证码图片大小
     * @param response
     * @param request
     */
    @RequestMapping("/code")
    public void getVerifyCodeImg(HttpServletResponse response, HttpServletRequest request) {
        try {
            int width=150;
            int height=46;
            //生成对应宽高的初始图片
            BufferedImage verifyImg=new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
            //单独的一个类方法，出于代码复用考虑，进行了封装。
            //功能是生成验证码字符并加上噪点，干扰线，返回值为验证码字符
            String randomText = drawRandomText(width,height,verifyImg);
            request.getSession().setAttribute("verifyCode", randomText);
            //必须设置响应内容类型为图片，否则前台不识别
            response.setContentType("image/png");
            //获取文件输出流
            OutputStream os = response.getOutputStream();
            //输出图片流
            ImageIO.write(verifyImg,"png",os);
            os.close();//关闭流
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //drawRandomText() 方法 构建验证码图片
    //verifyImg 获得相应的验证码区域大小，然后进行构建验证码
    public static String drawRandomText(int width, int height, BufferedImage verifyImg) {
        Graphics2D graphics = (Graphics2D)verifyImg.getGraphics();
        //设置画笔颜色-验证码背景色
        graphics.setColor(Color.WHITE);
        //填充背景
        graphics.fillRect(0, 0, width, height);
        graphics.setFont(new Font("微软雅黑", Font.BOLD, 40));
        //数字和字母的组合
        String baseNumLetter = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        StringBuffer sBuffer = new StringBuffer();
        //旋转原点的 x 坐标
        int x = 5;
        String ch = "";
        Random random = new Random();
        for(int i = 0;i < 4;i++){
            graphics.setColor(getRandomColor());
            //设置字体旋转角度
            int degree = random.nextInt() % 30;
            int dot = random.nextInt(baseNumLetter.length());
            ch = baseNumLetter.charAt(dot) + "";
            sBuffer.append(ch);
            //正向旋转
            graphics.rotate(degree * Math.PI / 180, x, 45);
            //y 控制内部整体上下位置 x控制间距
            graphics.drawString(ch, x, 38);
            //反向旋转
            graphics.rotate(-degree * Math.PI / 180, x, 45);
            x += 40;
        }
        //画干扰线
        for (int i = 0; i <4; i++) {
            //设置随机数 (Math.random()*(最大值-最小值+1)+最小值)
            int rdm = (int)(Math.random()*(100-10+1)+10);
            // 设置随机颜色
            graphics.setColor(getRandomColor());
            // 随机画线
            graphics.drawLine(random.nextInt(rdm), random.nextInt(rdm),
                    random.nextInt(rdm*5), random.nextInt(rdm*5));
        }

        //添加噪点
        for(int i=0;i<10;i++){
            int x1 = random.nextInt(width);
            int y1 = random.nextInt(height);
            graphics.setColor(getRandomColor());
            graphics.fillRect(x1, y1, 2,2);
        }
        return sBuffer.toString();
    }

    /**
     * 随机取色
     */
    private static Color getRandomColor() {
        Random ran = new Random();
        Color color = new Color(ran.nextInt(256),
                ran.nextInt(256), ran.nextInt(256));
        return color;
    }
}
