var userModel = require('./mysql');
//获取信息
var fn_getImgMessage = async (ctx,next)=>{
    let { id } = ctx.request.body;
    await userModel.insertData([name, password]).then(res => {
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
module.exports ={
    'POST /getImgMessage':fn_getImgMessage
}