;
var wrap1 = document.getElementById('task1');
var cont = document.getElementById('cont');
var contABC = document.getElementById('contABC');
var contDEF = document.getElementById('contDEF');


document.body.onclick = function (ev) {
    if (ev.target.tagName === 'BUTTON') {
        
        var buttonv = ev.target;
        if (!history.state || history.state.buttonindex !== buttonv.id) {
            history.pushState({'buttonindex': buttonv.id}, '', '?' + buttonv.textContent)
        }
        
        if (/[ABC]/.test(buttonv.textContent)) {
            contABC.innerHTML = buttonv.textContent;
        } else {
            contDEF.innerHTML = buttonv.textContent;
        }
    }
}

window.addEventListener('popstate', buttonClick, false);

function buttonClick(ev) {
    contABC.innerHTML = '';
    contDEF.innerHTML = '';
    if (!location.search) return;

    var data = location.search.slice(1);
    var buttarget = document.getElementById('' + location.search.slice(1).toLowerCase());
    buttarget.click();

    /*
    if (!ev.state) return;
    var buttarget = document.getElementById('' + ev.state.buttonindex);
    buttarget.click();
    复制无法显示数据*/
}

buttonClick();