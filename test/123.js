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
    console.log(t);
    t.add({'name': 'wuyi',
            'pin': 33
});
    t.add({'name': 're',
            'pin': 66
});

    var p = t.get(66);
    p.onsuccess = function () {
        console.log(p.result);
    }
    
}


