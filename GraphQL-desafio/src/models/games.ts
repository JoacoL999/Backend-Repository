import mongoose from "mongoose";
import MongoDB from '../utils/mongoConnection'
import { errorLogger, infoLogger, warnLogger, debugLogger } from '../utils/loggers'
import { composeWithMongoose } from "graphql-compose-mongoose"

interface gameType {
    _id: string;
    id: string;
    success: boolean;
    type: string;
    name: string;
    steam_appid: number;
    required_age: string;
    is_free: boolean;
    controller_support: string;
    detailed_description: string;
    about_the_game: string;
    short_description: string;
    supported_languages: string;
    header_image: string;
    website: string;
    pc_requirements: any;
    mac_requirements: any;
    linux_requirements: any;
    legal_notice: string;
    developers: any;
    stock: number;
    publishers: any;
    price_overview: any;
    packages: any;
    package_groups: any;
    platforms: any;
    metacritic: any;
    categories: any;
    genres: any;
    screenshots: any;
    movies: any;
    recommendations: any;
    achievements: any;
    release_date: any;
    support_info: any;
    background: string;
  }



export const gamesCollectionName = 'games';

    const price_format = "ARS "


    const pc = new mongoose.Schema(
        {
            minimum: {type: String, required: true},
            recommended: {type: String, required: true}
        }
    )

    const mac = new mongoose.Schema(
        {
            minimum: {type: String, required: true},
            recommended: {type: String, required: true}
        }
    )

    const linux = new mongoose.Schema(
        {
            minimum: {type: String, required: true},
            recommended: {type: String, required: true}
        }
    )

    const dev = new mongoose.Schema(
        {
        name: {type: String, required: true}
        }
    )

    const pub = new mongoose.Schema(
        {
        name: {type: String, required: true}
        }
    )

    const price_ov = new mongoose.Schema(
        {
            currency: {type: String, default: "ARS "},
            initial: {type: Number, required: true},
            final: {type: Number, required: true},
            discount_percent: {type: Number, required: true},
            final_formatted: {type: String, required: true}

        }
    )

    const packs = new mongoose.Schema(
        {
            id: {type: Number, required: true}
        }
    )

    const packageGroups = new mongoose.Schema(
        {
            name: {type: String, default: "default"},
            title: {type: String, required: true}
        }
    )

    const platf = new mongoose.Schema(
        {
            windows: {type: Boolean, required: true},
            mac: {type: Boolean, required: true},
            linux: {type: Boolean, required: true}
        }
    )

    const metacrit = new mongoose.Schema(
        {
            score: {type: Number, required: false},
            url: {type: String, required: false}
        }
    )

    const categ = new mongoose.Schema(
        {
            id: {type: Number, required: true},
            description: {type: String, required: true}
        }
    )

    const gens = new mongoose.Schema(
        {
            id: {type: Number, required: true},
            description: {type: String, required: true}
        }
    )

    const screens = new mongoose.Schema(
        {
            id: {type: Number, required: true},
            path_thumbnail: {type: String, required: true},
            path_full: {type: String, required: true}
        }
    )

        const webma = new mongoose.Schema(
            {
                480: {type: String, required: true},
                max: {type: String, required: true}
            }
        )

        const mp4a = new mongoose.Schema(
            {
                480: {type: String, required: true},
                max: {type: String, required: true}
            }
        )


    const movSub = new mongoose.Schema(
        {
            id: {type: Number, required: true},
            name: {type: String, required: true},
            thumbnail: {type: String, required: true},
            webm: [webma],
            mp4: [mp4a],
            highlight: {type: String, required: true}
        }
    )

    const mov = new mongoose.Schema(
        {
            movSub,
        }
    )

    const recommen = new mongoose.Schema(
        {
            total: {type: Number, required: true}
        }
    )
    
        
        const highled = new mongoose.Schema(
            {
                name: {type: String, required: true},
                path: {type: String, required: true}


            }
        )

    const achiev = new mongoose.Schema(
        {
            total: {type: Number, required: true},
            highlighted: [highled]
        }
    )

    const release = new mongoose.Schema(
        {
            coming_soon: {type: Boolean, required: true},
            date: {type: String, required: true}
        }
    )
    
    const support = new mongoose.Schema(
        {
            url: {type: String, required: true},
            date: {type: String, required: true}
        }
    )



const gameSchema = new mongoose.Schema<gameType>(
    {
        id: {type: String, required: true},
        success: {type: Boolean, required: true},
        type: {type: String, required: true},
        name: {type: String, required: true},
        steam_appid: {type: Number, required: true},
        required_age: {type: String, required: true},
        is_free: {type: Boolean, required: true},
        controller_support: {type: String, required: true},
        detailed_description: {type: String, required: true},
        about_the_game: {type: String, required: true},
        short_description: {type: String, required: true},
        supported_languages: {type: String, required: true},
        header_image: {type: String, required: true},
        website: {type: String, required: true},
        pc_requirements: [pc],
        mac_requirements: [mac],
        linux_requirements: [linux],
        legal_notice: {type: String, required: true},
        developers: [dev],
        stock: {type: Number, required: true},
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
        background: {type: String, required: true},


    }
);


const schemaTest = mongoose.model(gamesCollectionName, gameSchema) 

class Games {
    private games

    constructor() {
        MongoDB.getConnection()
        this.games = mongoose.model(gamesCollectionName, gameSchema)
       
        
    }

    async getGames() {
        try {
            const response = await this.games.find()
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error getting games: ${error.message}`)
        }
    }

    async getGameById(id: string) {
        try {
            const response = await this.games.findOne({ id: id })
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error getting games: ${error.message}`)
        }
    
    }
    
    async postGame(game: any) {
        try {
            const response = await this.games.create(game)
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error creating games: ${error.message}`)
        }
    }

    async updateGame(id: string, game: any) {
        try {
          const response = await this.games.findOneAndUpdate({id: id}, game)
          return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error getting product: ${error.message}`)
        }
    }

    async deleteGame(id: string) {
        try {
            const response = await this.games.findOneAndDelete({id: id})
            return response
        } catch (error: any) {
            errorLogger.error(error.message)
            throw new Error(`Error deleting game: ${error.message}`)
        }
    }

    
}


const games = new Games()
export default games
export const gameGraphQlModel = composeWithMongoose(schemaTest);