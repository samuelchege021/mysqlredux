


import { DataTypes } from 'sequelize';
import{ sequelize }from '../config/db.js';

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
  price: { type: DataTypes.FLOAT, defaultValue: 0 },
  countInStock: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  timestamps: true,
});

export default Product;










// import mongoose from "mongoose";



// const reviewSchema=mongoose.Schema({

//     name:{
//     type:String,
//     required:true
    
    
//     },
    
//     rating:{
    
//         type:Number,
//         required:true
    
//     },
    
    
//     comment:{
    
//         type:String,
//         required:true
//     }
//     ,
//     user:{
    
//         type:mongoose.Schema.Types.ObjectId,
        
//         ref:"User",
//         required:true,
//         },
    
//     },{timestamp:true})

// const productSchema=mongoose.Schema({


// user:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'User',
//     required:true,
// },



// name:{

//     type:"String",
//     required:true,
// },

// image:{
// type:String,
// required:true,


// },


// brand:{
//     type:String,
//     required:true,
// },    


// category:{
//     type:String,
//     required:true,
// },    


// description:{
//     type:String,
//     required:true,
    
// },


// rating:{
//     type:Number,
//     required:true,
//     default:0
// },

// numReviews:{
// type:Number,
// required:true,
// default:0

// },

// price:{

//     type:Number,
//     required:true,
//     default:0
// },

// countInStock:{

//     type:Number,
//     required:true,
//     default:0
// },

// reviews:[reviewSchema],

// },{ timestamps: true })




// const Product=mongoose.model("Product",productSchema)



// export default Product