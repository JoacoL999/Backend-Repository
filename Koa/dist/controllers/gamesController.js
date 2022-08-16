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
exports.GamesMutations = exports.GamesQueries = void 0;
const gamesAPI_1 = __importDefault(require("../apis/gamesAPI"));
const games_1 = require("../models/games");
const koa_bodyparser_1 = require("koa-bodyparser");
const req = koa_bodyparser_1.Request;
class GamesController {
    hasIdParam(ctx, next) {
        ctx.params.id ? next() : ctx.body = {
            status: 'success',
            message: 'missing id',
        };
    }
    // (ctx: Context, next: Next)
    isValid(ctx, next) {
        const { name, id, stock } = ctx.request.body;
        if (!name || typeof name !== 'string' || !id || typeof id !== 'string' || !stock || typeof stock !== 'number') {
            return 'Falta ingresar alguno de los campos obligatorios';
        }
        next();
    }
    getGames(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = ctx.params.id;
            if (id) {
                try {
                    const response = yield gamesAPI_1.default.getGameById(id);
                    return ctx.body = {
                        status: 'success',
                        message: response,
                    };
                }
                catch (error) {
                    return error.message;
                }
            }
            const response = yield gamesAPI_1.default.getGames();
            return response;
        });
    }
    postGame(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newGame = yield gamesAPI_1.default.postGame(ctx.request.body);
                return ctx.body = {
                    status: 'success',
                    message: newGame,
                };
            }
            catch (error) {
                return error.message;
            }
        });
    }
    updateGame(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedGame = yield gamesAPI_1.default.updateGame(ctx.params.id, ctx.request.body);
                updatedGame;
            }
            catch (error) {
                error.message;
            }
        });
    }
    deleteGame(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield gamesAPI_1.default.deleteGame(ctx.params.id);
                return ctx.body = { status: 'success', message: 'Product deleted' };
            }
            catch (error) {
                return error.message;
            }
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
exports.GamesQueries = {
    gameById: games_1.gameGraphQlModel.getResolver('findById'),
    gameByIds: games_1.gameGraphQlModel.getResolver('findByIds'),
    gameOne: games_1.gameGraphQlModel.getResolver('findOne'),
    gameMany: games_1.gameGraphQlModel.getResolver('findMany'),
    gameCount: games_1.gameGraphQlModel.getResolver('count'),
    gameConnection: games_1.gameGraphQlModel.getResolver('connection'),
    gamePagination: games_1.gameGraphQlModel.getResolver('pagination'),
};
exports.GamesMutations = {
    gameCreateOne: games_1.gameGraphQlModel.getResolver('createOne'),
    gameCreateMany: games_1.gameGraphQlModel.getResolver('createMany'),
    gameUpdateById: games_1.gameGraphQlModel.getResolver('updateById'),
    gameUpdateOne: games_1.gameGraphQlModel.getResolver('updateOne'),
    gameUpdateMany: games_1.gameGraphQlModel.getResolver('updateMany'),
    gameRemoveById: games_1.gameGraphQlModel.getResolver('removeById'),
    gameRemoveOne: games_1.gameGraphQlModel.getResolver('removeOne'),
    gameRemoveMany: games_1.gameGraphQlModel.getResolver('removeMany'),
};
