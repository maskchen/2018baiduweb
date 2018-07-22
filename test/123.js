var x= window.indexedDB.open('test1', 1);
var sjk, biao;

x.onupgradeneeded = function (ev) {
    sjk = ev.target.result;
    biao = sjk.createObjectStore('person', {keyPath: 'pin'}); 
    
    console.log(sjk);
    console.log(biao);
}

x.onsuccess = function () {
    var t = x.result.transaction(['person'], 'readwrite').objectStore('person');
    t.add({'33': 'wuyi'}, 'pin');
    t.add({'66': 're'}, 'pin');
    console.log(t);
}


