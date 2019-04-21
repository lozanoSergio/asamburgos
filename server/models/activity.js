const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const setStringType = (maxLength) => ({ type: String, required: true, maxlength: maxLength })
const setBooleanType = {type: Boolean, required: true}
const setStringTypeNotRequired = (maxLength) => ({ type: String, maxlength: maxLength })

const activitySchema = new Schema({
    name: setStringType(128),
    voluntaryName: setStringTypeNotRequired(128),
    monday: setBooleanType,
    tuesday: setBooleanType,
    wednesday: setBooleanType,
    thursday: setBooleanType,
    friday: setBooleanType,
    saturday: setBooleanType,
    sunday: setBooleanType,
    place: setStringTypeNotRequired(256),
    startTime: Date,
    endTime: Date,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Activity', activitySchema);