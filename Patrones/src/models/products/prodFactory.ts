import ProductosMemDAO from './DAOs/memDao';
import ProductosAtlasDAO from './DAOs/mongoDao'
import { infoLogger } from '../../services/loggers';
import { PersistenceType } from '../../config';


export type ProductsDAO = ProductosAtlasDAO | ProductosMemDAO

export class ProductsFactoryDAO {
  static get(type: PersistenceType) {
    switch (type) {
      case PersistenceType.Memoria:
        infoLogger.info('Retornando Instancia Products Memoria');
        return ProductosMemDAO.getInstance();

      case PersistenceType.MongoAtlas:
        infoLogger.info('Retornando Instancia Products Mongo Atlas');
        return ProductosAtlasDAO.getInstance();

      case PersistenceType.LocalMongo:
        infoLogger.info('Retornando Instancia Products Mongo Local');
        return ProductosAtlasDAO.getInstance(true);

      default:
        infoLogger.info('Retornando Instancia Products Default');
        return ProductosAtlasDAO.getInstance();
    }
  }
}