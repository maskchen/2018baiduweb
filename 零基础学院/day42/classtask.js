;

function Restaurant(obj) {
    this.cash = obj.cash || 0;
    this.seats = obj.seats || 0;
    this.staff = obj.staff || [];
}

Restaurant.prototype.hire = function (person) {
    this.staff.push(person);
};

Restaurant.prototype.fire = function (person) {
    this.staff = this.staff.filter(function (el) {
        return (el !== person)
    });
};

//-----------------我是分割线---------------------------------

var id = 0;

function Clerk(name, salary) {
    this.ID = ++id;
    this.name = name;
    this.salary = salary;
}

Clerk.prototype.dojob = function () {

};


function Waiter(name, salary) {
    Clerk.call(this, name, salary);
}

Waiter.prototype = Object.create(Clerk.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.prototype.serve = function (orderlist) {
    if (Array.isArray(orderlist)) {
        this.list = orderlist;
    } else {
        console('上菜');
        //上菜,待后续需求
    }
};


function Cook(name, salary) {
    Clerk.call(this, name, salary);
}

Cook.prototype = Object.create(Clerk.prototype);
Cook.prototype.constructor = Cook;
Cook.prototype.cooking = function () {

};



//-----------------我是分割线---------------------------------


function Customer(id) {
    this.ID2 = id;
}

Customer.prototype.order = function (dishName) {
    if (!Array.isArray(orderlist)) this.orderlist = [];
        
    this.orderlist.push(dishname);
};

Customer.prototype.eat = function () {
    if (Array.isArray(orderlist) && this.orderlist[1]) {
        this.orderlist.shift();
    } else {
        alert('你没菜，吃空气啊？')
    }
};


//-----------------我是分割线---------------------------------

function Dish(name, cost, price) {
    this.name = name ;
    this.cost = cost || 0;
    this.price = price || 0;
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