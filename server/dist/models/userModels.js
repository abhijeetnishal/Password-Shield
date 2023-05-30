"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Require mongoose in the userModel file:
const mongoose_1 = __importDefault(require("mongoose"));
//Create a constant (UserSchema) and assign it the mongoose schema:
const UserSchema = new mongoose_1.default.Schema({
    //Specify how the fields should work by adding some mongoose option:
    userName: {
        type: String,
        require: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
}, { timestamps: true });
//Finally, export UserSchema with the following code:
exports.default = mongoose_1.default.model("User", UserSchema);
//The code above is saying: "create a user table or collection if there is no table with that name already".
//You have completed the model for the user. The user collection is now ready to receive the data that is to be passed to it.
//# sourceMappingURL=userModels.js.map