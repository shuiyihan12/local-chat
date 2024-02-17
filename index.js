const {app, BrowserWindow, Menu, ipcMain} = require('electron')
// 在你文件顶部导入 Node.js 的 path 模块
const path = require('node:path')

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'hello word')
    // createWindow()

    if (process.platform === 'darwin') {
        // 在 macOS 系统内, 如果没有已开启的应用窗口,点击托盘图标时通常会重新创建一个新窗口
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    }
}).then(() => {
    createWindow()
})

//   添加一个createWindow()方法来将index.html加载进一个新的BrowserWindow实例
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './local-chat.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    //打开调试工具
    win.webContents.openDevTools()

    // 加载 index.html
    win.loadFile('index.html')
}

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
