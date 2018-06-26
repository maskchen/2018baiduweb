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

checkboxes.forEach(function (el) {
    el.onchange = function (e) {
        checkbox(('[name=' + e.target.name + ']'), e);
        selData();
        createTab();
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
    matchData('region');
    matchData('product');
    
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
        // 原来是这样就行的，为了后面表格输出的顺序 修改如以下 matcharr = temparr;
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

function createTh() {
    var temparr;
    var provalues = document.querySelectorAll('[name="product"]:not([value="all"]):checked');
    var regvalues = document.querySelectorAll('[name="region"]:not([value="all"]):checked');

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

/*   原未分合并列代码
    matcharr.forEach(function (el) {
        var tr = document.createElement('tr');
        var temparr = el.sale.slice();
        temparr.unshift(el.product, el.region);
        temparr.forEach(function (el2) {
            var td = document.createElement('td');
            td.textContent = el2;
            tr.append(td);
        });
        table.append(tr);
    });  
    
*/
}

function sortData() {
    var provalues = document.querySelectorAll('[name="product"]:not([value="all"]):checked');
    var regvalues = document.querySelectorAll('[name="region"]:not([value="all"]):checked');
    countI = flag;

    matcharr.forEach(function (el) {
        var tr = document.createElement('tr');
        var temp;
        
        if ((regvalues.length === 1) && (provalues.length !== 1)) {
            temp = switchData(el.region, el.product);
        } else {
            temp = switchData(el.product, el.region);
        }

        tr.append(temp);

        el.sale.forEach(function (el2) {
            var td = document.createElement('td');
            td.textContent = el2;
            tr.append(td);
        });
        table.append(tr);
    });

    
}

function switchData(v1, v2) {
    var td, td2;
    var frag = document.createDocumentFragment();
    if (flag === countI) {                      //关键点在于数据输出的顺序和flag，countI的数判断；
        td = document.createElement('td');
        td.textContent = v1;
        td.rowSpan = flag;
        frag.append(td);
    } 

    td2 = document.createElement('td');
    td2.textContent = v2;
    frag.append(td2);

    countI -= 1;
    if (countI === 0) {
        countI = flag;
    }

    return frag;
}