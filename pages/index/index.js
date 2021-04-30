
const app = getApp();

Page({
  // added share button on the menu
  onLoad(){
    wx.showShareMenu({
      withShareTicket: true,
    })
  },
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
          title: '上传文件失败!',
          icon: 'error',
          duration: 5000,
        })
        console.log(res)
      }
    })
  },

})
