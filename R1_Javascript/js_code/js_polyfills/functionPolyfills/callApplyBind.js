
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis; // fallback for null/undefined

  const fnSymbol = Symbol(); // unique property
  context[fnSymbol] = this;  // attach function to context

  const result = context[fnSymbol](...args); // invoke with spread args

  delete context[fnSymbol]; // clean up
  return result;
};



  //Polyfill for Apply
  Function.prototype.myApply = function (context, args) {
    context = context || globalThis;
  
    const fnSymbol = Symbol();
    context[fnSymbol] = this;
  
    const result = Array.isArray(args) ? context[fnSymbol](...args) : context[fnSymbol]();
  
    delete context[fnSymbol];
    return result;
  };
  
  
  //Polyfill for Bind
  Function.prototype.myBind = function (context, ...bindArgs) {
    const fn = this;
  
    return function (...callArgs) {
      return fn.apply(context, [...bindArgs, ...callArgs]);
    };
  };
  





  let obj = {
    firstname :"Neha",
    lastname:"Priya",
    printFullName:function(){
      console.log(this.firstname +" " +this.lastname);
    } 
  }

  let obj2 = {
    firstname:"Sachin",
    lastname:"Tendulkar",
  }

 obj.printFullName.call(obj2);
