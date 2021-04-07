import { URL, loginUser, loginPws } from '../Constant';

export const loginFunc = function () {
  wx.request({
    url: URL.POST_Login,
    method: 'POST',
    data: JSON.stringify({
      username: loginUser,
      password: loginPws,
    }),
    success(res) {
      const { data: { access_token } } = res;
      wx.setStorageSync('token', `Bearer ${access_token}`)
    },
  })
}
/**
 * @param tpl
 * @param data
 * @param config
 * @returns {string}
 * @description build api url
 * @example
 * buildRequestUrl('api/part/{id}', { id: 3 }) => 'api/part/3'
 */
export const buildRequestUrl = function buildRequestUrl(tpl, data) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var re = /{([^}]+)?}/g;
  var match;
  var res = tpl;

  while (match = re.exec(tpl)) {
    var value = config.encode ? encodeURIComponent(data[match[1]]) : data[match[1]];
    res = res.replace(match[0], value);
  }
  return res;
};

export const returnRatioCoord = (arr, ratio) => {
  arr.map((item) => {
    item.realCoord = item.coord.map((v) => {
      return [v[0] / ratio, v[1] / ratio];
    })
    return item;
  })
  return arr;
}

export const drawCanvas = function (width, height, type, myCanvas) {
  let flag = 1;
  const stand = type === 'horizontal' ? height : width;
  for (; stand - flag * 10 > 0; flag++) {
    let start_x = flag * 10;
    let start_y = 0;
    let end_x = flag * 10;
    let end_y = height;
    if (type === 'horizontal') {
      start_x = 0;
      start_y = flag * 10;
      end_x = width;
      end_y = flag * 10;
    }
    myCanvas.beginPath(); //创建一条路径   
    myCanvas.setStrokeStyle('#7c878e');
    myCanvas.setLineWidth(0.2);
    myCanvas.moveTo(start_x, start_y);
    myCanvas.lineTo(end_x, end_y);
    myCanvas.closePath();
    myCanvas.stroke();
    myCanvas.draw(true);
  }
}

export const renderScan = function (width, height, virtualScan) {
  let moveFlag = 1;
  setInterval(() => {
    if (height - moveFlag > 0) {
      const start_x = 0;
      const start_y = moveFlag;
      const end_x = width;
      const end_y = moveFlag;
      virtualScan.beginPath();
      virtualScan.setStrokeStyle('red');
      virtualScan.setLineWidth(3);
      virtualScan.setShadow(0, 2, 10, 'red');
      virtualScan.moveTo(start_x, start_y);
      virtualScan.lineTo(end_x, end_y);
      virtualScan.closePath();
      virtualScan.stroke();
      virtualScan.draw(false);
    } else {
      moveFlag = 0;
    }
    moveFlag++;
  }, 10)
}