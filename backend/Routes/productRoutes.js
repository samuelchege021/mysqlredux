



import express from 'express'


import {getproducts,getproductbyid} from '../controllers/productcontroller.js'
const router=express.Router();


router.route('/').get(getproducts)



 router.route('/:id').get(getproductbyid)


export default router