import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'


// @desc Auth user & get token
// @royute POST api/users/login
// @access Public
export const authUser = asyncHandler(async(req,res) => {
     const {email, password} = req.body
    
     const user = await User.findOne({ email })
     
     if(user && (await mathcPassword(password,user.password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
     }else{
        res.status(401)
        throw new Error("Invalid email or passwword")
     }
}) 

// @desc Register a new User
// @royute POST api/users
// @access Public
export const registerUser = asyncHandler(async(req,res) => {
     const { name, email, password} = req.body;
    
     const userExists = await User.findOne({ email })
     if(userExists){
         res.status(400)
         throw new Error('User already exists')
     }
     
     const user = await User.create({
         name,
         email,
         password,
     })

     if (user) {
        res.status(201).json({
             _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
     } else {
        res.status(400)
        throw new Error('Invalid user data')
     }
}) 

// @desc Get user profile
// @royute GET api/users/profile
// @access Private

export const getUserProfile = asyncHandler(async(req,res) => {
     const user  =  await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error("User not found")
    }
}) 


// @desc Get user profile
// @royute GET api/users/profile
// @access Private

export const updateUserProfile = asyncHandler(async(req,res) => {
     const user  =  await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            })
    }else{
        res.status(404)
        throw new Error("User not found")
    }
}) 


// @desc Get all users
// @royute GET api/users/
// @access Private/Admin

export const getUsers = asyncHandler(async(req,res) => {
     const users  =  await User.find({})
     res.json(users)
    
}) 

// @desc Delete user
// @royute DELETE api/users/:id
// @access Private/Admin

export const deleteUser = asyncHandler(async(req,res) => {
     const user  =  await User.findById(req.params.id)
     if(user) {
        await user.remove()
        res.json({message: 'User removed'})
     }else{
         res.status(404)
         throw new Error ('User not found')
     }
     res.json(users)
    
}) 

// @desc Get user by id
// @royute GET api/users/:id
// @access Private/Admin

export const getUserById = asyncHandler(async(req,res) => {
     const user  =  await User.findById(req.params.id).select('-password')
     if(user){
          res.json(user)
     }else{
         res.status(404)
         throw new Error ('User not found')
     }
   
    
}) 

// @desc Update user 
// @royute PUT /api/users/:id
// @access Private/Admin

export const updateUser = asyncHandler(async(req,res) => {
     const user  =  await User.findById(req.params.id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            })
    }else{
        res.status(404)
        throw new Error("User not found")
    }
}) 


async function mathcPassword(enteredPassword='',originalPassword){
    
    return await bcrypt.compare(enteredPassword,originalPassword)
}
