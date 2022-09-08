const registerValidator = require("../validator/registerValidator");
const loginValidator = require("../validator/loginValidator");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {serverError, resourceError} = require('../utils/error');

module.exports = {
  register: (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    let validate = registerValidator({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validate.isValid) {
      res.status(400).json(validate.error);
    } else {
      User.findOne({ email })
        .then((user) => {
          if (user) {
            return resourceError(res, "Email Already Exist")
          } else {
            bcrypt.hash(password, 11, (err, hash) => {
              if (err) {
                return serverError(res, err)
              }

              let user = new User({
                name,
                email,
                password: hash,
              });

              user.save()
                .then(user=>{
                    res.status(201).json({
                        message: 'user created successfully',
                        user
                    })
                })
                .catch((err) => serverError(res, err));
            });
          }
        })
        .catch((err) => serverError(res, err));
    }
  },
  login: (req, res) => {
    const {email, password} = req.body;
    let validate = loginValidator({email, password});
    if(validate.isValid){
       User.findOne({email})
        .then(user=>{
           if(!user){
            return resourceError(res, 'User Not Found')
           }else{
            bcrypt.compare(password, user.password,(err, result)=>{
                if(err){
                    return serverError(res, err)
                }
                if(!result){
                    return resourceError(res, 'Password Not Matched!')
                }
                let token = jwt.sign({
                    _id: user._id,
                    email: user.email,
                    name: user.name
                }, process.env.SECRET, {expiresIn: '2h'});

                res.status(200).json({
                    message: 'Login Successfully',
                    token
                })
            })
           }
        })
        .catch((err) => serverError(res, err));
    }else{
        res.status(400).json(validate.error);
    }
  },
};
