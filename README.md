# InversePromise

Promise that sets the callback first, and invoques it later

## Install

    npm install inverse-promise --save

## Usage

```
const InversePromise = require('inverse-promise')

let ip = new InversePromise((resolved,...args)=>{
  return args.reduce((a,c)=>a+c) + resolved
})

ip.apply(1,1,1,1).then(resp=>console.log(resp)) // Will print 9

ip.resolve(5).then(resp=>console.log(resp)) // Will print 5

ip.apply(2,2,2).then(resp=>console.log(resp)) // Will print 11


// Set the callback anytime:

let cb = (resolved,...args)=>{
    return args.reduce((a,c)=>a+c) + resolved
  }

let ip2 = new InversePromise()

ip2.apply(3).then(resp=>console.log(resp)) // Will print 8

ip2.apply(4,5).then(resp=>console.log(resp)) // Will print 14

ip2.resolve(5)

ip2.set(cb)


// You can also chain

new InversePromise()
  .set(cb)
  .resolve(5)
  .apply(1,2).then(resp=>console.log(resp)) // Will print 8

new InversePromise()
  .resolve(5)
  .set(cb)
  .apply(7,7).then(resp=>console.log(resp)) // Will print 19

```

## Constructor

#### new InversePromise( /\* optional \*/ function(resolved, ...args){ ... } )

Pass the function to be called once the promise is resolved (check resolve() method below).
This function will be called by method apply(). First will recieve the resolved value, then all the parameters sent from apply()

## Methods

### InversePromise.prototype.set( function(resolved, ...args){ ... } )

Will set the function to call, only if hasn't been set in the constructor

### InversePromise.prototype.apply( ...args )

Calls the function.

## Inherited from [OutPromise](https://github.com/jose-nunez/out-promise)

### .resolve(value)

Returns this object that is resolved with the given value

### .reject(reason)

Returns this object that is rejected with the given reason.

### .catch(onRejected)

Same behaviour as Promise.prototype.catch(onRejected)

### .then(onFulfilled, onRejected)

Same behaviour as Promise.prototype.then(onFulfilled, onRejected)

### .prototype.finally(onFinally)

Same behaviour as Promise.prototype.finally(onFinally)
