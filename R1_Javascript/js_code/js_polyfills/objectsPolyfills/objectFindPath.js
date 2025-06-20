var obj = {
    a: {
        b: {
            c: 12
        }
    }
};


Object.prototype.findPath = function(path) {
    const accessors = path.split('.');
    const obj = this;
    
    let current = obj;
    
    for(let key of accessors) {
        if(current.hasOwnProperty(key)) {
            current = current[key];
        } else {
            return;
        }
    }
    return current;
}



console.log(obj.findPath('a.b.c')); // 12
console.log(obj.findPath('a.b')); // {c: 12}
console.log(obj.findPath('a.b.d')); // undefined
console.log(obj.findPath('a.c')); // undefined
console.log(obj.findPath('a.b.c.d')); // undefined
console.log(obj.findPath('a.b.c.d.e')); // undefined