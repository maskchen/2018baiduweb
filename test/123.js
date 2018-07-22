var x= window.indexedDB.open('test1', 1);
var sjk, biao;

x.onupgradeneeded = function (ev) {
    sjk = ev.target.result;
    biao = sjk.createObjectStore('person'); 
    
    console.log(sjk);
    console.log(biao);
}

x.onsuccess = function () {
    var t = x.result.transaction(['person'], 'readwrite').objectStore('person');
    console.log(t);
    var y = t.add({'pin': 33,
        'name': 'wuyi'
            
});
    t.add({'pin': 66,
        'name': 're'
            
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


