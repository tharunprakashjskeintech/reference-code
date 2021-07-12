const SpErrorHandler = require("../utils/error-handler")
const Response = require("../utils/response")
const { Message } = require('../utils/messages')
// const csc = require('country-state-city')
// import { Country, State, City }  from 'country-state-city';
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;
var zipcodes = require('zipcodes');
const LocationController = {

    /**
     * ANCHOR Get countries
     * @param {*} req 
     * @param {*} res 
     */
    getCountries(req, res) {
        try {
            let countries = Country.getAllCountries()


            countries = countries.map(({ name, flag, isoCode,phonecode }) => {
                return {
                    name,
                    flag,
                    code: isoCode,
                    phonecode:phonecode
                }
            })

            new Response(
                res
            )._SuccessResponse(
                Message.Common.SuccessMessage.Fetch("countries"),
                countries
            )
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },

    /**
    * ANCHOR Get states
    * @param {*} req 
    * @param {*} res 
    */
    getStates(req, res) {
        try {

            let { country_code } = req.query
            let states = State.getStatesOfCountry(
                country_code
            )

            console.log(states);
            states = states.map(({ name, flag, isoCode, countryCode }) => {
                return {
                    name,
                    code: isoCode,
                    country_code: countryCode
                }
            })
            new Response(
                res
            )._SuccessResponse(
                Message.Common.SuccessMessage.Fetch("states"),
                states
            )
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },


    /**
* ANCHOR Get states
* @param {*} req 
* @param {*} res 
*/
    getCities(req, res) {
        try {

            let { state_code, country_code } = req.query
            let cities = City.getCitiesOfState(
                country_code,
                state_code
            )

            console.log(cities);
            /*   cities = states.map(({ name, flag, isoCode, countryCode }) => {
                   return {
                       name,
                       code: isoCode,
                       country_code: countryCode
                   }
               })*/
            new Response(
                res
            )._SuccessResponse(
                Message.Common.SuccessMessage.Fetch("cities"),
                cities
            )
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
    getZipcode(req, res) {
        try {

            let { state_code, city_code } = req.query
          
            let l = zipcodes.lookupByName(city_code, state_code);
            console.log(l);
            /*   cities = states.map(({ name, flag, isoCode, countryCode }) => {
                   return {
                       name,
                       code: isoCode,
                       country_code: countryCode
                   }
               })*/
            new Response(
                res
            )._SuccessResponse(
                Message.Common.SuccessMessage.Fetch("Zip code"),
                l
            )
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
}
module.exports = LocationController