import dotenv from 'dotenv';
dotenv.config();

export enum PersistenceType {
  Memoria = 'MEM',
  MongoAtlas = 'MONGO-ATLAS',
  LocalMongo = 'LOCAL-MONGO',
}

export default {
  PORT: process.env.PORT || 8080,
  MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV || 'mongosrv',
  MONGO_LOCAL_SRV: process.env.MONGO_LOCAL_SRV || 'mongoLocalsrv',
  MONGO_ATLAS_DB: process.env.MONGO_ATLAS_DB || 'db',
  PERSISTENCIA: PersistenceType.MongoAtlas,
};