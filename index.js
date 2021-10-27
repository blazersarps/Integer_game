const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.loadFile("src/index.html");
}

app.whenReady().then(createWindow);
