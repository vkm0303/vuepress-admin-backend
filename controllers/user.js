
const { admin } = require('../config');

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === admin.username && password === admin.password) {
    res.render('succ', {
      data: JSON.stringify({
        username,
      })
    });
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '账号/密码错误',
      })
    });
  }
}