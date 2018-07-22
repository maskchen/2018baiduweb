var x= window.indexedDB.open('test1', 1);
var sjk, biao;

x.onupgradeneeded = function (ev) {
    sjk = ev.target.result;
    biao = sjk.createObjectStore('person', {keyPath: 'pin'}); 
    console.log(sjk);
    console.log(biao);
    
}


