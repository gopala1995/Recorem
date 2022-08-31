const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
},{
    timestamps:true,
    versionKey:false
})

module.exports = mongoose.model("userData", userSchema)