function selData() {
    matcharr = [];
    matchData();  
}

//思路2： 整体思考，所有勾上的形成一个筛选数组，所有数据一次性筛选同时符合的输出；
function matchData() {
    var tempValues = document.querySelectorAll('[type="checkbox"]:not([value="all"]):checked');
    var tempValues2 = document.querySelectorAll('[name="region"]:not([value="all"]):checked');
    var tempValues3 = document.querySelectorAll('[name="region"]:not([value="all"])');
    var tempValues4 = document.querySelectorAll('[name="product"]:not([value="all"]):checked');
    var tempValues5 = document.querySelectorAll('[name="product"]:not([value="all"])');
    var temparr = [];

    tempValues.forEach(function (el) {
        temparr.push(el.value);
    });

    if (!tempValues2.length) {
        tempValues3.forEach(function (el) {
            temparr.push(el.value);
        });
    } 

    if (!tempValues4.length) {
        tempValues5.forEach(function (el) {
            temparr.push(el.value);
        });
    } 

    sourceData.forEach(function (el) {
        if (isinclue(temparr, el.region) && isinclue(temparr, el.product)) matcharr.push(el);
    });
}

function isinclue(arr, x) {
    return arr.some(function (el) {
        return el === x;
    });
}


/*思路1：地区和商品分两次筛选
function selData() {
    matcharr = [];
    matchData('region');
    matchData('product');
    
}

function matchData(name) {
    var tempValues = document.querySelectorAll('[name=' + name + ']:not([value="all"]):checked');
    var tempValues2 = document.querySelectorAll('[name=' + name + ']:not([value="all"])');
    var temparr = [];
    if (matcharr.length === 0) {
        temparr = sourceData;
    } else {
        temparr = matcharr;
        matcharr = [];
    }

    if (tempValues.length === 0 || (tempValues.length === tempValues2.length)) return matcharr = temparr;
        
    tempValues.forEach(function (el) {
        temparr.forEach(function (el2) {
            if (el2[name] === el.value) {
                matcharr.push(el2);
            } 
        });
    });

}

*/