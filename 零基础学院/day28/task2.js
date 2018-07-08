var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];

var inputc = document.getElementById('email-input');
var ul = document.getElementById('email-sug-wrapper');
var div = document.getElementById('wrapper');



function getV() {
    return inputc.value.trim();    
}

function creatL() {
    var va = getV();
    var temp = [];
    var li, vab, arrt;
    var fra = document.createDocumentFragment();

    if (va.indexOf('@') > 0){
        vab = va.slice(+va.indexOf('@') + 1);
        va = va.slice(0, va.indexOf('@'));    
    }

    postfixList.forEach(function (el){;
        if (el.indexOf(vab) === 0){
            temp.push(el);
        } 
    })

    if (temp.length > 0){
        arr = temp;
    } else {
        arr = postfixList;
    }

    arr.forEach(function (el) {
        li = document.createElement('li');
        li.textContent = va + '@' + el;
        fra.appendChild(li);
    }
    );
    return fra;
}

function setc() {
    ul.innerHTML = '';
    var lis = creatL();
    ul.appendChild(lis);
    nowSIndex = 0;
    document.querySelectorAll('#email-sug-wrapper li')[nowSIndex].classList.add('chosen')
}

function ulSw() {
    if (inputc.value.length) {
        showul();
    } else {
        hideul();
    }
}

function hideul() {
    ul.classList.add('hide');
    inputc.removeEventListener('keydown', keybC);
}

function showul() {
    ul.classList.remove('hide');
    inputc.addEventListener('keydown', keybC);
}

function chosen(e){
    if (e.target.nodeName === 'LI'){
        var target = e.target;
        inputc.value = target.innerHTML;
        hideul();
        inputc.focus();
    }
}

inputc.addEventListener('input', function() {
    setc();
    ulSw();
});

ul.addEventListener('click', chosen);

document.documentElement.addEventListener('click', function (ev) {
    if (ev.target.nodeName !== 'LI') hideul();
});


//--------------------------part2------------------------------------------------

var nowSIndex = 0;


function keybC(e){
    var lis = document.querySelectorAll('#email-sug-wrapper li');
    var curL = lis[nowSIndex];

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        curL.classList.remove('chosen');
    }
    
    if (e.key === 'ArrowUp'){
        if (curL === lis[0]){
            nowSIndex = lis.length - 1;
        } else {
            nowSIndex -= 1; 
        }
        lis[nowSIndex].classList.add('chosen') 
    }

    if (e.key === 'ArrowDown') {
        if (curL === lis[lis.length - 1]) {
            nowSIndex = 0;
        } else {
            nowSIndex += 1;
        }
        lis[nowSIndex].classList.add('chosen');
    }

    if (e.key === 'Enter') {
        inputc.value = curL.textContent;
        ul.classList.add('hide');
    }

    if (e.key === 'Escape') {
        inputc.select();
        ul.classList.add('hide');
    }
}