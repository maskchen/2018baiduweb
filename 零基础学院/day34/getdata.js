;
var grawrap = document.getElementById('graphic-wrapper');

//------------获取数据部分---------------------------

function getData(ev) {  //其实这个任务中，使用第二种方法会跟简单点；
    var trdom = ev.target.closest('tr');
    var th = table.firstElementChild.firstElementChild;
    var temp1, temp2, matchdom, region, product, matchdata;

    if (!trdom) return;

    if (trdom.firstElementChild.hasAttribute('rowspan')) {
        temp1 = trdom.firstElementChild.textContent;
        temp2 = trdom.firstElementChild.nextElementSibling.textContent;
    } else {
        temp2 = trdom.firstElementChild.textContent;
        matchdom = trdom.previousElementSibling;

        while (matchdom) {
            if (matchdom.firstElementChild.hasAttribute('rowspan')) {
                temp1 = matchdom.firstElementChild.textContent;
                break;
            }

            matchdom = matchdom.previousElementSibling;
        }
    }

    if (th.textContent === '产品') {
        product = temp1;
        region =temp2;
    } else {
        region =temp1;
        product = temp2;    
    }

    for (var i = 0; i < sourceData.length; i++) {
        if (sourceData[i].product === product && sourceData[i].region === region) {
            matchdata = sourceData[i].sale;
            break;
        }
    }
    return matchdata;
    
}