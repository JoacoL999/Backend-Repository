import GamesAPI from '../apis/gamesAPI'
import { Request, Response, NextFunction } from 'express'
import { gameGraphQlModel } from '../models/games'

class GamesController {
    hasIdParam(req: Request, res: Response, next: NextFunction) {
        req.params.id ? next() : res.status(404).json({msg: 'missing id'})
    }

    isValid(req: Request, res: Response, next: NextFunction) {
        const { name, id, stock} = req.body
        if ( !name || typeof name !== 'string' || !id || typeof id !== 'string' || !stock || typeof stock !== 'number') {
        return res.status(400).json({ msg: 'Falta ingresar alguno de los campos obligatorios'})
        }
        next()
    }

    async getGames(req: Request, res: Response) {
        const id = req.params.id
        if (id) {
            try {
                const response = await GamesAPI.getGameById(id)
                return res.status(200).json(response)
            } catch (error: any) {
                return res.status(404).json({ msg: error.message})
            }
        }
        const response = await GamesAPI.getGames()
        return res.status(200).json(response)
    }

    async postGame(req: Request, res: Response) {
        try {
            const newGame = await GamesAPI.postGame(req.body)
            return res.json({ msg: 'Adding Game', data: newGame})
        } catch (error: any) {
            return res.status(400).json({ msg: error.message })
        }
    }

    async updateGame(req: Request, res: Response) {
        try{
            const updatedGame = await GamesAPI.updateGame(req.params.id, req.body)
            res.json({ msg: 'Game updated', data: updatedGame})
        } catch (error: any) {
            return res.status(400).json({ msg: error.message })
        }
    }

    async deleteGame(req: Request, res: Response) {
        try {
            await GamesAPI.deleteGame(req.params.id)
            return res.status(200).json({ msg: 'Product deleted' })
        } catch (error: any) {
            return res.status(400).json({ msg: error.message })
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





