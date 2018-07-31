;
var grawrap = document.getElementById('graphic-wrapper');

table.onmouseover = function (ev) {
    var matchdata = getData(ev);
    if (!matchdata) return;
    paintzhe(matchdata);
    stick(matchdata);
};

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


//-----------折线图----------------

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
    zhe.style.left = '0';

    var ymax = verDiv(data);
    var multi = (zhe.height - 100) / ymax;
    var step = horDiv(zhe.width);

    var ctx = zhe.getContext('2d');
    ctx.clearRect(0, 0, 800, 500);
    ctx.save();
    ctx.translate(100, 450);
    ctx.strokeStyle = 'gray';
    ctx.font = '16px serif';
    for (i = 0; i <= 5; i++) {
        ctx.beginPath();
        ctx.strokeText( (ymax / 5) * i, -28, -(400 / 5) * i + 6);
    }
    ctx.restore();
    paintCircle(data, step, multi, ctx);

}

function verDiv(data) {
    var temparr = data.slice();
    temparr.sort(function (a, b) {
        return b - a;
    })

    var temp = temparr[0].toString();
    var firstnum = +temp[0] + 1;
    for (var i = 0; i < temp.length - 1 ; i++) {
        firstnum += '0';
    }

    return +firstnum;
}


function paintCircle(data, x, z, ctx) {
    ctx.save();
    ctx.translate(100, 450);
    ctx.fillStyle = '#6d97ab';
    ctx.strokeStyle = '#6d97ab';
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


//-----------柱状图----------------

function stick(data) {
    var svg = document.getElementById('zhu');
    var ymax = verDiv(data);
    var multi = 400 / ymax;

    var group = document.getElementById('paintpart');
    if (!group) {
        group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('id', 'paintpart');
    }
    group.innerHTML = '';

    yText(group, ymax, 5);
    showPillar(data, multi, group);

    svg.appendChild(group);
}

    //-----------柱状图轴部分-------------------

zhuaxes(5);

function creatSvg() {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 800 500');
    svg.setAttribute('width', '50%');
    svg.setAttribute('id', 'zhu');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    grawrap.appendChild(svg);
    
    return svg;
}

function zhuaxes(rows) {
    var svg = creatSvg();
    var mult = Math.floor(400 / rows);
    var step = Math.floor(600 / 36);  //柱状主体为间隔的两倍
    var residue = 600 % 36;
    var x = '<line x1="100" y1="450" x2="700" y2="450" stroke="black" stroke-width="4"></line>';
    var hx = '';
    var xtext = '';
    for (var i = 1; i <= 5; i++ ) {
        hx += '<line x1="100" y1="' + (450 - i * mult) + '" x2="700" y2="' + (450 - i * mult) + '" stroke="#999" stroke-width="1.5"></line>';
    }

    for (i = 0; i < 12; i++) {
        xtext += '<text x="' + (100 + residue / 2 + i * 3 * step) + '" y="480" font-size="16px" font-weight="bold" fill="gray">' + (i + 1) + '月</text>';
        
    }

    svg.innerHTML = x + hx + xtext;
}


    //---------------柱状图数据绘制部分--------------------------

function yText(dom, num, rows) {
    var step = Math.floor(num / rows);
    var y = 455;
    var yvalue = 0;
    var alltext = '';

    for (var i = 0; i <= rows; i++) {
        alltext += '<text x="70" y="' + y + '" font-size="16px" font-weight="bold" fill="gray">' + yvalue + '</text>';
        y -= Math.floor(400 / rows);;
        yvalue += step;
    }
   
    dom.innerHTML += alltext;
}

function showPillar(data, multiple, dom) {
    var step = Math.floor(600 / 36);  //柱状主体为间隔的两倍
    var residue = 600 % 36;
    var i, y, rect;
    var x = Math.floor(residue / 2) + 100;
    var frag = document.createDocumentFragment();

    for (i = 0; i < data.length; i++) {
        y = Math.floor(data[i] * multiple);
        rect = pillar(x, y, step);
        frag.appendChild(rect);
        x += step * 3;
    }

    dom.appendChild(frag);
}


function pillar(x, y, step) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x + '');
    rect.setAttribute('y', 450 - y + '');
    rect.setAttribute('width', step * 2 + '');
    rect.setAttribute('height', y + '');
    rect.setAttribute('fill', '#49729b');
    return rect;
}
