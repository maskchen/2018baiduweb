var sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];



var table = document.getElementById('table-wrapper').firstElementChild;
var checkboxes = document.querySelectorAll('[type = "checkbox"]');
var matcharr, flag, countI;
var oldNum;

checkboxes.forEach(function (el) {
    el.onchange = function (e) {
        checkbox(('[name=' + e.target.name + ']'), e);
        selData();
        createTab();
        paintAllzhe(matcharr);
        stickAll(matcharr);
    };
});


function checkbox(type, event) {
    var boxes = document.querySelectorAll(type);
    var boxes2 = document.querySelectorAll(type + ':not([value="all"]):checked');

    if (event.target.value === 'all' && event.target.checked) {
        boxes.forEach(function (el) {
            el.checked = true;
        });
    } else {
        if (boxes2.length === (boxes.length - 1)) {
            event.target.closest('div').querySelector('[value="all"]').checked = true;
        } else {
            event.target.closest('div').querySelector('[value="all"]').checked = false;
            if (document.querySelectorAll('[type = "checkbox"]:checked').length === 0) {
                event.target.checked = true;
            } 
        }
    }
}


function selData() {
    matcharr = [];

    if (document.querySelectorAll('[type = "checkbox"]:checked').length === 0) return; //day39 task add-------
    matchData('region');
    matchData('product');
    
}



function createTh() {
    var temparr;
    var provalues = document.querySelectorAll('[name="product"]:not([value="all"]):checked');
    var regvalues = document.querySelectorAll('[name="region"]:not([value="all"]):checked');

    if (document.querySelectorAll('[type = "checkbox"]:checked').length === 0) return;//day39 task add-------

    if ((regvalues.length === 1) && (provalues.length !== 1)){
        temparr = ['地区','产品'];
        flag = provalues.length;
    } else {
        temparr = ['产品','地区'];
        if (regvalues.length === 0) {
            flag = document.querySelectorAll('[name="region"]:not([value="all"])').length;
        } else {
            flag = regvalues.length;
        }
    }
    var i;
    var tr = document.createElement('tr')
    for (i = 1; i <= 12; i++) {
        temparr.push(i + '月');
    }

    temparr.forEach(function (el) {
        var th = document.createElement('th');
        th.textContent = el;
        tr.append(th);
    });

    table.append(tr);
}

function createTab() {
    table.textContent = '';
    createTh();
    sortData();
}




//day37 task 有变化的地方------------------------------------

var savebutton = document.getElementById('savedata');

savebutton.onclick = modifyData;

function isNum(dom) {
    var val = dom.value;
    if (val !== '0' && !+val) {
        dom.value = oldNum;
        alert('请输入正确类型的数字');
    }
}

function matchData(name) {
    var tempValues = document.querySelectorAll('[name=' + name + ']:not([value="all"]):checked');
    var tempValues2 = document.querySelectorAll('[name=' + name + ']');
    var tempValues3 = document.querySelectorAll('[name=' + name + ']:not([value="all"])');
    var temparr = [];

    if (matcharr.length === 0) {
        temparr = sourceData;
    } else {
        temparr = matcharr;
        matcharr = [];
    }

    if ((tempValues.length === (tempValues2.length - 1)) || tempValues.length === 0) {
        
        tempValues3.forEach(function (el) {
            temparr.forEach(function (el2) {
                if (el2[name] === el.value) {
                    matcharr.push(el2);
                }
            });
        });
    } else {
        tempValues.forEach(function (el) {
            temparr.forEach(function (el2) {
                if (el2[name] === el.value) {
                    matcharr.push(el2);
                } 
            });
        });
    }
}

function sortData() {
    var provalues = document.querySelectorAll('[name="product"]:not([value="all"]):checked');
    var regvalues = document.querySelectorAll('[name="region"]:not([value="all"]):checked');
    countI = flag;

    matcharr.forEach(function (el) {
        var tr = document.createElement('tr');
        var temp, dataarr;
        
        if ((regvalues.length === 1) && (provalues.length !== 1)) {
            temp = switchData(el.region, el.product);
        } else {
            temp = switchData(el.product, el.region);
        }

        tr.append(temp);

        
        dataarr = window.localStorage[el.region + el.product] ? JSON.parse(window.localStorage[el.region + el.product]) : el.sale; //这里以下有改动---------------

        dataarr.forEach(function (el2) {
            var td = document.createElement('td');  
            var input = document.createElement('input');
            var but1 = createButton('确定');
            var but2 = createButton('取消');

            td.onclick= function (ev) {

                if (ev.target.textContent === '确定') {
                    var input = ev.currentTarget.getElementsByTagName('input')[0];
                    ev.target.style.display = 'none';
                    ev.target.nextElementSibling.style.display = 'none';
                    isNum(input);
                    return;
                }

                if (ev.target.textContent === '取消') {
                    var input = ev.currentTarget.getElementsByTagName('input')[0];
                    ev.target.style.display = 'none';
                    ev.target.previousElementSibling.style.display = 'none';
                    input.value = oldNum;
                    return;
                }

                this.firstElementChild.focus();
            };
            
            input.addEventListener('focusout', function (ev) {
                if (ev.relatedTarget && ev.relatedTarget.tagName === 'BUTTON') return;
                isNum(ev.currentTarget);
                var buts = ev.currentTarget.parentElement.getElementsByTagName('button');

                for (var i = 0; i < buts.length; i++) {
                    buts[i].style.display = 'none';
                }
               
            });

            input.onfocus = function (ev) {
                oldNum = ev.currentTarget.value;
                var buts = ev.currentTarget.parentElement.getElementsByTagName('button');

                for (var i = 0; i < buts.length; i++) {
                    buts[i].style.display= 'block';
                }
            };


            input.onkeydown = function (ev) {
                var buts = ev.currentTarget.parentElement.getElementsByTagName('button');
                
                if (ev.keyCode === 13) ev.currentTarget.blur();

                if (ev.keyCode === 27) {
                    ev.currentTarget.value = oldNum;
                    ev.currentTarget.blur();
                }
            };

            input.type = 'text';
            input.size = '2';
            input.value = el2;
            td.append(input, but1, but2);
            tr.append(td);
        });
        table.append(tr);
    });
    
}


function switchData(v1, v2) {
    var td, td2;
    var frag = document.createDocumentFragment();
    if (flag === countI) {                      
        td = document.createElement('td');
        td.textContent = v1;
        td.rowSpan = flag;
        td.className = 'fixed';
        frag.append(td);
    } 

    td2 = document.createElement('td');
    td2.className = 'fixed';
    td2.textContent = v2;
    frag.append(td2);

    countI -= 1;
    if (countI === 0) {
        countI = flag;
    }

    return frag;
}



function modifyData() {
    var trs = table.getElementsByTagName('tr');
    var inputs, temparr, key;

    if (!trs.length) return;

    for (var i = 1; i < trs.length; i++) {
        inputs = trs[i].getElementsByTagName('input');
        temparr = [];

        for (var j = 0; j < inputs.length; j++) {
            temparr.push(Number(inputs[j].value));
           
        }

        key = matcharr[i - 1].region + matcharr[i - 1].product;
        window.localStorage.setItem(key, JSON.stringify(temparr));
        

    }
}


function createButton(text) {
    var but = document.createElement('button');
    but.type = 'button';
    but.textContent = text;
    return but;
}