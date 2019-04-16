const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const setStringType = (maxLength) => ({ type: String, required: true, maxlength: maxLength })
const setBooleanType = {type: Boolean, required: true}
const setStringTypeNotRequired = (maxLength) => ({ type: String, maxlength: maxLength })

const serviceSchema = new Schema({
    serviceName: setStringType(128),
    voluntaryName: setStringTypeNotRequired(128),
    periodicity: setStringTypeNotRequired(128),
    place: setStringTypeNotRequired(256),
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Service', serviceSchema);