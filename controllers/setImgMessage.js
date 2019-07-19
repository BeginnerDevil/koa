var userModel = require('./mysql');
//获取信息
var fn_setImgMessage = async (ctx, next) => {
  let { userCode, name, url, remark } = ctx.request.body;
  if (!name) {
    ctx.body = {
      code: 200,
      message: '请填写名称'
    };
  }else if (!url) {
    ctx.body = {
      code: 200,
      message: '请填写地址'
    };
  }else if (!remark) {
    ctx.body = {
      code: 200,
      message: '请填写描述'
    };
  }else if (userCode && name && url && remark) {
    await userModel.imgData([userCode, name, url, remark]).then(res => {
      console.log('上传成功');
      //注册成功
      ctx.body = {
        code: 200,
        message: '注册成功'
      };
    }).catch(Response => {
      console.log('上传失败');
      //注册成功
      ctx.body = {
        code: 500,
        message: Response
      };
    })
  }

}
module.exports = {
  'POST /setImgMessage': fn_setImgMessage
}