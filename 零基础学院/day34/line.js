;
var data = [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270];
var canvasZhe = document.getElementById('zhe');
var ctxzhe = canvasZhe.getContext('2d');

function showGraphic(data) {
    axes();
    var stepH = horDiv(canvasZhe.width);
    var ymax = verDiv(canvasZhe.height, data);
    var multi = (canvasZhe.height - 100) / ymax;
    assistline(stepH, ymax);
    paintCircle(data, stepH, multi)
}

showGraphic(data);

function axes() {
    ctxzhe.save();
    ctxzhe.lineWidth = '6';
    ctxzhe.lineCap = 'round';
    ctxzhe.beginPath();
    ctxzhe.moveTo(100, 450);
    ctxzhe.lineTo(100, 50);
    ctxzhe.moveTo(100, 450);
    ctxzhe.lineTo(700, 450);
    ctxzhe.stroke();
    ctxzhe.restore();
}

function horDiv(width) {
    var stepH = Math.floor((width - 200) / 12);
    return stepH;
}

function verDiv(height, data) {
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

function assistline(x, y) {
    ctxzhe.save();
    ctxzhe.translate(100, 450);
    ctxzhe.strokeStyle = 'gray';
    ctxzhe.font = '12px serif';
    for (var i = 0; i < 12; i++) {
        ctxzhe.beginPath();
        ctxzhe.strokeText(i + 1 + '月', x * i - 10, 20)
    }

    for (i = 0; i <= 5; i++) {
        ctxzhe.beginPath();
        ctxzhe.strokeText( (y / 5) * i, -24, -(400 / 5) * i + 6);
        if (i === 0) continue;
        ctxzhe.moveTo(0 ,-(400 / 5) * i);
        ctxzhe.lineTo(600 ,-(400 / 5) * i);
        ctxzhe.stroke();
    }

    ctxzhe.restore();    
}

function paintCircle(data, x, z) {
    ctxzhe.save();
    ctxzhe.translate(100, 450);
    ctxzhe.fillStyle = '#6d97ab';
    ctxzhe.strokeStyle = '#6d97ab';
    ctxzhe.lineWidth = '2';
    ctxzhe.lineCap = 'square';

    for (var i = 0; i < 12; i++) {
        ctxzhe.beginPath();
        ctxzhe.moveTo(x * i - 2.5, -Math.floor(data[i] * z));
        ctxzhe.arc(x * i, -Math.floor(data[i] * z), 3, Math.PI * 2, false);
        ctxzhe.fill();

        if (i === 11) {
            ctxzhe.moveTo(x * i, -Math.floor(data[i] * z));
            ctxzhe.lineTo(x * i + 2, -Math.floor(data[i + 1] * z));
            ctxzhe.stroke();
            continue;
        }

        ctxzhe.moveTo(x * i, -Math.floor(data[i] * z));
        ctxzhe.lineTo(x * (i + 1), -Math.floor(data[i + 1] * z))
        ctxzhe.stroke();
    }

}
