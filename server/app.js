// 应用入口
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('./controller');
const JWT = require('./jwt');

// 身份验证本系统使用的是 jwt(jsonwebtoken)搭建token身份验证（这种方法相比其他方法的优势：不用将信息存储在服务器或者session中，内存开销小）
// 其他方法：如使用koa-session等

// 身份验证:
app.use(async (ctx, next) => {
  // console.log(`Process ${ctx.request.method} ${ctx.request.url} ${ctx.request.header.authorization}...`);
  if (ctx.request.url === '/api/signin'){
    await next();
  } else {
    let token = ctx.request.header.authorization;
    if (token !== undefined) {
      let isRightToken = JWT.verifyToken(ctx.request.header.authorization);
      if (isRightToken) {
        await next();
      } else {
        ctx.status = 401
      }
    } else {
      ctx.status = 401
    }
  }
});

app.use(bodyParser());
app.use(controller());
app.use(controller('/controllers/sys'));

app.listen(8090);
console.log('ALAN-Project server started at 8090....');