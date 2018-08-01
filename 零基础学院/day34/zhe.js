;
var grawrap = document.getElementById('graphic-wrapper');

table.onmouseover = function (ev) {
    var matchdata = getData(ev);
    if (!matchdata) return;
    paintzhe(matchdata);
    stick(matchdata);
};

table.onmouseleave = function () {
    var zhe = document.getElementById('zhe');
    var ctx = zhe.getContext('2d');
    ctx.clearRect(0, 0, 800, 500);

    var allzhe = document.getElementById('allzhe');
    allzhe.style['opacity'] = 1;

    //----------柱状图清除部分--------------
    var group = document.getElementById('paintpart');
    group.innerHTML = '';

    var allzhu = document.getElementById('stickall');
    allzhu.setAttribute('opacity', 1);
};

table.onmouseenter = function () {
    var allzhe = document.getElementById('allzhe');
    allzhe.style['opacity'] = 0; 

    //----------柱状图部分--------------
    var allzhu = document.getElementById('stickall');
    allzhu.setAttribute('opacity', 0);
};

//---------折线图固定部分---------------------

   function addcanvas() {
    var canvas = document.createElement('canvas');
    canvas.width = '800';
    canvas.height = '500';
    canvas.style.width = '50%';
    return grawrap.appendChild(canvas);
}

function canvasbg() {
    var bg = addcanvas();
    bg.id = 'canvasbg';
    var ctx = bg.getContext('2d');
    var step = horDiv(bg.width);
    axes(ctx);
    assistline(step, ctx);
}

canvasbg();

function axes(ctx) {
    ctx.save();
    ctx.lineWidth = '6';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(100, 450);
    ctx.lineTo(100, 50);
    ctx.moveTo(100, 450);
    ctx.lineTo(700, 450);
    ctx.stroke();
    ctx.restore();
}

function horDiv(width) {
    var stepH = Math.floor((width - 200) / 12);
    return stepH;
}

function assistline(x, ctx) {
    ctx.save();
    ctx.translate(100, 450);
    ctx.strokeStyle = 'gray';
    ctx.font = '16px serif';
    for (var i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.strokeText(i + 1 + '月', x * i - 10, 30)
    }

    for (i = 0; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0 ,-(400 / 5) * i);
        ctx.lineTo(600 ,-(400 / 5) * i);
        ctx.stroke();
    }

    ctx.restore();    
}


    //----------绘画对应的折线图------------------



function paintzhe(data) {
    var zhe = document.getElementById('zhe') || addcanvas();
    zhe.id = 'zhe';
    zhe.style['position'] = 'absolute';
    zhe.style['z-index'] = '1';
    zhe.style.left = '0';

    var ymax = verDiv(data);
    var multi = (zhe.height - 100) / ymax;
    var step = horDiv(zhe.width);

    var ctx = zhe.getContext('2d');
    ctx.clearRect(0, 0, 800, 500);
    zheYText(ctx, ymax);
    paintCircle(data, step, multi, ctx, '#6d97ab');

}

function verDiv(data) {
    var temparr = data.slice();
    var i;

    if (temparr[0] === Object(temparr[0])) {
        var temparr2 = [];
        for (i = 0; i < temparr.length; i++) {
            temparr2 = temparr2.concat(temparr[i].sale);
        }

        temparr = temparr2;
    }

    temparr.sort(function (a, b) {
        return b - a;
    })

    var temp = temparr[0].toString();
    var firstnum = +temp[0] + 1;
    for (i = 0; i < temp.length - 1 ; i++) {
        firstnum += '0';
    }

    return +firstnum;
}


function zheYText(ctx, ymax) {
    ctx.save();
    ctx.translate(100, 450);
    ctx.strokeStyle = 'gray';
    ctx.font = '16px serif';
    var i;
    for (i = 0; i <= 5; i++) {
        ctx.beginPath();
        ctx.strokeText( (ymax / 5) * i, -28, -(400 / 5) * i + 6);
    }
    ctx.restore();
}


function paintCircle(data, x, z, ctx, color) {
    ctx.save();
    ctx.translate(100, 450);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = '2';
    ctx.lineCap = 'square';

    for (var i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(x * i - 2.5, -Math.floor(data[i] * z));
        ctx.arc(x * i, -Math.floor(data[i] * z), 3, Math.PI * 2, false);
        ctx.fill();

        if (i === 11) {
            ctx.moveTo(x * i, -Math.floor(data[i] * z));
            ctx.lineTo(x * i + 2, -Math.floor(data[i + 1] * z));
            ctx.stroke();
            continue;
        }

        ctx.moveTo(x * i, -Math.floor(data[i] * z));
        ctx.lineTo(x * (i + 1), -Math.floor(data[i + 1] * z))
        ctx.stroke();
    }

    ctx.restore();

}


//---------------选中的全部折线图-----------------------------

var lineColor = ['#FFC0CB', '#FF00FF', '#00FF7F', '#FFFF00', '#FF8C00', '#FF0000', '#696969', '	#DAA520', '#0000CD'];

function paintAllzhe(data) {
    var zhe = document.getElementById('allzhe') || addcanvas();
    zhe.id = 'allzhe';
    zhe.style['position'] = 'absolute';
    zhe.style.left = '0';

    var ymax = verDiv(data);
    var multi = (zhe.height - 100) / ymax;
    var step = horDiv(zhe.width);

    var ctx = zhe.getContext('2d');
    ctx.clearRect(0, 0, 800, 500);
    zheYText(ctx, ymax);
    allCircle(data, step, multi, ctx);
}

function allCircle(data, step, multi, ctx) {
    for (var i = 0; i < data.length; i++ ) {
        paintCircle(data[i].sale, step, multi, ctx, lineColor[i]);
        illustrate(data, ctx, (step * 1.75), i);
    }
}

function illustrate(data, ctx, step, i) {
    ctx.save();
    ctx.lineWidth = '3';
    ctx.font = '12px serif';
    ctx.strokeStyle = lineColor[i];
    ctx.fillStyle = lineColor[i];
    ctx.moveTo( i * step, 17);
    ctx.lineTo( 10 + i * step, 17);
    ctx.moveTo(13 + i * step, 20);
    ctx.fillText(data[i].region + data[i].product, 13 + i * step, 20);
    ctx.stroke();
    ctx.restore();
}