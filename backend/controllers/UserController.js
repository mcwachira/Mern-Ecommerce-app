import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc Register a new user
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async  (req, res) => {

    const {name, email, password}= req.body
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('user with that email exist')
    }

    const user =  await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400)
        throw new Error('error creating user')
    }

})


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


//@desc Register a new user
//route POST /api/users/logout
//@access Public
const logOutUser = asyncHandler(async  (req, res) => {
    res.cookie('jwt', "", {
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({
        message:
            'logged out successfully'
    })
})


//@desc get user profile
//route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async  (req, res) => {

    //better to get user via id or middleware
    // const id = req.params.id

    // const user = User.findById(id)

    // if(user){
    //     res.status(401)
    //     throw new Error('user with id does not exist')
    //         }


    const user  = await User.findById(req.user._id)

    if(user) {
        res.status(200).json({


            _id: req.user._id,
            name: req.user.name,
            email: req.user.email
        })
    }else {
           res.status(404)
            throw new Error('user not found')
    }

})


//@desc get user profile
//route  GET /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async  (req, res) => {


    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email


        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            }
        )
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})


//@desc Fetch All Users
//@route Get /api/users
//@access Private Admin
const getUsers =  asyncHandler(async(req, res) => {

    const users = await User.find({})

    res.status(200).json(users)
});

//@desc Fetch A User
//@route Get /api/users/:id
//@access Private Admin
const getUserById =  asyncHandler(async(req, res) => {
    const user =await  User.findById(req.params.id )


    if(user){
        return  res.status(200).json(user)
    }else{
        res.status(404);
        throw new Error('User not found ')
    }
});


//@desc Delete User
//@route put /api/users/:id
//@access Private Admin
const updateUser =  asyncHandler(async(req, res) => {
    const user =await  User.findById(req.params.id )

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmmin = Boolean(req.body.isAdmnin)

        const updatedUser = await user.save()
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }

});


//@desc Delete User
//@route Delete /api/users/:id
//@access Private Admin
const deleteUser =  asyncHandler(async(req, res) => {
    const user =await  User.findById(req.params.id )

    if(user){

        if(user.isAdmin){
            res.status(400);
            throw new Error('Cannot delete admin  User ')
        }
 await user.deleteOne({_id:user._id})
 res.status(200).json({message:'user deleted successfully'})
    }else{
        res.status(404);
        throw new Error('User not found ')
    }

});
export {authUser, registerUser, logOutUser, getUserProfile, updateUserProfile,    getUsers,
    getUserById ,updateUser, deleteUser}
