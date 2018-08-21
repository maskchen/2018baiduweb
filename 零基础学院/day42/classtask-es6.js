;

class Restaurant {
    constructor(obj) {
        this.cash = obj.cash;
        this.seats = obj.seats;
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
        if (orderlist[1]) {
            this.list = orderlist;
        } else {
            this.list.shift();
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
        if (!this.orderlist) this.orderlist = [];
        
        this.orderlist.push(dishname);
    }

    eat() {
        if (this.list && this.list[1]) {
            this.list.shift();
        } else {
            alert('你没菜，吃空气啊？')
        }
    }
}


//-----------------我是分割线---------------------------------

class Dish {
    constructor(name, cost, price) {
        this.name = name;
        this.cost = cost;
        this.price = price;
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