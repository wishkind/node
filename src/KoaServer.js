const Koa = require('koa');
const app = new Koa();

const handler = async (ctx) => {
    ctx.body = 'hello world'
}

app.use(handler);
app.listen(8888,() => {
    console.log('8080端口已启动')
});
