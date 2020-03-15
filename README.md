# shop
## 第一步
下载全部压缩包，解压后将vue_api_server压缩包解压
## 第二步
分别在vue_api_server和shop两个目录下面进入npm（进入方法：目录下面安装shift在空白区域点击右键，点击  在此处打开Power..窗口 进入cmd窗口   分别运行npm i 命令（必须安装node软件）。
## 第三步
安装phpStudy软件，最好安装7.0之前的版本，打开软件点击启动，点击其他选项菜单->服务管理器->Apache——>关闭
之后点击MySQL管理器——>导入与导出
输入MYSQL密码，点击选择要还原的文件，选择解压出来的node目录下db目录下mydb文件，填写还原到数据库名为mydb 点击导入
（注意：这里的MySQL密码是自己设置的，没有设置的话默认是root，如果自己设置了密码，那么就要在node解压出来的目录里面的config目录下面的default.json文件修改password为自己的密码）
还原成功之后在vue_api_server路径的cmd窗口执行：node  .\app.js，执行成功即可，不要关闭cmd窗口

## 第四步
在vue目录的cmd窗口下运行npm run serve， 运行成功之后显示两个网址，输入第一个网址到浏览器即可
