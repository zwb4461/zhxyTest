const fs = require('fs');
const path = require('path');

/**
 * 创建文件夹
 * @param {} query 
 */
const fsMkdir = name => {
    return new Promise((resolve, reject) => {
        fs.mkdir(name, { recursive: true }, err => {
            if (err) {
                if (err.code === 'EEXIST') reject('文件夹已存在请勿重复创建!');
                reject(err)
            }
            resolve(true);
        });
    })
}


const fsWriteFile = (name, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(name, data, { encoding: 'utf8' }, err => {
            if (err) {
                if (err.code === 'EEXIST') reject('该文件已存在请勿重复创建!');
                reject(err)
            }
            resolve(true);
        })
    })
}

/**
 * 在文件的指定文字写入内容
 * @param {*} name 文件名
 * @param {*} data 数据
 * @param {*} idx  倒数第几行
 */
const fsWriteInPosition = (name, data) => {
    const info = fs.readFileSync(name, 'utf8').split('\n')
    let index = info.findIndex(item => item.indexOf('##插入位置') > -1);
    info.splice(index+1, 0, data)
    fs.writeFileSync(name, info.join('\n'), 'utf8')
}








module.exports = {
    fsMkdir,
    fsWriteFile,
    fsWriteInPosition
}