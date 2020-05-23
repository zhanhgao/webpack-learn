var Path = require('path');

module.exports = {
    api: Path.join(__dirname, '../src/common/api'),
    //自定义控件
    ngControl: Path.join(__dirname, '../src/custom/controls/control'),
    //框架
    frame: Path.join(__dirname, '../src/custom/frame/frame'),
    frame1: Path.join(__dirname, '../src/custom/frame/frame1/frame'),
    frame2: Path.join(__dirname, '../src/custom/frame/frame2/frame'),
    frame3: Path.join(__dirname, '../src/custom/frame/frame3/frame'),
    login1: Path.join(__dirname, '../src/custom/login/login1/login'),
    login2: Path.join(__dirname, '../src/custom/login/login2/login'),
    center1: Path.join(__dirname, '../src/custom/system-center/center1/system-center'),
    center2: Path.join(__dirname, '../src/custom/system-center/center2/system-center'),
    center3: Path.join(__dirname, '../src/custom/system-center/center3/system-center'),
    frameManager: Path.join(__dirname, '../src/custom/frame-manager')
};

