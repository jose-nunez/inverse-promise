
const OutPromise  = require('out-promise')

let callback = new WeakMap()

module.exports = class InversePromise extends OutPromise{
  constructor(fn){
    super()
    callback.set(this,new OutPromise())
    if(fn) this.set(fn)
  }
  
  set(fn){
    if(!(fn instanceof Function)) throw new Error('InversePromise: Argument is not a function') 
    callback.get(this).resolve(fn)
    return this
  }

  apply(...args){
    return this.then(resolved=>callback.get(this).then(fn=>fn.apply(null,[resolved,...args])))
  }

}