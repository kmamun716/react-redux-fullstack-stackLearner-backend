const validator = require('validator');

const loginValidator = (user) =>{
    let error = {};

    if(!user.email){
        error.email = 'Please Provide Your Valid Email';
    }else if(!validator.isEmail(user.email)){
        error.email = "Please Provide a Valid Email"
    };

    if(!user.password){
        error.password = 'Please Provide a Password'
    }else if(user.password.length < 6){
        error.password = 'Password Must be greater then 6 character'
    };

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = loginValidator;