Array.prototype.myFind = function(callback) {
    let arr = this;

    for(let i = 0; i < arr.length; i++) {
        if(callback(arr[i], i, arr)) {
            return arr[i]
        }
    }

    return -1;
}