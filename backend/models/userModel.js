









import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db.js'; // your sequelize connection instance
import { Order } from './orderModel.js';
class User extends Model {
  async matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true,
  hooks: {
    beforeCreate: async (user, options) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user, options) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});
// User.hasMany(Order, { foreignKey: 'userId' });
export default User;























// import mongoose from "mongoose";
// import bcrypt from 'bcryptjs';

// // ✅ Defining the User Schema Correctly
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   isAdmin: {
//     type: Boolean,
//     required: true,
//     default: false,
//   }
// }, { timestamps: true });

// //  Adding a Password Matching Method
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// //  Creating the User Model Correctly


// userSchema.pre('save',async function(){



//   if(!this.isModified('password')){
//     next();
//   }

// const salt =await bcrypt.genSalt(10)
// this.password=await bcrypt.hash(this.password,salt)

// })
// const User = mongoose.model("User", userSchema);

// //  Exporting the User Model Correctly
// export default User;
