"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordDetails = void 0;
const dbConnect_1 = require("../config/dbConnect");
const getPasswordDetails = (queryKey, queryValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield dbConnect_1.pool.query(`SELECT * FROM passwords WHERE ${queryKey} = $1`, [queryValue]);
        const password = rows[0];
        return password;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getPasswordDetails = getPasswordDetails;
//# sourceMappingURL=passwords.js.map