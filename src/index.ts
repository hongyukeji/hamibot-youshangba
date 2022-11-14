/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 16:58:03
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-23 17:45:32
 * @FilePath: \\src\\index.ts
 * @Description: 脚本入口
 */
import {} from "./global";
import {init} from "./lib/init";

init();

/* -------------------- 正式代码 -------------------- */

auto.waitFor();

const {interval} = hamibot.env;
// toastLog(interval); // 打印并显示空白内容

var intervalTimeMillisecond = interval || intervalTimeMillisecond;
var waitTimeMillisecond = intervalTimeMillisecond * 2;

app.launchApp('优赏吧');
// app.launch('com.hamibot.hamibot');

toastLog("请在运行前，将优赏吧APP关闭，或保持在首页页面！");

sleep(waitTimeMillisecond);

try {
    var skipBtnElement = className("android.widget.ImageView").descContains("跳过");
    if (skipBtnElement.exists()) {
        // cn.originalstar.fluocean.SplashActivity
        skipBtnElement.findOne().click();
        toastLog("广告跳过成功！");
    }

    var skipBtn = id("tt_splash_skip_btn");
    if (skipBtn.exists()) {
        skipBtn.findOne().click();
        toastLog("广告跳过成功！");
    }
} catch (e) {
    console.log("广告跳过异常", e);
}

// app.startActivity('console'); // 打开控制台(日志)
// console.show() // 显示控制台小窗口

var myBtn = className("android.widget.ImageView").desc("我的");
myBtn.waitFor();
toastLog("优赏吧启动成功！");
/*if (myBtn.exists()) {
    // var currentActivity = currentActivity();
    // com.example.zhuoxin_task.MainActivity
    // alert("当前活动组件 " + currentActivity);
} else {
    toastLog("请关闭当前App，然后再启动脚本！");
}*/

myBtn.findOne().click();
toastLog("进入[我的]页面成功！");

sleep(waitTimeMillisecond);

while (true) {
    var myShopBtn = className("android.widget.ImageView").desc("我的店铺");
    myShopBtn.waitFor();
    // if (myShopBtn.exists()) {}

    myShopBtn.findOne().click();
    toastLog("进入[我的店铺]页面成功！");

    sleep(waitTimeMillisecond);

    var taskRunListBtn = className("android.view.View").descContains("进行中");
    taskRunListBtn.waitFor();
    // if (taskRunListBtn.exists()) {}

    taskRunListBtn.findOne().click();
    toastLog("点击[进行中]按钮成功！");

    sleep(waitTimeMillisecond);

    // 1.运行任务
    let taskListBtn = className("android.widget.ImageView").descContains("审核").untilFind().filter(function (w) {
        // console.log('w', w);
        if (w.contentDescription != null) {
            let text = String(w.contentDescription);
            console.log('text', text);
            let num = text.split(":")[1];
            console.log('num', num);
            if (num && Number(num) > 0) {
                return true;
            }
        }
        return false;
    });

    if (taskListBtn.length) {
        toastLog("发现任务");

        // 2.处理任务集合
        for (let taskListBtnElement of taskListBtn) {
            toastLog("进入任务...");
            let desc = taskListBtnElement.contentDescription;
            console.log('desc', desc);

            // 3.进入审核任务(进行中记录)
            taskListBtnElement.click();

            sleep(intervalTimeMillisecond);

            // 4.获取所有待审核元素
            var waitTaskList = className("android.view.View").descContains("提交时间").untilFind().filter(function () {
                return true;
            });
            sleep(intervalTimeMillisecond);
            if (waitTaskList.length) {
                for (let waitTaskElement of waitTaskList) {
                    sleep(intervalTimeMillisecond);
                    // console.log('waitTaskElement', waitTaskElement);
                    waitTaskElement.click();
                    sleep(intervalTimeMillisecond);
                    let passAuditBtn = className("android.view.View").descContains("审核通过");
                    passAuditBtn.waitFor();
                    if (passAuditBtn.exists()) {
                        passAuditBtn.findOne().click();

                        sleep(intervalTimeMillisecond);

                        // 确认通过
                        let confirmPassAuditBtn = className("android.view.View").descContains("确认通过");
                        confirmPassAuditBtn.waitFor();
                        if (confirmPassAuditBtn.exists()) {
                            console.log('confirmPassAuditBtn', confirmPassAuditBtn.findOne().contentDescription);
                            // todo: 正式环境打开确认通过
                            confirmPassAuditBtn.findOne().click();
                        }

                        // todo: 正式环境 注释此处代码
                        /*let cancelPassAuditBtn = className("android.view.View").descContains("取消");
                        if (cancelPassAuditBtn.exists()) {
                            console.log('cancelPassAuditBtn', cancelPassAuditBtn.findOne().contentDescription);
                            cancelPassAuditBtn.findOne().click();
                        }*/

                        console.log('开始时间', className("android.view.View").descContains("开始时间").findOne().contentDescription);

                    }
                    sleep(intervalTimeMillisecond);
                    // 返回按钮
                    className("android.widget.ImageView").clickable(true).depth(8).findOne().click();
                    sleep(intervalTimeMillisecond);
                }
            }
            sleep(intervalTimeMillisecond);
            className("android.widget.ImageView").clickable(true).depth(8).findOne().click(); // 返回按钮
            sleep(intervalTimeMillisecond);
            toastLog("已完成当前审核任务");
        }

        if (className("android.view.View").descContains("我的店铺").exists()) {
            sleep(intervalTimeMillisecond);
            className("android.widget.ImageView").clickable(true).depth(9).findOne().click(); // 返回按钮
            sleep(intervalTimeMillisecond);
        }
    } else {
        toastLog("未发现任务");
    }

    if (className("android.view.View").descContains("我的店铺").exists()) {
        sleep(intervalTimeMillisecond);
        className("android.widget.ImageView").clickable(true).depth(9).findOne().click(); // 返回按钮
        sleep(intervalTimeMillisecond);
    }

    sleep(waitTimeMillisecond);
}

sleep(5000);

console.log('优赏吧运行结束！');
// console.clear();
console.hide();
app.startActivity('console'); // 打开控制台(日志)

hamibot.exit();
