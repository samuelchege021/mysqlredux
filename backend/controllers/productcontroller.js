
import Product from "../models/productModel.js";

import asyncHandler from "express-async-handler"






/*      @desc   

getproducts
@route Get   API/products/
Access public
*/


const getproducts=asyncHandler(async(req,res)=>{


    const products = await Product.findAll(); // Sequelize method
    // const products=  await Product.find({});
    res.json(products)




})







const getproductbyid = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id); // Sequelize method to find by primary key
      if (product) {
        res.json({
          id: product.id, // ✅ Ensure 'id' is explicitly included
          name: product.name,
          price: product.price,
          image: product.image,
          countInStock: product.countInStock,
          description: product.description,
          rating: product.rating,           // ✅ Add this
          numReviews: product.numReviews   
        
        
        });
          
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  



  export {getproducts,getproductbyid}

/*      @desc   

getsingleproduct
@route Get   API/prducts/:id
Access public
// */


// const getproductbyid=asyncHandler(async(req,res)=>{

//     try {
        
//         const product=await Product.findById(req.params.id);
//         if(product){
//             res.json(product)
//         }
//         else{
//             res.status(404).json({message:"product not found"})
//         }
//     } catch (error) {
//         res.status(500).json({message:error.message})
//         console.log(error)
//     }
    
    
//     })
    


