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
}]


var selR = document.getElementById('region-select');
var selPro = document.getElementById('product-select');
var table1 = document.querySelector('#table-wrapper table');
var tharr;

function theadc() {
    tharr = ['商品', '地区'];
    var i;
    for( i = 0; i < 12; i++) {
        tharr.push( i + 1 + '月');
    }
}

function creatTh() {
    theadc();

    var tr = document.createElement('tr');
    tharr.forEach(function (el){
        var th = document.createElement('th');
        th.textContent = el;
        tr.append(th);
    })
    table1.appendChild(tr);
}


//----------------上面为创建表格的标题行--------------------------------

var matchData;

function selData() {
    matchData = [];
    sourceData.forEach( function (el) {
            var temparr = el.sale.slice();  //注意对象的指向性问题，对象是把地址赋予变量；
            temparr.unshift(el.product, el.region);
            matchData.push(temparr);
        })

    selRegion();
    selProd();
}

function selRegion() {
    var temp = matchData.filter( function (el) {
        return (el[1] === selR.value)
    });

    if (temp.length) {
        matchData = temp;
    }
}

function selProd() {
    var temp = matchData.filter(function (el) {
        return (el[0] === selPro.value);
    });

    if (temp.length) {
        matchData = temp;
    }
}

function createMTd() {
    table1.textContent = ''; 
    creatTh();
    selData();

    var frag = document.createDocumentFragment();
    var i;
    for (i = 0; i < matchData.length; i++) {
        var tr = document.createElement('tr');
        matchData[i].forEach(function (el) {
            var td = document.createElement('td');
            td.textContent = el;
            tr.append(td);
        })
        frag.append(tr);
    }
    
    table1.append(frag);
    
}

createMTd();
selR.onchange = createMTd;
selPro.onchange = createMTd;