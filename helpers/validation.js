// server-side validation
const { check } = require("express-validator")

const validation = {

    signupValidation: function(){

        let validation = [

            check("username", "Username must be at least 3 characters long")
            .isLength({min: 3, max: undefined}),

            check("password", "Password must be at least 8 characters long")
            .isLength({min: 8, max: undefined}),

        ]

        return validation
    }

}

module.exports = validation