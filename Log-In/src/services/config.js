export default {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/coderBackend'
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://JoacoL999:odn2GDGiTkG7FPEC@cluster0.laxt1.mongodb.net/coderBackend?retryWrites=true&w=majority'
    }
}