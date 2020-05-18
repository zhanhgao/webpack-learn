import _ from 'lodash';
import {
    cube
} from './math.js';
import './style.css';
// import Icon from './icon.jpg';
import Xml from './data.xml';
import Json from './data.json';
import printMe from './print.js';

if (process.env.NODE_ENV !== 'production') {
    console.log('NODE_ENV === production');
}

function component() {
    // var element = document.createElement('div');
    // var btn = document.createElement('button');

    // // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    // element.innerHTML = _.join(['Hello', 'webpack'], ' --- ');
    // element.classList.add('hello');

    // // 将图像添加到我们现有的 div。 添加图片
    // var myIcon = new Image();
    // myIcon.src = Icon;


    // // 添加按钮
    // btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = printMe;
    // console.log(Xml, '---', Json);
    // element.appendChild(myIcon);
    // element.appendChild(btn);

    // var element = document.createElement('pre');
    // element.innerHTML = [
    //     'Hello webpack!',
    //     '5 cubed is equal to ' + cube(5)
    // ].join('\n\n');
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);
    button.onclick = e => import('./print').then(module => {
        var print = module.default;
        print();
    });
    return element;
}

document.body.appendChild(component());

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('module.hot====>');
//         printMe();
//     })
// }