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
    document.querySelector('#email-sug-wrapper li').classList.add('chosen')
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
}

function showul() {
    ul.classList.remove('hide');
}

function chosen(e){
    if (e.target.nodeName === 'LI'){
        var target = e.target;
        var nodv = target.textContent;
        inputc.value = nodv;
        hideul();
        inputc.focus();
    }
}

inputc.addEventListener('input', function() {
    setc();
    ulSw();
});

ul.addEventListener('click', chosen);


//--------------------------part2------------------------------------------------
/*
inputc.addEventListener('keyup', keybC);

function keybC(e){
    var curL = document.querySelector('.chosen');
    var lis = document.querySelectorAll('#email-sug-wrapper li');
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        curL.classList.remove('chosen');
    }
    
    if (e.key === 'ArrowUp'){
        if (curL === lis[0]){
            lis[lis.length - 1].classList.add('chosen');
        } else {
            curL.previousElementSibling.classList.add('chosen')    
        }
    }

    if (e.key === 'ArrowDown') {
        if (curL === lis[lis.length - 1]) {
            lis[0].classList.add('chosen');
        } else {
            curL.nextElementSibling.classList.add('chosen');
        }
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
*/