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
    showPillar(data, multi, group, '#49729b');

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

function showPillar(data, multiple, dom, color) {
    var step = Math.floor(600 / 36);  //柱状主体为间隔的两倍
    var residue = 600 % 36;
    var i, y, rect;
    var x = Math.floor(residue / 2) + 100;
    var frag = document.createDocumentFragment();

    for (i = 0; i < data.length; i++) {
        y = Math.floor(data[i] * multiple);
        rect = pillar(x, y, step * 2, color);
        frag.appendChild(rect);
        x += step * 3;
    }

    dom.appendChild(frag);
}


function pillar(x, y, width, color) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x + '');
    rect.setAttribute('y', 450 - y + '');
    rect.setAttribute('width', width + '');
    rect.setAttribute('height', y + '');
    rect.setAttribute('fill', color);
    return rect;
}


//-------------------选中的全部柱状图----------------------------------

function stickAll(data) {
    var svg = document.getElementById('zhu');
    var ymax = verDiv2(data);
    var multi = 400 / ymax;

    var group = document.getElementById('stickall');
    if (!group) {
        group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('id', 'stickall');
    }
    group.innerHTML = '';

    yText(group, ymax, 5);
    showAllPillars(data, multi, group);

    svg.appendChild(group);
}

function showAllPillars(data, multiple, dom) {
    var step = Math.floor(600 / 36);  //柱状主体为间隔的两倍
    var residue = 600 % 36;
    var i, y, rect, j, x, color;
    
    var frag = document.createDocumentFragment();

    for (j = 0; j < data.length; j++) {
        var arr = window.localStorage[data[j].region + data[j].product] ? JSON.parse(window.localStorage[data[j].region + data[j].product]) : data[j].sale;
        x = Math.floor(residue / 2) + 100 + j * (step * 2 / data.length);
        color = lineColor[j];

        for (i = 0; i < arr.length; i++) {
            y = Math.floor(arr[i] * multiple);
            rect = pillar(x, y, step * 2 / data.length, color);
            frag.appendChild(rect);
            x += step * 3;
        }
    }

    dom.appendChild(frag);
}


