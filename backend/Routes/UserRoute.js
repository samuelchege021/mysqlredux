



import express from 'express'



import { userAuth,getuserProfile, registeruser, updateuserprofile } from '../controllers/usercontroller.js'

import { protect } from '../middleware/Authmiddleware.js';


const router=express.Router();



router.route('/').post(registeruser)
router.post('/login',userAuth)

router.route('/profile').get(protect,getuserProfile).put(protect,updateuserprofile)


export default router