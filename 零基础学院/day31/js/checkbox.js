function checkbox(type, event) {
    var boxes = document.querySelectorAll(type);
    var boxes2 = document.querySelectorAll(type + ':not([value="all"]):checked');

    if (event.target.value === 'all' && event.target.checked) {
        boxes.forEach(function (el) {
            el.checked = true;
        });
    } else {
        if (boxes2.length === (boxes.length - 1)) {
            event.target.closest('div').querySelector('[value="all"]').checked = true;
        } else {
            event.target.closest('div').querySelector('[value="all"]').checked = false;
            if (document.querySelectorAll('[type = "checkbox"]:checked').length === 0) {
                event.target.checked = true;
            } 
        }
    }
}