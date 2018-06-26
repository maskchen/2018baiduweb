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