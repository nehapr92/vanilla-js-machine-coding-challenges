

function curry(args1) {
    return function (args2) {
        if(!args2) {
            return args1
        }else{
            return curry(args1 + args2)
        }
    }
}

const result = curry(1)(2)(3)(4)()
console.log(result)



function currying(fn) {
    return function curried(...args) {
        if (args.length >= fn.length){
        //checking if argument length is matching
            return fn.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}




function multiply(a, b, c, d) {
    return a * b * c * d;
}

const curriedMultiply = currying(multiply);

console.log(curriedMultiply(1)(2)(3)(4));    
console.log(curriedMultiply(1, 2)(3, 4));    
console.log(curriedMultiply(1)(2, 3)(4));    