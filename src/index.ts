/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 16:58:03
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-23 17:45:32
 * @FilePath: \\src\\index.ts
 * @Description: 脚本入口
 */
import {} from "./global";
import { init } from "./lib/init";

init();

auto.waitFor();

app.launchApp('优赏吧');
// app.launch('com.hamibot.hamibot');

let myBtnEL = className("android.widget.ImageView").desc("我的");
myBtnEL.waitFor();

if(myBtnEL.exists()){
    myBtnEL.findOne().click();
    toastLog("进入我的页面成功！")
}

hamibot.exit();

