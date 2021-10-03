var { exec } = require('child_process');

exports.execSCript = (cmd) => {
  console.log(cmd)
  if(cmd) {
    exec(cmd, (err, stdout, stderr) => {
      console.log(err, stdout);
    });
  }
}