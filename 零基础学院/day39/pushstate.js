;

document.body.addEventListener('click', function (ev) {
    if (ev.target.type === 'checkbox') {
        setTimeout(addRecord, 0);
    }
}, false);

window.addEventListener('popstate', statechange, false);

function addRecord() {
    var arr = [];

    for (var i = 0; i < matcharr.length; i++) {
        if (!arr.length || !arr.some(function (el) {
            return matcharr[i].region === el;
        }))  arr.push(matcharr[i].region);

        if (!arr.some(function (el) {
            return matcharr[i].product === el;
        }))  arr.push(matcharr[i].product);

    }

    history.pushState({marked: arr.slice()}, '', '?' + arr.join('-'));
}


function statechange(ev) {

    document.querySelectorAll('input:checked').forEach(function (el) {
        el.checked = false;
    });

    ev.state = ev.state || history.state; //这里是个关键处

    if (!ev.state) {
        selData();
        createTab();
        paintAllzhe(matcharr);
        stickAll(matcharr);
        return;
    };

    var datas = ev.state.marked; 

    for (var i = 0; i < datas.length; i++) {
        document.querySelector('input[value="' + datas[i] + '"]').checked = true;

        if (datas.length - 1 === i) {
            var changetrigger = new Event('change');
            document.querySelector('input[value="' + datas[i] + '"]').dispatchEvent(changetrigger);
        }
    }
}



if (location.search) {
    var urlsearch = location.search.slice(1);
    var searchdata = decodeURI(urlsearch).split('-');
    history.replaceState({marked: searchdata}, '', location.search);
    
    var popstatetrigger = new Event('popstate');
    window.dispatchEvent(popstatetrigger);
}

