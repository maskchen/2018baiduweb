var x= window.indexedDB.open('test1', 1);
var sjk, biao;

x.onupgradeneeded = function (ev) {
    sjk = ev.target.result;
    biao = sjk.createObjectStore('person', {keyPath: 'pin'}); 
    var t = sjk.transaction(['person'], 'readwrite').objectStore('person');
    t.add('wuyi', 33);
    t.add('re', 55);
    console.log(sjk);
    console.log(biao);
    
}


