;

document.body.addEventListener('click', function (ev) {
    if (ev.target.type === 'checkbox') {
        setTimeout(writehash, 0);
    }
}, false);

window.addEventListener('load', function () {
    var hashs = decodeURI(window.location.hash);

    if (hashs) {
        hashs = hashs.slice(1).split('-');

        for (var i = 0; i < hashs.length; i++) {
            document.querySelector('input[value="' + hashs[i] + '"]').checked = true;
            
        }
      
        var event = new Event('change');
        document.querySelector('input[value="' + hashs[i - 1] + '"]').dispatchEvent(event);

    }
    
});

function writehash() {
    var arr = [];

    for (var i = 0; i < matcharr.length; i++) {
        if (!arr.length || !arr.some(function (el) {
            return matcharr[i].region === el;
        }))  arr.push(matcharr[i].region);

        if (!arr.some(function (el) {
            return matcharr[i].product === el;
        }))  arr.push(matcharr[i].product);

    }

    window.location.hash = arr.join('-');

    /*方法二
    var provalues = document.querySelectorAll('[name="product"]:not([value="all"]):checked');
    var regvalues = document.querySelectorAll('[name="region"]:not([value="all"]):checked');

    if ((provalues.length || regvalues.length) && (provalues.length === 0 || regvalues.length === 0)) {
        if (provalues.length === 0) provalues = document.querySelectorAll('[name="product"]:not([value="all"])');

        if (regvalues.length === 0) regvalues = document.querySelectorAll('[name="region"]:not([value="all"])');
    }

    var len = provalues.length > regvalues.length ? provalues.length : regvalues.length;

    for (var i = 0; i < len ; i++) {
        if (provalues[i]) {
            arr.push(transProduct[provalues[i].value]);
        }

        if(regvalues[i]) {
            arr.push(transRegion[regvalues[i].value]);
        }
    }*/

    
}