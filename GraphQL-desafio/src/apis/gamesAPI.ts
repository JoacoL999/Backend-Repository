import Games from '../models/games'

class GamesAPI {
    async getGames() {
        return await Games.getGames()
    }

    async getGameById(id: string) {
        return await Games.getGameById(id)
    }

    async postGame(game: any) {
        return await Games.postGame(game)
    }

    async updateGame(id: string, game: any) {
        return await Games.updateGame(id, game)
    }

    async deleteGame(id: string) {
        return await Games.deleteGame(id)
    }
}

const gamesAPI = new GamesAPI();
export default gamesAPI