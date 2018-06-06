;
function curT(){
    var t = new Date();
    var y = t.getFullYear();
    var m = exam(t.getMonth() + 1);
    var d = exam(t.getDate());
    var w = week(t.getDay());
    var tc = getT(t);
    
    reslut(y, m, d, w, tc);
}

function exam(x){
    if (x < 10){
        x = '0' + x;
    } else {
        x = '' + x;
    }
    return x;
}

function week(x){
    var obj = {
        0 : '星期天',
        1 : '星期一',
        2 : '星期二',
        3 : '星期三',
        4 : '星期四',
        5 : '星期五',
        6 : '星期六'
    }

    if (x <= 6 && x >= 0){
        return obj[x];
    } else {
        return '输入值错误，请输入0~6的值';
    }
}

function getT(t){
    return t.toTimeString().slice(0, 8);
}

function reslut(y, m, d, w, tc){
    var p = document.getElementById('clock-t');
    p.innerHTML = y + '年' + m + '月' + d + '日' + w + tc; 
}

var timer = setInterval(curT, 1000);

//-----------------------task-2-part2--------------------------------------------------

function curT2(){
    var t = new Date();
    var y = t.getFullYear();
    var m = exam(t.getMonth() + 1);
    var d = exam(t.getDate());
    var w = week2(t.getDay());
    var tc = getT2(t);
    
    reslut2(y, m, d, w, tc);
}

function week2(x){
    var obj = {
        0 : 'Sunday',
        1 : 'Monday',
        2 : 'Tuesday',
        3 : 'Wednesday',
        4 : 'Thursday',
        5 : 'Friday',
        6 : 'Saturday'
    }

    if (x <= 6 && x >= 0){
        return obj[x];
    } else {
        return '输入值错误，请输入0~6的值';
    }
}

/*
function getT2(t){
    var x =  t.toLocaleTimeString();

    if (x.match('午')){
        var y = x.slice(0, 2);
        var z = x.slice(2);

        if (y === '上午'){
            y = 'AM';
        } else {
            y = 'PM';
        }

        x = z + ' ' + y;
    }

    var a = x.split(':');
    if (a[0] < 10){
        a[0] = '0' + a[0];
        x = a.join(':');
    }

    return x;
}
*/

function getT2(x){
    var h = x.getHours();
    var m = x.getMinutes();
    var s = x.getSeconds();
    var temp = ':' + m + ':' + s;

    if(h > 12){
        h = h - 12;
        if (h < 10){
            h = '0' + h;
        }
        temp = h + temp + ' PM';        
    } else {
        if (h < 10){
            h = '0' + h;
        }
        temp = h + temp + ' AM';
    }

    return temp;
}

function reslut2(y, m, d, w, tc){
    var p = document.getElementById('clock-t2');
    p.innerHTML = y + '-' + m + '-' + d + ' ' + w + tc; 
}

var timer2 = setInterval(curT2, 1000);