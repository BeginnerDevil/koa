var userModel = require('./mysql');
var sd = require('silly-datetime');
//存贮留言信息
var fn_leaveWords = async (ctx, next) => {
  let { name, remark, email, phone } = ctx.request.body;
  const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  console.log(time);

  await userModel.setLeaveWords([name, remark, email, phone, time]).then(res => {
    console.log('上传成功');
    ctx.body = {
      code: 1,
      message: '上传成功'
    };
  }).catch(Response => {
    console.log(Response);
    ctx.body = {
      code: 0,
      message: Response
    };
  })
}
//获取留言信息
var fn_leaveWordsData = async (ctx, next) => {
  await userModel.getLeaveWords().then(res => {
    console.log(res);
    ctx.body = {
      code: 1,
      message: res
    };
  }).catch(Response => {
    console.log('获取失败');
    ctx.body = {
      code: 0,
      message: Response
    };
  })
}
module.exports = {
  'POST /leaveWords': fn_leaveWords,
  'GET /leaveWordsData': fn_leaveWordsData,


}