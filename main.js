const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path"); // To resolve the path to your icon

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, "favicon.png"),
        titleBarStyle: "hidden",
        titleBarOverlay: {
            color: "#be8142",
            symbolColor: "#f8e9d8",
            height: 30,
        },
    });

    mainWindow.loadFile("index.html");

    mainWindow.on("closed", function () {
        mainWindow = null;
    });

    mainWindow.once("ready-to-show", () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("app_version", (event) => {
    event.sender.send("app_version", { version: app.getVersion() });
});

autoUpdater.on("update-available", () => {
    mainWindow.webContents.send("update_available");
});
autoUpdater.on("update-downloaded", () => {
    mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
    autoUpdater.quitAndInstall();
});
