
const { validationResult, check, body, query, buildCheckFunction } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { Message } = require("./messages");
const Response = require("./response");
const logger = require("./winston");

const Validator = {

    // customValidator: async validations => {
    //     let keys = Object.keys(validations)

    //     console.log(validations)
    //     keys.forEach(item => {
    //         console.log(validations[item])
    //         if (!validations[item]) {
    //             throw new Error(`Vending machine: ${item} is required`)
    //         }
    //     });

    //     return true
    // },
    // validate function

    /* compose: validations => {
         return async (req, res, next) => {
             try {
                 await Promise.all(validations.map(validation => {
                     validation(req, res, next)
                 }))
                 return next()
 
             }
             catch (err) {
 
 
                 console.log(err)
                 // if error returns response "Manditory params missing"
                 res.status(422).send(Response._ErrorMessage(Message.Common.FailureMessage.SomethingWnWrng))
             }
         }
     },*/

    compose: validations => {
        // returns promise that resolves or reject
        return async (req, res, next) => {
            // getting all validations


            await Promise.all(validations.map(validation => validation.run(req)));

            // returns validation result
            const errors = validationResult(req);

            // checking error is exists or not
            if (errors.isEmpty()) {
                return next();
            } else {
                new Response(res, StatusCodes.UNPROCESSABLE_ENTITY)._ErrorMessage("Manditory element missing", errors.array())
            }
        };
    },
    validate: validations => {

        // returns promise that resolves or reject
        return async (req, res, next) => {

            // getting all validations
            await Promise.all(validations.map(validation => validation.run(req)));

            // returns validation result
            const errors = validationResult(req);

            // checking error is exists or not
            if (errors.isEmpty()) {
                return next();
            } else {
                new Response(res, StatusCodes.UNPROCESSABLE_ENTITY)._ErrorMessage("Manditory element missing", errors.array())

            }
        };
    },

    validateFormData: () => {

        // returns promise that resolves or reject
        return async (req, res, next) => {

            req.asyncValidationErrors().then(function () {
                next();
            }).catch(function (errors) {
                req.flash('errors', errors);
                new Response(res, StatusCodes.UNPROCESSABLE_ENTITY)._ErrorMessage("Manditory element missing", errors.array())
            });
        };
    },



    // User creation validation
    UserCreation: [
        check('email_id').isEmail(),
        check('role_id').exists().withMessage(Message.Validation.FailureMessage.Requied("Role")),

        check('contact_no').exists().withMessage(Message.Validation.FailureMessage.Requied("Contact mo")),
        check('name').exists(),
        check('password').isLength({ min: 6, max: 20 }).withMessage(Message.Validation.FailureMessage.Password).matches(/\d/)
            .withMessage(Message.Validation.FailureMessage.Contain("number")),
    ],

    UserFetch: [
        query('role_id').exists(),
    ],

    MapGymToUser: [
        check('vending_machine_id').exists(),
        check('default_id').optional(),
    ],

    // vending machine creation validation
    VendingMachineCreation: [
        check('machine_type').exists().withMessage(Message.Validation.FailureMessage.Requied("Machine type")),
        check('dimensions').exists().withMessage(Message.Validation.FailureMessage.Requied("Dimensions")),
        check('electric').isInt().withMessage(Message.Validation.FailureMessage.DataTypeError("Electric", "Integer")),
        check('dedicated_circuit').isInt().withMessage(Message.Validation.FailureMessage.DataTypeError("Dedicated circuit", "Integer")),
        check('water_supply').isInt().withMessage(Message.Validation.FailureMessage.DataTypeError("Water supply", "Integer")),
        check('recycle').isInt().withMessage(Message.Validation.FailureMessage.DataTypeError("Recycle", "Integer")),
    ],
    // vending machine creation validation
    WorkCreation: [
        body('category_id').exists().withMessage(Message.Validation.FailureMessage.Requied("Category")),
        body('gym_id').exists().withMessage(Message.Validation.FailureMessage.Requied("Gym id"))
    ],
}


module.exports = Validator