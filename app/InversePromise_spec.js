const InversePromise = require('./InversePromise')

describe("InversePromise", function() {  

  it("Should invoque the callback through method once it's resolved",()=>{
    
    let ip = new InversePromise((resolved,...args)=>{
      return args.reduce((a,c)=>a+c) + resolved
    })

    ip.apply(1,1,1,1).then(resp=>expect(resp).toEqual(9))

    ip.resolve(5).then(resp=>expect(resp).toEqual(5))

    ip.apply(2,2,2).then(resp=>expect(resp).toEqual(11))
    
  })

  it("Should chain methods",()=>{
    
    let cb = (resolved,...args)=>{
      return args.reduce((a,c)=>a+c) + resolved
    }

    new InversePromise()
      .set(cb)
      .resolve(5)
      .apply(1,2).then(resp=>expect(resp).toEqual(8))

    new InversePromise()
      .resolve(5)
      .set(cb)
      .apply(1,2).then(resp=>expect(resp).toEqual(8))
  })
  
  it("Should set the callback anytime",()=>{
    let cb = (resolved,...args)=>{
        return args.reduce((a,c)=>a+c) + resolved
      }

    let ip2 = new InversePromise()

    ip2.apply(3).then(resp=>expect(resp).toEqual(8))

    ip2.resolve(5)

    ip2.apply(4,5).then(resp=>expect(resp).toEqual(14))

    ip2.set(cb)
  })

})
