const express = require('express');
const router = express.Router();
const {User, Account} = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const { authMiddleWare }  = require("../middleware");




router.get("/signin", (req, res) => {
    
    res.redirect("/signin");
});

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req,res)=>{

    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
         return res.status(411).json({
            message: " Incorrect inputs"
         })
    }

    const user = await User.findOne({
        username:body.username
    })

    if(user){
        return res.json({
            message: "Email already taken "
        })
    }

    const dbUser = await User.create(body);

    await Account.create({
        userId: dbUser._id,
        balance: 1+Math.random()*10000
    })

    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
});

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req,res)=>{

    const body = req.body;
    const {success} = signInSchema.safeParse(body);

    if(!success){
        res.status(411).json({
            message: "incorrect inputs"
        });
    }

    const user = await User.findOne({
        username:body.username,
        password: body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        message:" Error while logging in"
    })


})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/",authMiddleWare, async (req, res) => {
    const {success}  = updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({
        _id: req.userId
    }, req.body);

    res.json({
        message: "Updated Successfully"
    })
})


router.get("/bulk", authMiddleWare, async (req,res)=>{
    const parameter = req.query.filter || "";
      
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":parameter
            }
        }, {
            lastName:{
                "$regex": parameter
            }
        },{
            username:{
                "$regex": parameter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
        }))
       
    })

}   
);

module.exports = router;