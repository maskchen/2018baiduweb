function createTab() {
    table.textContent = '';
    createTh();
    sortData();
}

var regionFCol;

function createTh() {
    var temparr;
    var provalues = document.querySelectorAll('[name="product"]:not([value="all"]):checked');
    var regvalues = document.querySelectorAll('[name="region"]:not([value="all"]):checked');
    var length = document.querySelectorAll('[name="region"]:not([value="all"])').length;
    regionFCol = null;

    if ((regvalues.length === 1) && (provalues.length !== 1)){
        temparr = ['地区','产品'];
        flag = provalues.length  || length;
        regionFCol = true; //优化点，不重复判断，把需要的值输出到全局；
    } else {
        temparr = ['产品','地区'];
        flag = regvalues.length || length;
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


function sortData() {

    matcharr.forEach(function (el, index) {
        var tr = document.createElement('tr');
        var temp;
        
        if (regionFCol) {
            temp = switchData(el.region, el.product, index);
        } else {
            temp = switchData(el.product, el.region, index);
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

function switchData(v1, v2, index) {
    var td, td2;
    var frag = document.createDocumentFragment();
    if (index % flag === 0) {   //优化点，巧用数组键值和次列个数的余数运算来解决；                   
        td = document.createElement('td');
        td.textContent = v1;
        td.rowSpan = flag;
        frag.append(td);
    } 

    td2 = document.createElement('td');
    td2.textContent = v2;
    frag.append(td2);

    return frag;
}