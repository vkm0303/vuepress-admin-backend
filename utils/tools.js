
// const bcrypt = require('bcrypt');
// const fs = require('fs');
// const path = require('path');
// const jwt = require('jsonwebtoken');

// //hash加密
// exports.hash = (myPlaintextPassword) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.hash(myPlaintextPassword, 10, (err, hash) => {
//       if(err) {
//         reject(err);
//       } 
//       resolve(hash);
//     });
//   })
// }

// //hash比较
// exports.compare = (myPlaintextPassword, hash) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
//       if(err) {
//         reject(err);
//       }
//       resolve(result);
//     });
//   });
// }

// exports.sign = (username) => {
//   const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'));
//   const token = jwt.sign({username}, privateKey, { algorithm: 'RS256' });
//   return token;
// }

// //验证token
// exports.verify = (token) => {
//   const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'));
//   const result = jwt.verify(token, publicKey);
//   return result;
// }
