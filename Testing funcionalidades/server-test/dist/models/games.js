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
exports.gamesCollectionName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoConnection_1 = __importDefault(require("../utils/mongoConnection"));
const loggers_1 = require("../utils/loggers");
exports.gamesCollectionName = 'games';
const price_format = "ARS ";
const pc = new mongoose_1.default.Schema({
    minimum: { type: String, required: true },
    recommended: { type: String, required: true }
});
const mac = new mongoose_1.default.Schema({
    minimum: { type: String, required: true },
    recommended: { type: String, required: true }
});
const linux = new mongoose_1.default.Schema({
    minimum: { type: String, required: true },
    recommended: { type: String, required: true }
});
const dev = new mongoose_1.default.Schema({
    name: { type: String, required: true }
});
const pub = new mongoose_1.default.Schema({
    name: { type: String, required: true }
});
const price_ov = new mongoose_1.default.Schema({
    currency: { type: String, default: "ARS " },
    initial: { type: Number, required: true },
    final: { type: Number, required: true },
    discount_percent: { type: Number, required: true },
    final_formatted: { type: String, required: true }
});
const packs = new mongoose_1.default.Schema({
    id: { type: Number, required: true }
});
const packageGroups = new mongoose_1.default.Schema({
    name: { type: String, default: "default" },
    title: { type: String, required: true }
});
const platf = new mongoose_1.default.Schema({
    windows: { type: Boolean, required: true },
    mac: { type: Boolean, required: true },
    linux: { type: Boolean, required: true }
});
const metacrit = new mongoose_1.default.Schema({
    score: { type: Number, required: false },
    url: { type: String, required: false }
});
const categ = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    description: { type: String, required: true }
});
const gens = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    description: { type: String, required: true }
});
const screens = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    path_thumbnail: { type: String, required: true },
    path_full: { type: String, required: true }
});
const webma = new mongoose_1.default.Schema({
    480: { type: String, required: true },
    max: { type: String, required: true }
});
const mp4a = new mongoose_1.default.Schema({
    480: { type: String, required: true },
    max: { type: String, required: true }
});
const movSub = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    webm: [webma],
    mp4: [mp4a],
    highlight: { type: String, required: true }
});
const mov = new mongoose_1.default.Schema({
    movSub,
});
const recommen = new mongoose_1.default.Schema({
    total: { type: Number, required: true }
});
const highled = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true }
});
const achiev = new mongoose_1.default.Schema({
    total: { type: Number, required: true },
    highlighted: [highled]
});
const release = new mongoose_1.default.Schema({
    coming_soon: { type: Boolean, required: true },
    date: { type: String, required: true }
});
const support = new mongoose_1.default.Schema({
    url: { type: String, required: true },
    date: { type: String, required: true }
});
const gameSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    success: { type: Boolean, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    steam_appid: { type: Number, required: true },
    required_age: { type: String, required: true },
    is_free: { type: Boolean, required: true },
    controller_support: { type: String, required: true },
    detailed_description: { type: String, required: true },
    about_the_game: { type: String, required: true },
    short_description: { type: String, required: true },
    supported_languages: { type: String, required: true },
    header_image: { type: String, required: true },
    website: { type: String, required: true },
    pc_requirements: [pc],
    mac_requirements: [mac],
    linux_requirements: [linux],
    legal_notice: { type: String, required: true },
    developers: [dev],
    stock: { type: Number, required: true },
    publishers: [pub],
    price_overview: [price_ov],
    packages: [packs],
    package_groups: [packageGroups],
    platforms: [platf],
    metacritic: [metacrit],
    categories: [categ],
    genres: [gens],
    screenshots: [screens],
    movies: [mov],
    recommendations: [recommen],
    achievements: [achiev],
    release_date: [release],
    support_info: [support],
    background: { type: String, required: true },
});
class Games {
    constructor() {
        mongoConnection_1.default.getConnection();
        this.games = mongoose_1.default.model(exports.gamesCollectionName, gameSchema);
    }
    getGames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.games.find();
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error getting games: ${error.message}`);
            }
        });
    }
    getGameById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.games.findOne({ id: id });
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error getting games: ${error.message}`);
            }
        });
    }
    postGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.games.create(game);
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error creating games: ${error.message}`);
            }
        });
    }
    updateGame(id, game) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.games.findOneAndUpdate({ id: id }, game);
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error getting product: ${error.message}`);
            }
        });
    }
    deleteGame(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.games.findOneAndDelete({ id: id });
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error deleting game: ${error.message}`);
            }
        });
    }
}
const games = new Games();
exports.default = games;
