function checkbox(type, event) {
    var boxes = document.querySelectorAll(type);
    var boxes2 = document.querySelectorAll(type + ':not([value="all"]):checked');

    if (event.target.value === 'all' && event.target.checked) {
        boxes.forEach(function (el) {
            el.checked = true;
        });
    } else {
        if (boxes2.length === (boxes.length - 1)) {
            event.currentTarget.querySelector('[value="all"]').checked = true;
        } else {
            event.currentTarget.querySelector('[value="all"]').checked = false;
            if (document.querySelectorAll('[type ="checkbox"]:checked').length === 0) {
                event.target.checked = true;
            } 
        }
    }
}

//看了别人的例子，我发觉自己好像理解错了题目的要求，把每行不允许没选择理解成全部行不允许没选择,至少要一个；
//还有后面的数据筛选给自己加戏了，每行没选择就默认为全部选择，认为这样更加符合常理  Q-Q