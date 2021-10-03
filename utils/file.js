var path = require("path");
var fs = require("fs");
var { articlePath, articleFormat } = require('../config');

//读取目录文件列表
exports.readDir = (dirPath) => {
    //读取目标目录文件列表
    let fileNameList = fs.readdirSync(dirPath, 'utf8');
    return fileNameList;
}

//读取文件内容
exports.readFile = (targetPath) => {
    //以utf8编码方式读取目标文件
    let data = fs.readFileSync(targetPath, 'utf8');
    return data;
}

exports.newFilePath = (fileName) => {
    const dateObj = new Date();
    let day = dateObj.getDate();
    day = day < 10 ? '0' + day : day;
    const date = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + day;
    try {
        fs.mkdirSync(`${articlePath}/${date}`);
    } catch (error) {

    }
    const filePath = `${articlePath}/${date}/${fileName}${articleFormat}`;
    return filePath;

}


exports.writeFile = (filePath, data) => {
    fs.writeFileSync(filePath, data, 'utf8');
}

exports.rename = (oldPath, newPath) => {
    fs.renameSync(oldPath, newPath);
}

exports.saveFile = (sourcePath, targetPath, fileName) => {
    // 创建读写流
    let readStream = fs.createReadStream(sourcePath);
    let writeStream;
    try {
        fs.mkdirSync(targetPath);
    } catch (error) {

    }
    writeStream = fs.createWriteStream(targetPath + fileName);

    // 读写进程开始
    readStream.pipe(writeStream);

    // 监听读取完成事件
    readStream.on('end', () => {
        // 读取完成后，释放读取源文件链接
        fs.unlinkSync(sourcePath);
    });
}

exports.getTargetDirFiles = (targetDirPath, targetFileFormat) => {
    let targetFiles = [];
    function finder(filePath) {
        let files = fs.readdirSync(filePath);
        files.forEach((el) => {
            let fPath = path.join(filePath, el);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) {
                finder(fPath);
            }
            if (stats.isFile() && path.extname(fPath) === targetFileFormat) {
                targetFiles.push(fPath.split(path.sep).pop().replace(`${articleFormat}`, ''));
            }
        });
    }
    finder(targetDirPath);
    return targetFiles.reverse();
}

exports.searchFile = (targetDirPath, targetFileName) => {
    let targetFilePath = '';
    function finder(filePath) {
        let files = fs.readdirSync(filePath);
        for (let file of files) {
            let fPath = path.join(filePath, file);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) {
                finder(fPath);
            }
            if (stats.isFile() && fPath.indexOf(targetFileName) !== -1) {
                targetFilePath = fPath;
                return filePath;
            }
        }
        return targetFilePath;
    }
    targetFilePath = finder(targetDirPath);
    return targetFilePath;
}