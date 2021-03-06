function Go() {
    console.log("Go");
}

function GoSteps(n = 1) {
    if ( n > 0 ) {
        n = Math.floor(n);
    } else {
        n = 0;
    }

    while (n--){
        Go()
    }
}

/*version 1.0
function GoSteps(n) {
    var x = arguments.length ? n : 1;
    if (x >= 1) {
        x = ~~x;
    } else {
        x = 0;
    }

    while (x--){
        Go()
    }
}
*/

GoSteps(10); // Go 10次
GoSteps(1); // Go 1次
GoSteps(); // Go 1次，认为缺少参数时，默认参数为1
GoSteps(0);  // 0次
GoSteps(-1);  // 0次
GoSteps(1.4);  // Go 1次
GoSteps(1.6);  // Go 1次
GoSteps(-1);  // 0次
GoSteps(true);  // Go 1次
GoSteps(false);  // 0次
GoSteps("Test");  // 0次
GoSteps(NaN);  // 0次
GoSteps(null);  // 0次

