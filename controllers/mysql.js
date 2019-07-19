var mysql = require('mysql');
var pool = mysql.createPool({
    host    : 'localhost',
    user    : 'root',
    password: '2020xxx520',
    database: 'data',
    port    : '3306'
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}


// let query = function( sql, values ) {
// pool.getConnection(function(err, connection) {
//   // 使用连接
//   connection.query( sql,values, function(err, rows) {
//     // 使用连接执行查询
//     console.log(rows)
//     connection.release();
//     //连接不再使用，返回到连接池
//   });
// });
// }

// 注册用户
exports.insertData = (value) => {
    let _sql = "insert into login set name=?,password=?;"
    return query(_sql, value)
}
// 删除用户
exports.deleteUserData = (name) => {
    let _sql = `delete from users where name="${name}";`
    return query(_sql)
}
// 查找用户
exports.findUserData = (name) => {
    let _sql = `select * from login where name="${name}";`
    return query(_sql)
}
// 注册用户
exports.imgData = (value) => {
    let _sql = "insert into imgMessage set code=?,imgName=?,imgUrl=?,remark=?;"
    return query(_sql, value)
}
//清空数据
exports.deleteAll = (table)=>{
    let _sql = `delete from ${table};`
    return query(_sql)
}