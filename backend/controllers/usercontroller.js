



import asyncHandler from  'express-async-handler'



import User from '../models/userModel.js'
import generateToken from '../utilis/generateToken.js';
import { RestartProcess } from 'concurrently';


/*      @desc   

Authuser
@route Post   API/users/login
Access public
*/

const userAuth=asyncHandler(async(req,res)=>{


const {email,password}=req.body;


// find the user
const user = await User.findOne({ where: { email } });   



if (user&& (await user.matchPassword(password))){

res.json({

id:user.id,
name:user.name,
email:user.email,
isAdmin:user.isAdmin,
token:generateToken(user.id),


})


}

else{

// unauthorized
res.status(401)  
throw new Error("invalid name or password")
}

})



/*      @desc   

getuserprofile
@route Get   API/users/profile
Access private
*/

const getuserProfile=asyncHandler(async(req,res)=>{

    const user = await User.findByPk(req.user.id); 

if(user){


res.json({

    id:user.id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    
    


})

}else{

    res.status(404)
    throw new Error('user not found')
}

})



/*      @desc   

updateuser profile
@route PUT   API/users/profile
Access private
*/


const updateuserprofile=asyncHandler(async(req,res)=>{

const user=await User.findByPk(req.user.id);


if (user){



    user.name=req.body.name|| user.name;
    user.email=req.body.email|| user.email;
    if (req.body.password){
       user.password=req.body.password


    }

    const updateduser=await user.save();


res.json({



    id:updateduser.id,
    name:updateduser.name,
    email:updateduser.email,
    isAdmin:updateduser.isAdmin,
    token:generateToken(user.id)




})

}  else{


    res.status(404)
    throw new Error("user not found")
}
})




/*      @desc   

register
@route Get   API/users/profile
Access public
*/

const registeruser=asyncHandler(async(req,res)=>{


const  {name,email,password}=req.body;

const userExists = await User.findOne({ where: { email } });

if (userExists){
    res.status(400)
    throw new Error("user already exists")
}



const user=await User.create({name,email,password})


if(user){

// 201

res.status(201).json({

id:user.id,
name:user.name,
email:user.email,
isAdmin:user.isAdmin,
token:generateToken(user.id)
})

}else{



    res.status(400);
    throw new Error('invalid user data')
}



})




// update userprofile

// Route put /api/users/profile
// acess private













export {userAuth,getuserProfile,registeruser,updateuserprofile}