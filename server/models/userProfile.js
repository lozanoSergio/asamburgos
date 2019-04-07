const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const setStringType = (maxLength) => ({ type: String, required: true, maxlength: maxLength })
const setStringTypeNotRequired = (maxLength) => ({ type: String, maxlength: maxLength })

const userProfileSchema = new Schema({
    type: setStringType(32),
    firstName: setStringType(128),
    surName1: setStringTypeNotRequired(128),
    surName2: setStringTypeNotRequired(128),
    email: setStringType(256),
    birthDate: Date,
    address: setStringTypeNotRequired(256),
    city: setStringTypeNotRequired(128),
    zipCode: setStringTypeNotRequired(5),
    numberPhone: setStringTypeNotRequired(11),
    parentName: setStringTypeNotRequired(128),
    parentSurname1: setStringTypeNotRequired(128),
    parentSurname2: setStringTypeNotRequired(128),
    contactPhone: setStringTypeNotRequired(11),
    notes: setStringTypeNotRequired(2048),
    createdAt: Date,
    updatedAt: Date,
    installments: {
        price: setStringTypeNotRequired(16),
        account: setStringTypeNotRequired(24),
        startDate: Date,
        endDate: Date
    }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);