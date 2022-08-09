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
const games_1 = __importDefault(require("../models/games"));
class GamesAPI {
    getGames() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield games_1.default.getGames();
        });
    }
    getGameById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield games_1.default.getGameById(id);
        });
    }
    postGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield games_1.default.postGame(game);
        });
    }
    updateGame(id, game) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield games_1.default.updateGame(id, game);
        });
    }
    deleteGame(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield games_1.default.deleteGame(id);
        });
    }
}
const gamesAPI = new GamesAPI();
exports.default = gamesAPI;
