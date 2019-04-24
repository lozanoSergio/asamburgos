const mongoose = require("mongoose");
const config = require("../config");
const Schema = mongoose.Schema;
const encrypt = require("mongoose-encryption");

const encKey = config.ENC_KEY;
const sigKey = config.SIG_KEY;

const setStringType = maxLength => ({
  type: String,
  required: true,
  maxlength: maxLength
});
const setStringTypeNotRequired = maxLength => ({
  type: String,
  maxlength: maxLength
});

const userProfileSchema = new Schema({
  type: setStringType(32),
  firstName: setStringType(128),
  surName1: setStringTypeNotRequired(128),
  surName2: setStringTypeNotRequired(128),
  email: setStringType(256),
  birthDate: Date,
  disabilityLevel: setStringTypeNotRequired(128),
  disabilityType: setStringTypeNotRequired(128),
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
  fee: {
    subFee: setStringTypeNotRequired(12),
    activityFee: setStringTypeNotRequired(12),
    serviceFee: setStringTypeNotRequired(12),
    account: setStringTypeNotRequired(29),
    startDate: Date,
    endDate: Date
  },
  activities: { type: Array, default: void 0 },
  services: { type: Array, default: void 0 }
});

userProfileSchema.plugin(encrypt, {
    encryptionKey: encKey,
    signingKey: sigKey
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
