const mongoose = require('mongoose');


mongoose.connect(""); // your mongodb string

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50    
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50    
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    balance: {
        type: Number,
       
        
    }
});

// Indexes
userSchema.index({ username: 1 }, { unique: true });

// Compile models
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);


module.exports = {
    User,
    Account
}