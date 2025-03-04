var userModel = require('./mysql');
//注册
var fn_signup = async (ctx, next) => {
	let {
		name,
		password
	} = ctx.request.body;
	let queryres = await userModel.findUserData(name);
	console.log(queryres)
	if (queryres.length < 1) {
		await userModel.insertData([name, password]).then(res => {
			console.log('注册成功');
			//注册成功
			ctx.body = {
				code: 1,
				message: '注册成功'
			};
		}).catch(Response => {
			console.log('注册失败');
			console.log(Response);

			//注册失败
			ctx.body = {
				code: 0,
				message: Response
			};
		})
	} else {
		//注册失败
		ctx.body = {
			code: 0,
			message: '账号已存在'
		};
	}
};
//登陆
var fn_signin = async (ctx, next) => {
	let {
		name,
		password
	} = ctx.request.body;
	await userModel.findUserData(name).then(res => {
		console.log('查找成功');
		//登陆成功
		console.log(res)
		if (res[0].password == password) {
			ctx.body = {
				code: 1,
				message: '登入成功',
				data: res[0]
			};
		} else {
			ctx.body = {
				code: 0,
				message: '密码错误',
				data: {}
			};
		}

	}).catch(Response => {
		console.log('登入失败');
		//注册成功
		ctx.body = {
			code: 0,
			message: Response
		};
	})


};
var fn_delete = async (ctx, next) => {
	let {
		table
	} = ctx.request.body;
	await userModel.deleteAll(table).then(res => {
		console.log('删除成功')
		//注册成功
		ctx.body = {
			code: 1,
			message: '删除成功'
		};
	}).catch(Response => {
		console.log('删除失败')
		//注册成功
		ctx.body = {
			code: 0,
			message: '删除失败'
		};
		
	})
}
module.exports = {
	'POST /delete': fn_delete,
	'POST /signin': fn_signin,
	'POST /signup': fn_signup,

};
