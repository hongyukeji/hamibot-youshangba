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

toast("优赏吧启动成功")
toastLog("优赏吧启动成功！")

hamibot.exit();

