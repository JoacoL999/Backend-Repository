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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const config_1 = __importDefault(require("../config"));
const loggers_1 = require("../utils/loggers");
const accountSid = config_1.default.TWILIO_ACCOUNT_ID;
const authToken = config_1.default.TWILIO_TOKEN;
const client = new twilio_1.Twilio(accountSid, authToken);
class Whatsapp {
    wsp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = user.carts.map((e) => { return JSON.stringify(`- *${e.name}* -> $${e.price} -`, null, 2).replace(/\"/g, ""); });
                client.messages
                    .create({
                    from: 'whatsapp:+14155238886',
                    body: `Hi ${user.user}! - Cart list: ${games}`,
                    to: `whatsapp:${user.phoneNum}`
                })
                    .then(message => loggers_1.infoLogger.info(message.sid));
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error sending whatsapp: ${error.message}`);
            }
        });
    }
}
const wspController = new Whatsapp();
exports.default = wspController;
