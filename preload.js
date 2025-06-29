const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onShowPunchInModal: (callback) => ipcRenderer.on('show-punch-in-modal', callback),
  onShowPunchOutModal: (callback) => ipcRenderer.on('show-punch-out-modal', callback),
  closeModal: () => ipcRenderer.send('close-modal')
});