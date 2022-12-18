const jwt = require('jsonwebtoken')

//array to store our refreshed tokens
let refreshTokens = []

//a function to generate our token
const generateAccessToken = (user) => {
    console.log(user._id)
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

}


//function to refresh our generated token
const generateRefreshToken = (user) => {
    console.log(user)
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

}




const refreshTheToken = async (req, res) => {
    const refreshToken = req.body.token;

    //check id the refresh token is available and send error message if its not
    if (!refreshTheToken) return res.status(400).json('You are not authenticated')

    //check if the refresh token is in the array
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json('Refresh token  is not correct')
        //
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, user) => {
        error && console.log(error)
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

        //add the regenerated refresh token
        refreshTokens.push(newRefreshToken)

        res.json({
            "access token": newAccessToken,
            "refresh token": newRefreshToken

        })
    })

}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}