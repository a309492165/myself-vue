/* eslint-disable */
'use strict';
// app/service/tools.js
const Service = require('egg').Service;
const moment = require('moment')
const path = require('path');
const fs = require('fs');

class ToolsService extends Service {
    async getUploadFile(filename) {
        const uploadDirPath = 'app/public/upload'
        // 1、获取当前日期   
        let day = moment().format('YYYYMMDD');
        // 2、创建图片保存的路径
        let dir = path.join(uploadDirPath, day);
        // 不存在就创建目录
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        let date = Date.now(); /* 毫秒数*/
        // 返回图片保存的路径
        let uploadDir = path.join(dir, date + path.extname(filename));
        // app\public\upload\20190914\1536895331444.png
        return {
            uploadDir,
            saveDir: this.ctx.origin + uploadDir.slice(3).replace(/\\/g, '/')
        }
    }
}

module.exports = ToolsService
