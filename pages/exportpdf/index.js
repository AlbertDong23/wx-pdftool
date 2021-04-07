import { buildRequestUrl } from '../../utils/util';
import {URL} from '../../Constant';

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileObj: {},
    type: 'word',
    fileSrc :'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    this.setData({
      fileObj: app.globalData.fileObj,
    })
    console.log("-------------------");
    console.log(app.globalData.fileObj);
  },
  uploadFile(){
    const that =this; //复制this给That一份，防止this变化
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension:['pdf'],
      success(res){
        if(res.tempFiles.length){
          that.setData({
            fileObj:res.tempFiles[0],
          })
        }
      },
      fail(res){
        wx.showToast({
          title:'上传文件失败！',
          icon: 'error',
          duration: 5000,
        })
        console.log(res);
      }
    })
  },
  selectType(data){
    const{ currentTarget :{dataset:{type}}}=data;
    this.setData({
      type,
    })
    wx.showLoading({
      title: 'loading',
    })
    const that = this;
    const { fileObj }= that.data;
    const name =fileObj.name.split('.');
    const uploadSuffix = name[name.length -1];
    if(uploadSuffix !== 'pdf'){
      wx.hideLoading()
      return;
    }
    let suffix ='docx';
    switch(type){
      case 'excel':
        suffix ='xlsx';
        break;
      default:
        suffix ='docx';
        break;
    }
    // 调用upload file 组件，拼装参数
    wx.uploadFile({
      filePath: fileObj.path,
      name: 'file',
      url: buildRequestUrl(URL.POST_UploadPDFFiles,{type}),
      success(rest){
        if(rest.statusCode ===200){
          const fileId = JSON.parse(rest.data);
           //如果状态为200，微信直接展开数据显示
          wx.downloadFile({
            url: buildRequestUrl(URL.GET_FileById, {
              fileId: fileId[0],
              fileName: `${encodeURI(name.join('.'))}.${suffix}`,
            }),
            filePath: `${wx.env.USER_DATA_PATH}/${encodeURI(name.join('.'))}.${suffix}`,
            header:{},
            success(res){
              let filePath =res.filePath;
              that.setData({
                fileSrc:filePath,
              })
              wx.openDocument({
                filePath: filePath,
                showMenu: true,
                fileType:suffix,
                success(res){
                  wx.hideLoading();
                  wx.showToast({
                    title: '打开文件成功！',
                    icon:'success',
                    duration:2000,
                  })
                },
                fail(res){
                  wx.hideLoading();
                }
              })
            }

          })
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '转换文件失败！',
            icon:'error',
            duration:5000,
          })
        }
      },
      fail(res){
        wx.hideLoading()
        wx.showToast({
          title: '转换文件失败 ！',
          icon: 'error',
          duration: 5000,
        })
        console.log(res)
      }
    });



  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})