import GamesAPI from '../apis/gamesAPI'
import {Context, Next } from 'koa'
import { gameGraphQlModel } from '../models/games'
import { Request } from 'koa-bodyparser'

const req = Request


class GamesController {
    hasIdParam (ctx: Context, next: Next) {
        ctx.params.id ? next() :   ctx.body = {
            status: 'success',
            message: 'missing id',
          };
    }
    // (ctx: Context, next: Next)
    isValid (ctx: Context, next: Next) {
        const { name, id, stock} = ctx.request.body
        if ( !name || typeof name !== 'string' || !id || typeof id !== 'string' || !stock || typeof stock !== 'number') {
        return 'Falta ingresar alguno de los campos obligatorios'
        }
        next()
    }

    async getGames (ctx: Context, next: Next) {
        const id = ctx.params.id
        if (id) {
            try {
                const response = await GamesAPI.getGameById(id)
                return  ctx.body = {
                    status: 'success',
                    message: response,
                  };
            } catch (error: any) {
                return error.message
            }
        }
        const response = await GamesAPI.getGames()
        return response
    }

    async postGame (ctx: Context, next: Next) {
        try {
            const newGame = await GamesAPI.postGame(ctx.request.body)
            return  ctx.body = {
                status: 'success',
                message: newGame,
              };
        } catch (error: any) {
            return error.message
        }
    }

    async updateGame (ctx: Context, next: Next) {
        try{
            const updatedGame = await GamesAPI.updateGame(ctx.params.id, ctx.request.body)
            updatedGame
        } catch (error: any) {
           error.message
        }
    }

    async deleteGame (ctx: Context, next: Next) {
        try {
            await GamesAPI.deleteGame(ctx.params.id)
            return ctx.body = {status: 'success', message: 'Product deleted'}
        } catch (error: any) {
            return error.message
        }
    }
}

const gamesController = new GamesController()
export default gamesController

export const GamesQueries = {
    gameById: gameGraphQlModel.getResolver('findById'),
    gameByIds: gameGraphQlModel.getResolver('findByIds'),
    gameOne: gameGraphQlModel.getResolver('findOne'),
    gameMany: gameGraphQlModel.getResolver('findMany'),
    gameCount: gameGraphQlModel.getResolver('count'),
    gameConnection: gameGraphQlModel.getResolver('connection'),
    gamePagination: gameGraphQlModel.getResolver('pagination'),
  };


export const GamesMutations = {
    gameCreateOne: gameGraphQlModel.getResolver('createOne'),
    gameCreateMany: gameGraphQlModel.getResolver('createMany'),
    gameUpdateById: gameGraphQlModel.getResolver('updateById'),
    gameUpdateOne: gameGraphQlModel.getResolver('updateOne'),
    gameUpdateMany: gameGraphQlModel.getResolver('updateMany'),
    gameRemoveById: gameGraphQlModel.getResolver('removeById'),
    gameRemoveOne: gameGraphQlModel.getResolver('removeOne'),
    gameRemoveMany: gameGraphQlModel.getResolver('removeMany'),
  };





