;
var data = [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270];


function showZZT() {
    var svg = svgwrap();
    var ynum = countH(data);
    var multiple = (400 / ynum);
    axes(svg);
    yText(svg, ynum);
    showPillar(data, multiple, svg);
}

showZZT();

function svgwrap() {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '500');
    svg.setAttribute('height', '500');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    document.body.appendChild(svg);
    return svg;
}

function axes(dom) {
    var x = '<line x1="30" y1="475" x2="480" y2="475" stroke="black" stroke-width="4"></line>';
    var hx = '';
    for (var i = 1; i <= 5; i++ ) {
        hx += '<line x1="30" y1="' + (475 - i * 80) + '" x2="480" y2="' + (475 - i * 80) + '" stroke="#999" stroke-width="1.5"></line>';
    }

    dom.innerHTML = x + hx;
}

function pillar(x, y) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x + '');
    rect.setAttribute('y', 475 - y + '');
    rect.setAttribute('width', '24');
    rect.setAttribute('height', y + '');
    rect.setAttribute('fill', '#49729b');
    return rect;
}

function countH(data) {
    var temparr = data.slice();
    temparr.sort(function (a, b) {
        return (b - a) ;
    });

    var maxnum = temparr.shift();
    var temp = Math.floor(maxnum).toString();
    var firstnum = +temp[0] + 1;
    var i;

    for (i = 1; i < temp.length; i++) {
        firstnum = firstnum + '0';
    }

    return +firstnum;
}

function yText(dom, num) {
    var step = Math.floor(num / 5);
    var y = 480;
    var yvalue = 0;
    var alltext = '';
    var i;
    for (i = 0; i<= 5; i++) {
        alltext += '<text x="0" y=' + y + '>' + yvalue + '</text>';
        y -= 80;
        yvalue += step;
    }
   
    dom.innerHTML += alltext;
}

function showPillar(data, multiple, dom) {
    var i, y, rect;
    var x = 45;
    var frag = document.createDocumentFragment();

    for (i = 0; i < data.length; i++) {
        y = Math.floor(data[i] * multiple);
        rect = pillar(x, y);
        frag.appendChild(rect);
        x += 36;
    }

    dom.appendChild(frag);
}