//enable us to avoid try catch in functions returning promises
const asyncHandler = fn =>(req, res, next) =>  {
    Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler