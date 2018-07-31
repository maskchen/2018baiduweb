var bas = document.getElementById('basic');
var clock = document.getElementById('clock');
var cloud = document.getElementById('cloud');

var ctx1 = bas.getContext('2d');
var ctx2 = clock.getContext('2d');
var ctx3 = cloud.getContext('2d');

//-------画直线
ctx1.beginPath();
ctx1.moveTo(10, 10);
ctx1.lineTo(110, 10);
ctx1.stroke();

//---------画矩形
ctx1.beginPath();
ctx1.strokeRect(10, 30, 100, 80);

//-------画圆形
ctx1.fillStyle = 'green';
ctx1.beginPath();
ctx1.arc(60, 200, 50, 0, Math.PI * 2);
ctx1.fill();

//---------显示文字
ctx1.font = '30px serif';
ctx1.fillStyle = '#ecc365'
ctx1.beginPath();
ctx1.fillText('我是文字', 20, 280);

//--------时钟
ctx2.save();
ctx2.lineWidth = '10';
ctx2.strokeStyle = '#dd5478';
ctx2.beginPath();
ctx2.arc(150, 150, 100, 0, Math.PI * 2);
ctx2.stroke();
ctx2.restore();

ctx2.save();
ctx2.lineWidth = '6';
ctx2.lineCap = 'round';
ctx2.beginPath();
ctx2.moveTo(150, 150);
ctx2.lineTo(150, 215);
ctx2.moveTo(150, 150);
ctx2.lineTo(195, 150);
ctx2.stroke();
ctx2.restore();

ctx2.save();
ctx2.fillStyle = '#bb6655';
ctx2.beginPath();
ctx2.arc(150, 150, 5, 0, Math.PI * 2);
ctx2.fill();
ctx2.restore();

ctx2.save();
ctx2.translate(150, 150);
ctx2.rotate(-Math.PI/6);
for (var i = 0; i < 12; i++) {
    ctx2.beginPath();
    ctx2.rotate(Math.PI/6);   //旋转是累加的
    ctx2.moveTo(75, 0);       //移动原点后，坐标就变了
    ctx2.lineTo(90, 0);
    ctx2.stroke();
}
ctx2.restore();


//------------画云

ctx3.lineJoin = 'round';
ctx3.beginPath();
ctx3.moveTo(50, 60);
ctx3.quadraticCurveTo(70, 20, 100, 45);
ctx3.quadraticCurveTo(150, 15, 180, 55);
ctx3.quadraticCurveTo(280, 35, 240, 105);
ctx3.quadraticCurveTo(270, 175, 190, 145);
ctx3.quadraticCurveTo(170, 185, 120, 145);
ctx3.quadraticCurveTo(5, 165, 50, 60);
ctx3.stroke();