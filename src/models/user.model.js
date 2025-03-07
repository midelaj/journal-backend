const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password:{
    type: String, 
    require: true,
  }
});


//Hash password before saving
userSchema.pre("save", async function (next){
    console.log("Password before hashing:", this.password); 
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

//Compare password method
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;