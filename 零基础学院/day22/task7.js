var scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    }, 
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    }, 
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}

function ota(obj){
    var arr = [];
        for (var i in obj){
            var temp = [];
            if (obj.hasOwnProperty(i)){
                temp.push(obj[i]);

                for (var j in obj[i]){
                    temp.push(obj[i][j]);
                }

                arr.push(temp);
            }
            
        }

        return arr;
}

console.log(ota(scoreObject));

//-----------------------task7-part2-------------------------------------------

var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];

var flag;
var tempo;

function ato(arr){
    var menuObject = {};
    arr.forEach(function (el){
        var temp = {};
        var temp2;
        flag = true;
        temp[el[0]] = {};
        temp[el[0]].name = el[1];

        if (el[2] === -1){
            menuObject[el[0]] = temp[el[0]];
            menuObject[el[0]].subMenu = {};
        } else {
            fpo(el[2], menuObject);
            temp2 = tempo;
            if (temp2.subMenu === undefined){
                temp2.subMenu = {};
            }
            temp2.subMenu[el[0]] = temp[el[0]];
        }
    });

    return menuObject;
}


function fpo(num,obj){
    for (var i in obj){
        if (flag){
            if (i === (num + '')){
                flag = false;
                tempo = obj[i];                
                return;
            } else if (obj[i].subMenu !== undefined){
                fpo(num, obj[i].subMenu);
            }
        }
    }        
}

console.log(ato(menuArr));

