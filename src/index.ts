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

auto.waitFor();

app.launchApp('优赏吧');
// app.launch('com.hamibot.hamibot');

let myBtnEL = className("android.widget.ImageView").desc("我的");
myBtnEL.waitFor();

// 判断 底部按钮 我的 是否存在
if (myBtnEL.exists()) {
    myBtnEL.findOne().click();
    toastLog("进入我的页面成功！")

    // 判断 我的店铺 按钮 是否存在
    let myShopBtnEL = className("android.widget.ImageView").desc("我的店铺")
    if (myShopBtnEL.exists()) {
        myBtnEL.findOne().click();
        toastLog("进入我的店铺成功！")
        let underwayBtnEL = className("android.view.View").desc("进行中 第 2 个标签，共 3 个");
        if (underwayBtnEL.exists()) {
            underwayBtnEL.findOne().click();
            toastLog("点击 进行中 按钮成功！")
        }
    }

}

hamibot.exit();

