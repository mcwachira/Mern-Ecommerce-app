const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const verifyToken = asyncHandler(async (req, res, next) => {
    let token;

    //check if the token exist and if it starts with the bearer keyword

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //gets the token from our header
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(token);
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("user not Authorized bad token ");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("no token found");
    }
});


const verifyAdmin = asyncHandler(async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    if (token === null) {
        res.status(401).json({ message: "no token passed in the header" })
    }



    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id)
    const user = await User.findById(decoded.id).select("-password");
    console.log(user)
    if (user.isAdmin === true) {
        next()
    } else {
        res.status(403).json({ err: "Admin resource. Access denied." })
    }

}


)

// const verifyAdmin = asyncHandler(async (req, res, next) => {

//     verifyToken((req, res, () => {

//         if (req.user.id === req.params.id || req.user.isAdmin) {
//             next()
//         } else {
//             res.status(403).json({
//                 err: "Admin resource. Access denied.",
//             });
//         }
//     })
//     )


// })

module.exports = { verifyToken, verifyAdmin };
