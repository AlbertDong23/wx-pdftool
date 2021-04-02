
const app = getApp();

Page({
  uploadPdf() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['pdf'],
      success(res) {
        if (res.tempFiles.length) {
          app.globalData.fileObj = res.tempFiles[0];
          wx.redirectTo({
            url: '../exportpdf/index',
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: 'Upload File Failed!',
          icon: 'error',
          duration: 5000,
        })
        console.log(res)
      }
    })
  }
})
