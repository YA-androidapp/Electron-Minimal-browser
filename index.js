// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


const { app, BrowserWindow } = require('electron');
const electronLocalshortcut = require('electron-localshortcut');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false
    });

    win.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        win.loadURL(url);
    });

    electronLocalshortcut.register(win, 'Ctrl+G', () => {
        win.loadURL('https://github.com/YA-androidapp?tab=repositories');
    });

    electronLocalshortcut.register(win, 'Ctrl+J', () => {
        win.loadURL('https://ya-androidapp.github.io/Mujin/?room=');
    });

    electronLocalshortcut.register(win, 'Ctrl+N', () => {
        win.loadURL('https://ya-androidapp.github.io/Nuxtjs-Repos-index-gh-pages/');
    });

    electronLocalshortcut.register(win, 'Backspace', () => {
        win.webContents.goBack()
    });

    electronLocalshortcut.register(win, 'Alt+Left', () => {
        win.webContents.goBack()
    });

    electronLocalshortcut.register(win, 'Alt+Right', () => {
        win.webContents.goForward()
    });

    let argUrl = '';
    for (var i = 0; i < process.argv.length; i++) {
        if (process.argv[i] !== undefined) {
            if (process.argv[i].indexOf("--url=") != -1 || process.argv[i].indexOf("https://") == 0) {
                argUrl = process.argv[i].replace("--url=", "");
            }
        }
    }

    if (argUrl == '') {
        win.loadURL('https://www.google.com/');
    } else {
        win.loadURL(argUrl);
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    // electronLocalshortcut.unregisterAll(win);

    if (process.platform !== 'darwin') {
        app.quit();
    }
})