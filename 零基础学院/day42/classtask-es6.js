;

class Restaurant {
    constructor(obj) {
        this.cash = obj.cash || 0;
        this.seats = obj.seats || 0;
        this.staff = obj.staff || [];
    }

    hire(person) {
        this.staff.push(person);
    }

    fire(person) {
        this.staff = this.staff.filter(function (el) {
            return (el !== person)
        });
    }
}

//-----------------我是分割线---------------------------------


var id = 0;

class Clerk {
    constructor(name, salary) {
        this.ID = ++id;
        this.name = name;
        this.salary = salary;
    }

    dojob() {

    }
}


class Waiter extends Clerk {
    constructor(name, salary) {
        super(name, salary);
    }

    serve(orderlist) {
        if (Array.isArray(orderlist)) {
            this.list = orderlist;
        } else {
            console('上菜');
            //上菜,待后续需求
        }
    }
}



class Cook extends Clerk {
    constructor(name, salary) {
        super(name, salary);
    }

    cooking() {
        console('煮菜');
    }
}


//-----------------我是分割线---------------------------------

class Customer {
    constructor(ids) {
        this.ID2 = ids;
    }

    order(dishname) {
        if (!Array.isArray(orderlist)) this.orderlist = [];
        
        this.orderlist.push(dishname);
    }

    eat() {
        if (Array.isArray(orderlist) && this.orderlist[1]) {
            this.orderlist.shift();
        } else {
            alert('你没菜，吃空气啊？')
        }
    }
}


//-----------------我是分割线---------------------------------

class Dish {
    constructor(name, cost, price) {
        this.name = name;
        this.cost = cost || 0;
        this.price = price || 0;
    }
}

//-----------------我是分割线---------------------------------

var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);