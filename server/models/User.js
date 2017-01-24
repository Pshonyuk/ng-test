"use strict";
var crypto = require("crypto");
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    hashedPassword: {
        type: String,
        required: true,
        min: [6, "Your password is too short!"],
        max: [16, "Your password is too long!"]
    },
    salt: {
        type: String,
        required: true
    }
});
UserSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};
UserSchema.virtual('userId').get(function () { return this.id; });
UserSchema.virtual('password')
    .set(function (password) {
    this._plainPassword = password;
    this.salt = crypto.randomBytes(32).toString('hex');
    this.hashedPassword = this.encryptPassword(password);
})
    .get(function () { return this._plainPassword; });
UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};
exports.UserModel = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map