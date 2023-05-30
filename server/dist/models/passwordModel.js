"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Require mongoose in the userModel file:
const mongoose_1 = __importDefault(require("mongoose"));
//Create a constant (UserSchema) and assign it the mongoose schema:
const passwordSchema = new mongoose_1.default.Schema({
    //Specify how the fields should work by adding some mongoose option:
    websiteName: {
        type: String,
        require: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    iv: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });
//mongodb generates userId to use further operation Crud of user with that id.
//Finally, export UserSchema with the following code:
exports.default = mongoose_1.default.model("password", passwordSchema);
//# sourceMappingURL=passwordModel.js.map