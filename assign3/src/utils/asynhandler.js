// const asynHandler = (func) => async ()=> {}
const asyncHandler = (requestHandler)=> {
    return (req,res,next)=> {
        Promise.resolve(requestHandler(req,res,next)).
        catch(next) // if any error occurs in the request handler it will be caught and passed to the next middleware which is the error handling middleware
    }
}

export default asyncHandler