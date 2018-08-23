;

function Dish(name, cost, price) {
    this.name = name;
    this.cost = Number(cost) || 0;
    this.price = Number(price) || 0;
}


var dishMenu = [];
dishMenu.push(new Dish('炒饭', 5, 15));
dishMenu.push(new Dish('肠粉', 2, 8));
dishMenu.push(new Dish('炒菜心', 4, 12));
dishMenu.push(new Dish('蒸饺', 3, 10));
dishMenu.push(new Dish('馄饨', 3, 11));
dishMenu.push(new Dish('叉烧包', 3, 11));


//--------------------我是分割线--------------------------------

var cid = 0;
var currentCustomer;
var customerList = [];

function Customer(name) {
    this.CustID = ++cid;
    this.name = name;
}

Customer.prototype.order = function () {
    return dishMenu[Math.floor(Math.random() * dishMenu.length)];
};

Customer.prototype.eat = function (dish, waiter) {
    setTimeout(function (){
        console.log('吃完:' + dish.name);
        if (!customerList.length) return;
        currentCustomer = customerList.shift();
        
        waiter.getOrder(currentCustomer);
    }, 1000);
    
    
};



customerList.push(new Customer('Peter'));
customerList.push(new Customer('Ken'));
customerList.push(new Customer('Sue'));



//--------------------我是分割线--------------------------------

function Restaurant(obj) {
    this.name = obj.name || 'noname';
    this.cash = obj.cash || 0;
    this.seats = obj.seats || 0;
    this.staff = obj.staff || [];
}

Restaurant.prototype.hire = function (person) {
    var staff = this.staff;
    for (var i = 0; i <staff.length; i++) {
        if (staff[i].ID === person.ID) return;
    }

    staff.push(person);
    person.shop = this.name;
};

Restaurant.prototype.fire = function (person) {

    this.staff = this.staff.filter(function (el) {
        if (el.ID === person.ID) peron.shop = '';
        return (el.ID !== person.ID);
    }); 
};


//--------------------我是分割线--------------------------------

var clerkid = 0;

function Clerk(obj) {
    this.ID = ++clerkid;
    this.shop = '';
    this.name = obj.name;
    this.salary = obj.salary;
}

function Waiter(obj) {
    Clerk.call(this, obj);
}

Waiter.prototype = Object.create(Clerk.prototype);
Waiter.prototype.constructor = Waiter;

Waiter.prototype.getOrder = function (customer) {
    if (!this.shop) return; 
    var dish = customer.order();
    console.log('新客人坐下:' + customer.name);
    console.log('记下客人点的菜:' + dish.name);
    cook_1.cooking(this, dish);
};

Waiter.prototype.deliver = function (dish) {
    if (!this.shop) return; 
    console.log(dish.name + '-送到客人桌上');
    currentCustomer.eat(dish, this);
};


function Cook(obj) {
    Clerk.call(this, obj);
}

Cook.prototype = Object.create(Clerk.prototype);
Cook.prototype.constructor = Cook; 

Cook.prototype.cooking = function (waiter, dish) {
    if (!this.shop) return; 
    console.log('拿到要煮的菜:' + dish.name);
    setTimeout(function (){
        console.log('煮完，叫服务员送菜');
        waiter.deliver(dish);
    }, 1000);
};


//--------------------我是分割线--------------------------------

function getSingle(fn, args) {
    var result;
    return function () {
        if (!result) {
            result =new fn(args);
        }

        return result;
    }
}

var createSinglRes = getSingle(Restaurant, {
    name: '一人食店',
    cash: 10000,
    seats: 1,
    staff: []
});

var createSingleWaiter = getSingle(Waiter, {
    name: 'Ben',
    salary: 3000
});

var createSingleCook = getSingle(Cook, {
    name: '强哥',
    salary: 5000
});


var singleRes = createSinglRes();
var waiter_1 = createSingleWaiter();
var cook_1 = createSingleCook();

var waiter_2 = createSingleWaiter();
var cook_2 = createSingleCook();

console.log(waiter_1 === waiter_2);
console.log(cook_1 === cook_2)



//--------------------我是分割线--------------------------------
singleRes.hire(waiter_1);
singleRes.hire(cook_1);

currentCustomer = customerList.shift();
waiter_1.getOrder(currentCustomer);