const Joi = require("joi");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const { customAlphabet: generate } = require("nanoid");

const { generateJwt } = require("./utils/generateJwt");
const { sendEmail } = require("./utils/mailer"); 
const User = require("./user.model");

// generate a referral code 
const CHARACTER_SET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const REFERRAL_CODE_LENGTH = 8;

const referralCode = generate(CHARACTER_SET, REFERRAL_CODE_LENGTH);
// validate schema 
const userSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  referrer: Joi.string(),
});

// create Singup

exports.Signup = async(req , res)=>{
    try{
        const result = userSchema.validate(req.body);
        if(result.error){
            console.log(result.error.message);
            return  res.json({
                error: true,
                status: 400,
                message: result.error.message,
            });

        }
        // Check if the email has been already registered .
        var user = await User.findOne({
            email: result.value.email,
        })
        if(user){
            return res.json({
                error: true,
                message: "Email is already in use ",
            })
        }
        const hash = await User.hashPassword(result.value.password);
        
        const id = uuid();
        result.value.userId = id;

        delete result.value.confirmPassword;
        result.value.password = hash;
    }
}