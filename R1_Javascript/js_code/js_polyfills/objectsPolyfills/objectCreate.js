/**
 * @param {any} proto
 * @return {object}
 */
function myObjectCreate(proto) {
    if(typeof proto !== 'object'  || proto === null) {
      throw new Error('');
    }
    let obj = {};
    obj.__proto__ = proto;
    return obj
  }