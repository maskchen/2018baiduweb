function setE(x, y){
    var t1 = document.querySelectorAll('#' + y + ' > option');
    var getly = t1[t1.length - 1].value;
    var fra = document.createDocumentFragment();

    addE(x, getly, fra)
    document.querySelector('#' + y).appendChild(fra);
    
}

function addE(x, y, z){
    while (x--){
        var t2 = document.createElement('option');
        y = +y + 1;
        var t3 = document.createTextNode(y + '');
        t2.value = y + '';
        t2.appendChild(t3);
        z.appendChild(t2);
    }
}

function setD(x){
    var t1 = document.getElementById('year-select').value;
    var t2 = document.getElementById('month-select').value;
    var t3 = new Date(t1, t2);
    t3.setHours(t3.getHours() - 1);
    var t4 = t3.getDate();
    document.getElementById('day-select').innerHTML = '<option value="1">1</option> '

    setE((t4 - 1), 'day-select');
}

document.getElementById('year-select').addEventListener('change', setD);
document.getElementById('month-select').addEventListener('change', setD);


setE(30, 'year-select');
setE(11, 'month-select');
setE(22, 'hour-select');
setE(58, 'minite-select');
setE(58, 'second-select');
setD();


//-------------------------以上为设定日期和时间--以下为判断时间大小-------------------------------------------------


function compare(){
    var ty = document.getElementById('year-select').value;
    var tm = document.getElementById('month-select').value - 1;
    var td = document.getElementById('day-select').value;
    var th = document.getElementById('hour-select').value;
    var tmin = document.getElementById('minite-select').value;
    var ts = document.getElementById('second-select').value;
    var t1 = new Date(ty, tm, td, th, tmin, ts);
    var t2 = new Date();
    var res1 = curT3(t1);
    var res2 = sturn(t1, t2);
    var res3 = countR(t1, t2);

    document.getElementById('result-wrapper').innerHTML = res1 + res2 + res3;
}

function curT3(t){
    var y = t.getFullYear();
    var m = exam(t.getMonth() + 1);
    var d = exam(t.getDate());
    var w = week(t.getDay());
    var tc = getT(t);
    var res = '现在距离 ' + y + ' 年 ' + m + ' 月 ' + d + ' 日 ' + w + tc; 
    return res;
}

function sturn(t1, t2){
    if (t1 >= t2){
        return ' 还有 ';
    } else {
        return ' 已经过去 ';
    }
}

function countR(t1, t2){
    var nabs = Math.abs(t1 - t2);
    var temp = nabs % (3600 * 24 * 1000);
    var day = Math.floor(nabs / (3600 * 24 * 1000));
    var temp2 = temp % (3600 * 1000);
    var hours = Math.floor(temp / (3600 * 1000));
    temp = temp2 % (60 * 1000);
    var mins = Math.floor(temp2 / (60 * 1000));
    var secs = Math.floor(temp / 1000);

    return (day + ' 天 ' + hours + ' 小时 ' + mins + ' 分 ' + secs + ' 秒');
}

var i;
var sel = document.querySelectorAll('select');

for (i = 0; i < sel.length; i++){
    sel[i].addEventListener('change', compare);
}

compare();