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
    var y = t.add({'name': 'wuyi',
            'pin': 33
});
    t.add({'name': 're',
            'pin': 66
});
   
    y.onsuccess = function () {
        console.log('ddd');
    }

    y.onerror = function () {
        console.log('cuowu1');
    }

    var p = t.getAll();
    p.onsuccess = function () {
        console.log(p.result);
    }

    p.onerror = function () {
        console.log('cuowu2');
    }
    
}


