"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = __importDefault(require("./routers/schema"));
const password_1 = __importDefault(require("./routers/password"));
const auth_1 = __importDefault(require("./routers/auth"));
const user_1 = require("./routers/user");
// Configure env
dotenv_1.default.config();
// Create an express instance
const app = (0, express_1.default)();
// To parse the incoming requests with JSON we are using express.json() which is a built-in middleware function in Express.
app.use(express_1.default.json());
// Define port
const port = process.env.PORT || 8080;
// Check environment
const isProduction = process.env.NODE_ENV === "production";
// CORS Configuration
const corsOptions = {
    origin: isProduction ? process.env.CLIENT_PROD_URL : "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
};
// This will allow the users in the frontend to consume the API's.
app.use((0, cors_1.default)(corsOptions));
// Disable X-Powered-By Header
app.disable("x-powered-by");
app.set("trust proxy", true);
// Schema router - to create schemas
app.use(schema_1.default);
// Auth Router
app.use("/auth/v1/", auth_1.default);
// Users Router
app.use("/api/v1/", user_1.userRouter);
// Passwords router
app.use("/api/v1/", password_1.default);
app.get("/", (req, res) => {
    res.status(200).json("Server is Live");
});
app.listen(port, () => {
    console.log("Server listening at port " + port);
});
//# sourceMappingURL=index.js.map