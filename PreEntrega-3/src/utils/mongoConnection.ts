import mongoose from "mongoose";
import config from '../config';

mongoose.Promise = global.Promise
export const connectionURL = `mongodb+srv://${config.MONGO_ATLAS_USER}:${config.MONGO_ATLAS_PASSWORD}@${config.MONGO_ATLAS_CLUSTER}/${config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`
import { errorLogger, infoLogger, debugLogger } from './loggers'

class mongoConnect {
    mongoURL: string;
    connection: any;

    constructor() {
        this.mongoURL = connectionURL
        this.connection = ''
    }

    async getConnection() {
        if (this.connection) {
            return this.connection
        } else {
            debugLogger.debug('Connecting')
            try {
                this.connection = mongoose.Connection
                await mongoose.connect(this.mongoURL)
                infoLogger.info('Connected')
                return this.connection
            } catch (error) {
                errorLogger.error('Connection error:', error)
                errorLogger.error(error)
            }
            return this.connection
        }
    }
    closeConnection() {
        mongoose.disconnect()
    }
}

const MongoDB = new mongoConnect()
export default MongoDB