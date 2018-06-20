1. git clone https://github.com/monkeyMall/view/tree/version_1.0 && gco subbranch
2. npm install
3. 本机安装mongodb数据库
4. 启动mongodb数据库
5. 启动node服务端 `cd server && node index,js`
6. 将程序放在服务器上运行，如apache等。建议使用http-server比较方便 `npm install -g http-server && cd /view && http-server`
7. 打开浏览器访问http://127.0.0.1/8080/index.html。这里假设启动的是8080端口。但是不一定，需要看第6步执行结果。