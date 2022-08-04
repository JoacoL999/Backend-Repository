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
const gamesAPI_1 = __importDefault(require("../apis/gamesAPI"));
class GamesController {
    hasIdParam(req, res, next) {
        req.params.id ? next() : res.status(404).json({ msg: 'missing id' });
    }
    isValid(req, res, next) {
        const { name, id, stock } = req.body;
        if (!name || typeof name !== 'string' || !id || typeof id !== 'string' || !stock || typeof stock !== 'number') {
            return res.status(400).json({ msg: 'Falta ingresar alguno de los campos obligatorios' });
        }
        next();
    }
    getGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                try {
                    const response = yield gamesAPI_1.default.getGameById(id);
                    return res.status(200).json(response);
                }
                catch (error) {
                    return res.status(404).json({ msg: error.message });
                }
            }
            const response = yield gamesAPI_1.default.getGames();
            return res.status(200).json(response);
        });
    }
    postGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newGame = yield gamesAPI_1.default.postGame(req.body);
                return res.json({ msg: 'Adding Game', data: newGame });
            }
            catch (error) {
                return res.status(400).json({ msg: error.message });
            }
        });
    }
    updateGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedGame = yield gamesAPI_1.default.updateGame(req.params.id, req.body);
                res.json({ msg: 'Game updated', data: updatedGame });
            }
            catch (error) {
                return res.status(400).json({ msg: error.message });
            }
        });
    }
    deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield gamesAPI_1.default.deleteGame(req.params.id);
                return res.status(200).json({ msg: 'Product deleted' });
            }
            catch (error) {
                return res.status(400).json({ msg: error.message });
            }
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
