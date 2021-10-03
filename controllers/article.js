const multiparty = require('multiparty');
var path = require("path");
const { articlePath, articleFormat, scripts } = require('../config');

const { execSCript } = require('../utils/callShellScript');
const { saveFile, getTargetDirFiles, readFile, searchFile, writeFile, newFilePath, rename } = require('../utils/file');


exports.getList = (req, res) => {
    const articles = getTargetDirFiles(articlePath, articleFormat);
    res.render('succ', {
        data: JSON.stringify({
            articles
        })
    });
}

exports.getContent = (req, res) => {
    const { articleName } = req.params;
    let filePath = searchFile(articlePath, articleName)
    console.log(req.params)
    let content = readFile(filePath);
    res.render('succ', {
        data: JSON.stringify({
            content
        })
    });
}

exports.save = (req, res) => {
    const { articleName } = req.params;
    const { title, content } = req.body;
    let filePath = searchFile(articlePath, articleName);
    if (!filePath.length) {
        filePath = newFilePath(articleName);
    }
    writeFile(filePath, content);
    if (title !== articleName) {
        const newPath = filePath.replace(`${articleName}${articleFormat}`, `${title}${articleFormat}`);
        console.log(filePath, newPath);
        rename(filePath, newPath);
    }
    execSCript(scripts.build);
    res.render('succ', {
        data: JSON.stringify({})
    });
}

exports.uploadImg = (req, res) => {
    let form = new multiparty.Form();
    form.parse(req, function (err, fields, data) {
        let file = data.uploadImage[0];
        let { articleName } = data;
        let filePath = searchFile(articlePath, articleName);
        if (!filePath.length) {
            filePath = newFilePath(articleName);
        }
        filePath = path.dirname(filePath);
        saveFile(file.path, filePath + '/images/', file.originalFilename);
        res.render('succ', {
            data: JSON.stringify({
                imageUrl: `http://localhost:3100/2021-10-3/images/${file.originalFilename}`
            })
        });
    });
}