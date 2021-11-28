import jwt from 'jsonwebtoken'

const secret='secret';

const auth = async(req,res,next) => {
    try{
        const token = req?.headers?.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, secret);
        req.userId = decodedData?.id;
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
    next();
}

export default auth;