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