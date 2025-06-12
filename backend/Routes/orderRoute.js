






import express from 'express'



import { addOrderItems,getorderbyid } from '../controllers/ordercontroller.js'
import { protect } from '../middleware/Authmiddleware.js'




const router=express.Router()


router.route('/').post(protect,addOrderItems)

router.route('/:id').get(protect,getorderbyid)

export default router