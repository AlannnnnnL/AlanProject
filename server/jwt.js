// token处理文件
const jwt = require('jsonwebtoken');

// 密钥
const secretKey = 'alan';

// 生成token
function generateToken(jwtData) {
  // sign({jwt的元数据， payload中的一项（过期时间）}，密钥)
  return jwt.sign(jwtData, secretKey, {expiresIn: 2*60*60}); // 注册token（2h过期）
};

// 校验token
function verifyToken (token) {
  let flag = false;
  // 去掉头部拼的 'Tokkkk '
  let t = token.substring(7, token.length);
  jwt.verify(t, secretKey, (err, decoded) => {
    if (err || !decoded) {
      // 时间失效的时候或者伪造的token
      flag = false;
    } else {
      flag = true;
    }
  });
  return flag;
};

module.exports = {
  generateToken,
  verifyToken
}