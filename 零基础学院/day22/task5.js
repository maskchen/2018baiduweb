var queue = ["apple", "pear"];
var addv = document.getElementById('queue-input');
var pcont = document.getElementById('queue-cont');
var inb = document.getElementById('in-btn');
var outb = document.getElementById('out-btn');
var frontq = document.getElementById('font-btn');
var emq = document.getElementById('empty-btn');

function addq(){
    if (addv.value !== ''){
        queue.unshift(addv.value);
        pcont.innerHTML = queue.join('-&gt;')
    }
    
}

function delq(){
    queue.pop();
    pcont.innerHTML = queue.join('-&gt;')
}

function printf(){
    pcont.innerHTML = queue[queue.length - 1];
}

function askq(){
    if (queue.length > 0){
        pcont.innerHTML = '队列不为空';
    } else {
        pcont.innerHTML = '队列为空';
    }
}

inb.onclick = addq;
outb.onclick = delq;
frontq.onclick = printf;
emq.onclick = askq;

//--------------------task-5-2--------------------------------

function addq2(){
    if (addv.value !== ''){
        queue.push(addv.value);
        pcont.innerHTML = queue.join('&lt;-')
    }
    
}

function delq2(){
    queue.shift();
    pcont.innerHTML = queue.join('&lt;-')
}

function printf2(){
    pcont.innerHTML = queue[0];
}


//--------------------task-5-3--------------------------------

var stack = ["apple", "pear"];

var adds = document.getElementById('stack-input');
var scont = document.getElementById('stack-cont');
var pbtn = document.getElementById('push-btn');
var pobtn = document.getElementById('pop-btn');
var fbtn = document.getElementById('font-btn2');
var embtn = document.getElementById('empty-btn2');

function enters(){
    if (adds.value !== ''){
        stack.push(adds.value);
        scont.innerHTML = stack.join('-&gt;');
    }
}

function outs(){
    stack.pop();
    scont.innerHTML = stack.join('-&gt;');
}

function psf(){
    scont.innerHTML = stack[stack.length - 1];
}

function asks(){
    if (stack.length > 0){
        scont.innerHTML = '栈不为空';
    } else {
        scont.innerHTML = '栈为空';
    }
}

pbtn.onclick = enters;
pobtn.onclick = outs;
fbtn.onclick = psf;
embtn.onclick = asks;


//--------------------task-5-4--------------------------------

function enters2(){
    if (adds.value !== ''){
        stack.unshift(adds.value);
        scont.innerHTML = stack.join('&lt;-');
    }
}

function outs2(){
    stack.shift();
    scont.innerHTML = stack.join('&lt;-');
}

function psf2(){
    scont.innerHTML = stack[0];
}