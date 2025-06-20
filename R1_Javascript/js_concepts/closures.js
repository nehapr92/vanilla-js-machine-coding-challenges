function inexpensive() {
    const bigArray = new Array(7000).fill('0');

    return function (idx){
        return bigArray[idx];
    }
}



const fun = inexpensive();
console.log(fun(740));

