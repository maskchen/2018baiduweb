var tree = {
    "id": 0,

    "name": "root",

    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },

    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }        
        }
    }
}



// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(name) {
    var temp;
    var flag = true;
    function cycleId(obj){
        for (var i in obj){
            if (flag){
                if (obj[i] === name){ 
                    temp = obj['id'];
                    flag = false;
                    break;
                } else if (obj[i].toString() === '[object Object]'){
                    cycleId(obj[i]);
                }
            } else { break; }
        }
    }

    cycleId(tree);
    return temp;

}


// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(id) {
    var temp;
    var flag = true;
    function fname(obj){
        if (obj !== undefined && flag){
            if (obj['id'] === id){
                temp = obj.name;
                flag = false;
                return;
            } else {
                fname(obj.left);
                fname(obj.right);
            }
        }
    }

    fname(tree);
    return temp;
    
}


// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR() {
    function frontc(obj){
        if (obj !== undefined){
            console.log(obj.name);
            frontc(obj.left);
            frontc(obj.right);
        }
    }

    frontc(tree);
}


// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR() {
    function mc(obj){
        if (obj !== undefined){
            mc(obj.left);
            console.log(obj.name);
            mc(obj.right);
        }
    }
    mc(tree);
}

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD() {
    function bc(obj){
        if (obj !== undefined){
            bc(obj.left);
            bc(obj.right);
            console.log(obj.name);
        }
    }
    bc(tree);
}
