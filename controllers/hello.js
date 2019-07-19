var fn_hello = async (ctx, next) => {
    console.log(ctx);

    var name = ctx.params.name;
    ctx.set("Content-Type", "application/json")
    

    // ctx.body.JSON.stringify({
    //     suatus:200,
    //     message:name
    // });
};

module.exports = {
    'GET /hello/:name': fn_hello
};