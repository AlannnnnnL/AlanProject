// 业务逻辑（集中处理路由）
const fs = require('fs');

// 根据指定目录，将其底下的js文件统一引入
function addController (router, dir) {
  let files = fs.readdirSync(__dirname + '/' + dir);
  let js_files = files.filter(f => {
    return f.endsWith('.js');
  });

  for (let f of js_files) {
    let mapping = require(__dirname + '/' + dir + '/' + f);
    addMapping(router, mapping);
  }
}

// 为路由添加对应的方法映射
function addMapping(router, mapping) {
  mapping.forEach(v => {
    switch (v.method) {
      case 'GET':
        router.get(v.path, v.func);
        break;
      case 'POST':
        router.post(v.path, v.func);
        break;
      default:
        console.log(`invalid URL: ${v.method} ${v.path}`);
        break;
    }
  });
}

module.exports = function (dir) {
  let controller_dir = dir || 'controllers';
  let router = require('koa-router')();
  addController(router, controller_dir);
  return router.routes();
}