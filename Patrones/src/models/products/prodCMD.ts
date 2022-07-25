import minimist from "minimist"
import { debugLogger, infoLogger, errorLogger } from "../../services/loggers"
import ProductsAPI from './prodAPI'

debugLogger.debug('CMD API RUNNING...')
let productosDao: ProductsAPI;

async function runCmds() {
    const argv = minimist(process.argv.slice(2))
    const { cmd, id, nombre, precio, stock } = argv
    const data = {
        id: id,
        nombre: nombre,
        precio: precio,
        stock: stock

    }
    try {
        switch(cmd.toLowerCase()) {
            case 'buscar':
                debugLogger.debug(cmd)
                infoLogger.info(await productosDao.getProduct(id))
                break

            case 'agregar':
                debugLogger.debug(cmd)
                infoLogger.info(await productosDao.addProduct(data))
                break

            case 'reemplazar':
                debugLogger.debug(cmd)
                infoLogger.info(await productosDao.updateProduct(id, data))
                break

            default:
                errorLogger.error('command not found', cmd)
                
        }
    } catch(error) {
        errorLogger.error(error)
    }
} 

export default runCmds