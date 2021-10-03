var { exec } = require('child_process');

exports.execSCript = (cmd) => {
  if (cmd) {
    exec(cmd);
  }
}