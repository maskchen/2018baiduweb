/* task1
function 解析Hash，获取状态参数() {
    取到需要的值，并返回
}

function 渲染函数() {
    内容 = 解析Hash，获取状态参数()
    cont的innerHTML = 内容
}

按钮点击事件 = function() {
    设置新的hash
}

window.onhashchange = 渲染函数

进来先执行一次渲染函数()
*/

var wrap1 = document.getElementById('task1');
var cont = document.getElementById('cont');
var contABC = document.getElementById('contABC');
var contDEF = document.getElementById('contDEF');

function gethash() {
    var hash = window.location.hash;
    if (!hash) return hash;
    return hash.slice(1);
}

function puthash() {
    var hash = gethash();
    contABC.innerHTML = '';
    contDEF.innerHTML = '';

    if (/[ABC]/.test(hash)) {
        contABC.innerHTML = hash;
    } else {
        contDEF.innerHTML = hash;
    }
     
}

document.body.onclick = function (ev) {
    if (ev.target.tagName === 'BUTTON') {
        window.location.hash = '#' + ev.target.textContent;
    }
}

window.onhashchange = puthash;
puthash();


