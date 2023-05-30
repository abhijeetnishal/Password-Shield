//Require mongoose in the userModel file:
import mongoose from "mongoose";

//Create a constant (UserSchema) and assign it the mongoose schema:
const passwordSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {timestamps: true})

//mongodb generates userId to use further operation Crud of user with that id.

//Finally, export UserSchema with the following code:
export default mongoose.model("password", passwordSchema);