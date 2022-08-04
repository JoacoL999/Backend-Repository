"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = __importDefault(require("../controllers/gamesController"));
const router = (0, express_1.Router)();
router.get('/:id', gamesController_1.default.getGames);
router.get('/', gamesController_1.default.getGames);
router.post('/', gamesController_1.default.isValid, gamesController_1.default.postGame);
router.put('/:id', gamesController_1.default.hasIdParam, gamesController_1.default.isValid, gamesController_1.default.updateGame);
router.delete('/:id', gamesController_1.default.hasIdParam, gamesController_1.default.deleteGame);
exports.default = router;
